import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'GET') {
    try {
      const caseStudy = await prisma.caseStudy.findUnique({
        where: { id },
      });

      if (!caseStudy) {
        return res.status(404).json({ error: 'Case study not found' });
      }

      return res.status(200).json(caseStudy);
    } catch (error) {
      console.error('Error fetching case study:', error);
      return res.status(500).json({ error: 'Failed to fetch case study' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const caseStudy = await prisma.caseStudy.update({
        where: { id },
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
          challenge: req.body.challenge,
          solution: req.body.solution,
          benefits: req.body.benefits,
        },
      });
      return res.status(200).json({ message: 'Case study updated successfully', data: caseStudy });
    } catch (error) {
      console.error('Error updating case study:', error);
      return res.status(500).json({ error: 'Failed to update case study' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.caseStudy.delete({
        where: { id },
      });
      return res.status(200).json({ message: 'Case study deleted successfully' });
    } catch (error) {
      console.error('Error deleting case study:', error);
      return res.status(500).json({ error: 'Failed to delete case study' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
