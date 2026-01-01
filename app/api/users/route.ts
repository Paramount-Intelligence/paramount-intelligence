import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.caseStudy.findMany();
  return Response.json(users);
}