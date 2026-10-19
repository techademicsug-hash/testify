import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const RADIO_STREAM_URL = 'http://cast5.asurahosting.com:8914/stream';

app.use(express.json());

// Proxy endpoint for the HTTP radio stream to bypass HTTPS mixed-content restrictions
app.head('/api/radio-stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Accept-Ranges': 'none'
  });
  res.end();
});

app.get('/api/radio-stream', (req, res) => {
  if (req.method === 'HEAD') {
    res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Accept-Ranges': 'none'
    });
    return res.end();
  }

  let clientReq: http.ClientRequest | null = null;
  let isClosed = false;

  const cleanup = () => {
    isClosed = true;
    if (clientReq) {
      try {
        clientReq.destroy();
      } catch {
        // ignore
      }
      clientReq = null;
    }
  };

  req.on('close', cleanup);
  req.on('finish', cleanup);

  try {
    // CRITICAL: Icy-MetaData MUST NOT be 1, otherwise Shoutcast injects raw metadata chunks
    // into the MP3 stream, causing HTML5 audio decoders to choke and error out.
    clientReq = http.get(RADIO_STREAM_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 TestifyHubRadio/1.0',
        'Accept': '*/*',
        'Icy-MetaData': '0'
      },
      timeout: 15000
    }, (streamRes) => {
      if (isClosed) {
        streamRes.destroy();
        return;
      }

      const statusCode = streamRes.statusCode || 200;
      if (statusCode >= 400) {
        if (!res.headersSent) {
          res.status(502).json({ error: 'Upstream radio server returned error' });
        }
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Accept-Ranges': 'none'
      });

      streamRes.pipe(res);

      streamRes.on('error', (err) => {
        console.error('Radio stream pipe error:', err.message);
        if (!res.writableEnded) res.end();
      });

      streamRes.on('end', () => {
        if (!res.writableEnded) res.end();
      });
    });

    clientReq.on('error', (err) => {
      console.error('Radio stream proxy error:', err.message);
      if (!res.headersSent) {
        res.status(502).json({
          error: 'Radio stream temporarily unavailable',
          directUrl: RADIO_STREAM_URL
        });
      }
    });

    clientReq.on('timeout', () => {
      console.warn('Radio stream proxy timeout connecting upstream');
      cleanup();
      if (!res.headersSent) {
        res.status(504).json({ error: 'Radio upstream timeout' });
      }
    });
  } catch (error: any) {
    console.error('Unexpected proxy error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to initiate radio stream proxy' });
    }
  }
});

// Stream health and metadata endpoint
app.get('/api/radio-info', (req, res) => {
  const defaultInfo = {
    stationName: 'TestifyHub Christian Radio',
    tagline: 'Proclaiming Christ, Sharing Answered Prayers & Uplifting Families 24/7',
    directStreamUrl: RADIO_STREAM_URL,
    proxyStreamUrl: '/api/radio-stream',
    status: 'online',
    currentProgramme: 'Grace & Truth Hour',
    host: 'Pastor David & Sister Grace',
    bitrate: '128 kbps',
    songTitle: 'TestifyHub Praise & Worship 24/7'
  };

  try {
    const statsReq = http.get('http://cast5.asurahosting.com:8914/stats?sid=1&json=1', { timeout: 3000 }, (statsRes) => {
      let data = '';
      statsRes.on('data', chunk => { data += chunk; });
      statsRes.on('end', () => {
        try {
          const stats = JSON.parse(data);
          res.json({
            ...defaultInfo,
            status: stats.streamstatus === 1 ? 'online' : 'offline',
            songTitle: stats.songtitle || defaultInfo.songTitle,
            listeners: stats.currentlisteners || 1,
            bitrate: `${stats.bitrate || 128} kbps`
          });
        } catch {
          res.json(defaultInfo);
        }
      });
    });

    statsReq.on('error', () => {
      res.json(defaultInfo);
    });

    statsReq.on('timeout', () => {
      statsReq.destroy();
      res.json(defaultInfo);
    });
  } catch {
    res.json(defaultInfo);
  }
});

// DEVOTIONS BACKEND STORE & AUTOMATIC DAILY ROTATION
const DEVOTIONS_FILE = path.resolve(__dirname, 'src/data/devotions-store.json');

function readDevotions(): any[] {
  try {
    if (fs.existsSync(DEVOTIONS_FILE)) {
      const data = fs.readFileSync(DEVOTIONS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading devotions:', err);
  }
  return [];
}

function writeDevotions(devotions: any[]): boolean {
  try {
    fs.writeFileSync(DEVOTIONS_FILE, JSON.stringify(devotions, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing devotions:', err);
    return false;
  }
}

function calculateTodayDevotion() {
  const devotions = readDevotions();
  if (!devotions || devotions.length === 0) {
    return null;
  }

  const now = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDayName = dayNames[now.getDay()];
  const todayDateString = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // 1. Try matching day name or exact formatted date
  const matched = devotions.find(d => 
    d.date === todayDateString || 
    (typeof d.date === 'string' && d.date.toLowerCase() === todayDayName.toLowerCase()) ||
    (typeof d.dayOfWeek === 'string' && d.dayOfWeek.toLowerCase() === todayDayName.toLowerCase())
  );

  if (matched) {
    return {
      ...matched,
      displayDate: todayDateString,
      isToday: true
    };
  }

  // 2. Day-of-year rotation ensures a fresh devotion every single day
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = Math.abs(dayOfYear) % devotions.length;

  return {
    ...devotions[index],
    displayDate: todayDateString,
    isToday: true
  };
}

// GET today's devotion (automatically updates every day)
app.get('/api/devotions/today', (req, res) => {
  const devotion = calculateTodayDevotion();
  if (!devotion) {
    return res.status(404).json({ error: 'No devotionals available' });
  }
  res.json({
    success: true,
    devotional: devotion
  });
});

// GET all devotionals for archive & admin
app.get('/api/devotions', (req, res) => {
  const list = readDevotions();
  const today = calculateTodayDevotion();
  res.json({
    success: true,
    devotionals: list,
    todayDevotional: today
  });
});

// PUT /api/devotions/today - Admin updates today's active devotion through backend
app.put('/api/devotions/today', (req, res) => {
  const { title, scriptureRef, scriptureText, message, reflectionQuestions, prayerText, author, tags } = req.body;
  if (!title || !message) {
    return res.status(400).json({ error: 'Title and message are required' });
  }

  const devotions = readDevotions();
  const currentToday = calculateTodayDevotion();
  const now = new Date();
  const todayDateString = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  let updatedDevotion: any = null;

  if (currentToday && currentToday.id) {
    const existingIndex = devotions.findIndex(d => d.id === currentToday.id);
    if (existingIndex !== -1) {
      devotions[existingIndex] = {
        ...devotions[existingIndex],
        title,
        scriptureRef: scriptureRef || devotions[existingIndex].scriptureRef,
        scriptureText: scriptureText || devotions[existingIndex].scriptureText,
        message,
        reflectionQuestions: reflectionQuestions || devotions[existingIndex].reflectionQuestions,
        prayerText: prayerText || devotions[existingIndex].prayerText,
        author: author || devotions[existingIndex].author,
        tags: tags || devotions[existingIndex].tags,
        updatedAt: new Date().toISOString()
      };
      updatedDevotion = devotions[existingIndex];
    }
  }

  if (!updatedDevotion) {
    // Create new today devotion
    updatedDevotion = {
      id: `dev-${Date.now()}`,
      date: todayDateString,
      title,
      scriptureRef,
      scriptureText,
      message,
      reflectionQuestions: reflectionQuestions || ['How will you walk in this truth today?'],
      prayerText,
      author: author || 'Pastor Thomas Vance',
      tags: tags || ['TestifyHub Bread'],
      updatedAt: new Date().toISOString()
    };
    devotions.unshift(updatedDevotion);
  }

  writeDevotions(devotions);

  res.json({
    success: true,
    message: "Today's devotion updated successfully in backend!",
    devotional: {
      ...updatedDevotion,
      displayDate: todayDateString,
      isToday: true
    }
  });
});

// POST /api/devotions - Add new devotion into backend library
app.post('/api/devotions', (req, res) => {
  const { date, title, scriptureRef, scriptureText, message, reflectionQuestions, prayerText, author, tags } = req.body;
  if (!title || !message) {
    return res.status(400).json({ error: 'Title and message are required' });
  }

  const devotions = readDevotions();
  const newDev = {
    id: `dev-${Date.now()}`,
    date: date || new Date().toLocaleDateString('en-US', { weekday: 'long' }),
    title,
    scriptureRef: scriptureRef || '',
    scriptureText: scriptureText || '',
    message,
    reflectionQuestions: reflectionQuestions || ['How will you apply this to your walk today?'],
    prayerText: prayerText || '',
    author: author || 'Pastor Thomas Vance',
    tags: tags || ['TestifyHub Bread'],
    createdAt: new Date().toISOString()
  };

  devotions.unshift(newDev);
  writeDevotions(devotions);

  res.json({
    success: true,
    message: 'Devotional added to backend store successfully',
    devotional: newDev
  });
});

// DELETE /api/devotions/:id - Delete devotion from backend library
app.delete('/api/devotions/:id', (req, res) => {
  const { id } = req.params;
  let devotions = readDevotions();
  const initialLen = devotions.length;
  devotions = devotions.filter(d => d.id !== id);

  if (devotions.length === initialLen) {
    return res.status(404).json({ error: 'Devotional not found' });
  }

  writeDevotions(devotions);
  res.json({
    success: true,
    message: 'Devotional deleted successfully'
  });
});

// Serve the standalone single HTML file combining all code
app.get(['/testifyhub_single.html', '/single'], (req, res) => {
  const filePath = path.resolve(__dirname, 'testifyhub_single.html');
  res.sendFile(filePath);
});

// Download the standalone single HTML file
app.get('/api/download-single-html', (req, res) => {
  const filePath = path.resolve(__dirname, 'testifyhub_single.html');
  res.download(filePath, 'testifyhub_single.html');
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
