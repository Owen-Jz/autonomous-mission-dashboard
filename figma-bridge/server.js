// Figma Bridge Server
// This server receives design specs from the dashboard and serves them to the Figma plugin

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const JOB_FILE = path.join(__dirname, 'pending-job.json');

// Store a job
app.post('/job', (req, res) => {
  const { name, accentColor, projectName, specs } = req.body;
  
  const job = {
    id: Date.now().toString(),
    name: name || projectName || 'New Project',
    accentColor: accentColor || '#6366F1',
    specs: specs || {},
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  
  fs.writeFileSync(JOB_FILE, JSON.stringify(job, null, 2));
  
  console.log('📝 New job received:', job.name);
  res.json({ success: true, jobId: job.id });
});

// Get pending job (for plugin to poll)
app.get('/job', (req, res) => {
  if (fs.existsSync(JOB_FILE)) {
    const job = JSON.parse(fs.readFileSync(JOB_FILE, 'utf8'));
    if (job.status === 'pending') {
      return res.json({ job });
    }
  }
  res.json({ job: null });
});

// Mark job as completed
app.delete('/job', (req, res) => {
  if (fs.existsSync(JOB_FILE)) {
    const job = JSON.parse(fs.readFileSync(JOB_FILE, 'utf8'));
    job.status = 'completed';
    fs.unlinkSync(JOB_FILE);
    console.log('✅ Job completed:', job.name);
  }
  res.json({ success: true });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3456;

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║   🎨 Figma Bridge Server Running        ║
║                                          ║
║   Dashboard → POST /job                  ║
║   Plugin   → GET  /job                 ║
║                                          ║
║   URL: http://localhost:${PORT}            ║
╚═══════════════════════════════════════════╝
  `);
});
