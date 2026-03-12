import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const caseStudies = await prisma.caseStudy.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return res.status(200).json(caseStudies);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      return res.status(500).json({ error: 'Failed to fetch case studies' });
    }
  }

  if (req.method === 'POST') {
    try {
      const caseStudy = await prisma.caseStudy.create({
        data: {
          slug: req.body.slug,
          title: req.body.title,
          subtitle: req.body.subtitle,
          image: req.body.image,
          heroImage: req.body.heroImage,
          industry: req.body.industry,
          businessFunction: req.body.businessFunction,
          description: req.body.description,
          clientName: req.body.clientName,
          clientIndustry: req.body.clientIndustry,
          clientMarket: req.body.clientMarket,
          clientTechnology: req.body.clientTechnology,
          challenges: req.body.challenges,
          solution: req.body.solution,
          benefits: req.body.benefits,
        },
      });
      return res.status(201).json({ message: 'Case study created successfully', data: caseStudy });
    } catch (error) {
      console.error('Error creating case study:', error);
      return res.status(500).json({ error: 'Failed to create case study' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
