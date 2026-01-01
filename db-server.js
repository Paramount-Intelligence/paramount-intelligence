// Standalone database server (runs separately from Next.js)
const { PrismaClient } = require('@prisma/client');
const express = require('express');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// GET all case studies
app.get('/api/case-studies', async (req, res) => {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(caseStudies);
  } catch (error) {
    console.error('Error fetching case studies:', error);
    res.status(500).json({ error: 'Failed to fetch case studies' });
  }
});

// POST new case study
app.post('/api/case-studies', async (req, res) => {
  try {
    const caseStudy = await prisma.caseStudy.create({
      data: req.body
    });
    res.status(201).json({ message: 'Case study created', data: caseStudy });
  } catch (error) {
    console.error('Error creating case study:', error);
    res.status(500).json({ error: 'Failed to create case study' });
  }
});

// GET single case study
app.get('/api/case-studies/:id', async (req, res) => {
  try {
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id: req.params.id }
    });
    if (!caseStudy) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    res.json(caseStudy);
  } catch (error) {
    console.error('Error fetching case study:', error);
    res.status(500).json({ error: 'Failed to fetch case study' });
  }
});

// PUT update case study
app.put('/api/case-studies/:id', async (req, res) => {
  try {
    const caseStudy = await prisma.caseStudy.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ message: 'Case study updated', data: caseStudy });
  } catch (error) {
    console.error('Error updating case study:', error);
    res.status(500).json({ error: 'Failed to update case study' });
  }
});

// DELETE case study
app.delete('/api/case-studies/:id', async (req, res) => {
  try {
    await prisma.caseStudy.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Case study deleted' });
  } catch (error) {
    console.error('Error deleting case study:', error);
    res.status(500).json({ error: 'Failed to delete case study' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✓ Database server running on http://localhost:${PORT}`);
});
