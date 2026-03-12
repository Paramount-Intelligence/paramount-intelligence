require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const app = express();
const PORT = 3001;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

// --- AUTHENTICATION MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// --- ADMIN AUTH ROUTES ---

// Login Route
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, username: admin.username });
  } catch (error) {
    res.status(500).json({ error: 'Login process failed' });
  }
});

// --- CASE STUDY ROUTES ---

// PUBLIC: GET all case studies
app.get('/api/case-studies', async (req, res) => {
  try {
    const caseStudies = await prisma.caseStudy.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(caseStudies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch case studies' });
  }
});

// PUBLIC: GET single case study
app.get('/api/case-studies/:id', async (req, res) => {
  try {
    const caseStudy = await prisma.caseStudy.findUnique({ where: { id: req.params.id } });
    if (!caseStudy) return res.status(404).json({ error: 'Not found' });
    res.json(caseStudy);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching case study' });
  }
});

// PROTECTED: POST new case study
app.post('/api/case-studies', authenticateToken, async (req, res) => {
  try {
    const caseStudy = await prisma.caseStudy.create({ data: req.body });
    res.status(201).json({ message: 'Created', data: caseStudy });
  } catch (error) {
    res.status(500).json({ error: 'Creation failed' });
  }
});

// PROTECTED: PUT update case study
app.put('/api/case-studies/:id', authenticateToken, async (req, res) => {
  try {
    const caseStudy = await prisma.caseStudy.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ message: 'Updated', data: caseStudy });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// PROTECTED: DELETE case study
app.delete('/api/case-studies/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.caseStudy.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
});

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`✅ Database connected successfully.`);
  } catch (err) {
    console.error("❌ Database connection failed!");
  }
});