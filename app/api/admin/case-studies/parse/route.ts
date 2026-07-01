import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

// Helper to check the cookie manually
function getAuth(req: NextRequest) {
  const token = req.cookies.get("adminToken")?.value;
  if (!token) throw new Error("Unauthorized");
  
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    throw new Error("Unauthorized: Invalid Token");
  }
}

const industriesList = [
  "Financial Data & Investment Intelligence",
  "Fintech & Digital Financial Services",
  "Telecommunications",
  "E-Commerce & Retail Technology",
  "Staffing, Recruitment & Professional Services",
  "Global Marketing & Advertising",
  "AI & Productivity Software",
  "Ride-Hailing & Mobility",
  "Ride-Hailing & Delivery",
  "Telecommunications & Digital Services",
  "Professional Services & Consulting",
  "B2B Services & Sales Operations",
  "Professional Services & Operations",
  "Professional Services & Technology",
  "Digital Banking & Financial Services",
  "Real Estate Analytics & Short Term Rentals",
  "E-Commerce",
  "Healthcare Technology",
  "Industrial Manufacturing & Distribution",
];

const businessFunctionsList = [
  "CRM Automation", "Email Processing", "Investor Relations", "Data Structuring",
  "Legal Review", "Contract Management", "Risk Analysis", "Procurement",
  "Customer Support", "Infrastructure Engineering", "AI Operations", "Marketing Analytics",
  "Product Analytics", "A/B Testing", "Data Engineering", "Recruitment", "Operations",
  "AI Training", "Workflow Automation", "Marketing", "Content Production",
  "Creative Automation", "Personal Productivity", "Email Management", "Calendar Management",
  "Pricing Strategy", "Revenue Management", "Marketplace Operations", "Fraud Prevention",
  "Risk Management", "Customer Segmentation", "Promotional Strategy", "Supply Planning",
  "Demand Management", "Customer Experience", "Real-Time Analytics", "Cost Management"
];

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate
    getAuth(req);

    const { text } = await req.json();
    if (!text || typeof text !== "string" || text.trim() === "") {
      return NextResponse.json({ error: "Missing or invalid case study text" }, { status: 400 });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured in the server environment (.env file)." },
        { status: 500 }
      );
    }

    const prompt = `
You are an expert AI copywriter and data extractor.
Analyze the following unstructured Case Study text and parse it into a structured JSON object matching the schema below.

Important Extraction Rules:
1. FAITHFUL TEXT RETRIEVAL: For all textual fields (such as 'overview', 'client', 'challenge', 'keyConstraints', 'uniqueSolution', 'results', 'summary', 'challenges', 'solution', 'benefits'), you must extract every single paragraph and sentence under that corresponding heading EXACTLY as it is in the source text. DO NOT summarize, compress, shorten, paraphrase, or omit any paragraphs.
2. PRESERVE BULLET POINTS: Keep bullet points (lines starting with '•' or '-' or similar) exactly in bullet format with newlines ('\\n') in the JSON string fields (e.g., 'benefits', 'results'). Do NOT collapse bullet points into a single block of text or paragraph.
3. solutionAgents EXTRACTION:
   - Identify the detailed solution modules/components under the "Solution" section in the "A Deep Dive" part of the text (e.g., "Knowledge Base Layer", "Multimodal Retrieval Architecture", etc.).
   - Extract each block where the subheading is the 'title' and the paragraphs below it are the 'description'.
   - Format: Array<{ title: string, description: string }>
4. tech EXTRACTION:
   - Under the "Technology Stack" section, extract each category (e.g., "AI & Retrieval", "Cloud Infrastructure", "Enterprise Governance") as the 'title', and the exact list of bulleted technologies under it as the 'description' (retaining the bullet points and newlines format).
   - Format: Array<{ title: string, description: string }>
5. "industry": Must be an array of strings representing categories. Choose the most appropriate categories from this list:
   ${JSON.stringify(industriesList)}
   If no match is found, extract a short, suitable category string from the text.
6. "businessFunction": Must be an array of strings representing functions. Choose the most appropriate functions from this list:
   ${JSON.stringify(businessFunctionsList)}
   If no match is found, extract a short, suitable function string from the text.
7. "slug": Generate a URL-friendly slug based on the title (e.g., "title-of-case-study").
8. Return ONLY a valid JSON object matching the schema below, without any markdown formatting blocks like \`\`\`json.

JSON Schema:
{
  "slug": "string (url-friendly slug)",
  "title": "string (main title of case study)",
  "subtitle": "string (catchy subtitle/hook)",
  "industry": ["string"],
  "businessFunction": ["string"],
  "description": "string (brief overview description)",
  "clientName": "string (name of the client/company or 'N/A')",
  "clientIndustry": "string (client industry or 'N/A')",
  "clientMarket": "string (client market e.g., US, Global, Europe or 'N/A')",
  "clientTechnology": "string (main technology client used or 'N/A')",
  "challenges": "string (core challenge in nutshell, extract exactly as written)",
  "solution": "string (core solution in nutshell, extract exactly as written)",
  "benefits": "string (core benefits in nutshell, extract exactly as written, preserving bullets/newlines)",
  "overview": "string (detailed project overview, extract exactly as written)",
  "client": "string (detailed client context/background, extract exactly as written)",
  "challenge": "string (detailed challenge description, extract exactly as written)",
  "keyConstraints": "string (key constraints, extract exactly as written or 'N/A')",
  "solutionAgents": [{"title": "string", "description": "string (extract exactly as written)"}],
  "uniqueSolution": "string (what made this solution unique, extract exactly as written or 'N/A')",
  "tech": [{"title": "string", "description": "string (bulleted technologies list with newlines)"}],
  "results": "string (business outcomes/metrics, extract exactly as written, preserving bullets/newlines or 'N/A')",
  "summary": "string (concluding summary paragraph, extract exactly as written)"
}

Case Study Text to parse:
${text}
`;

    // Try models in order: gemini-2.5-flash, gemini-2.0-flash, gemini-flash-latest
    const modelsToTry = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-flash-latest"
    ];

    let response = null;
    let lastError = null;

    for (const model of modelsToTry) {
      try {
        console.log(`Attempting parse with model: ${model}`);
        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });

        if (response.ok) {
          console.log(`Successfully parsed with model: ${model}`);
          break;
        } else {
          const errBody = await response.text();
          lastError = `Model ${model} failed with status ${response.status}: ${errBody}`;
          console.warn(lastError);
        }
      } catch (err: any) {
        lastError = `Request to model ${model} threw error: ${err.message}`;
        console.error(lastError);
      }
    }

    if (!response || !response.ok) {
      return NextResponse.json({
        error: "All attempted Gemini models failed to parse text",
        details: lastError
      }, { status: 502 });
    }

    const result = await response.json();
    const parsedText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!parsedText) {
      return NextResponse.json({ error: "Gemini API returned an empty response" }, { status: 502 });
    }

    // Attempt to parse the JSON
    let parsedJson;
    try {
      parsedJson = JSON.parse(parsedText.trim());
    } catch (parseErr: any) {
      console.error("JSON Parse Error on response:", parsedText);
      return NextResponse.json({
        error: "AI returned invalid JSON format. Please try again with a cleaner text format.",
        rawResponse: parsedText
      }, { status: 422 });
    }

    // Standardize empty/null fields to match FormState defaults
    const cleanedJson = {
      slug: parsedJson.slug || "",
      title: parsedJson.title || "",
      subtitle: parsedJson.subtitle || "",
      image: "", // user will upload/enter manually
      heroImage: "", // user will upload/enter manually
      industry: Array.isArray(parsedJson.industry) ? parsedJson.industry : [],
      businessFunction: Array.isArray(parsedJson.businessFunction) ? parsedJson.businessFunction : [],
      description: parsedJson.description || "",
      clientName: parsedJson.clientName || "",
      clientIndustry: parsedJson.clientIndustry || "",
      clientMarket: parsedJson.clientMarket || "",
      clientTechnology: parsedJson.clientTechnology || "",
      challenges: parsedJson.challenges || "",
      solution: parsedJson.solution || "",
      benefits: parsedJson.benefits || "",
      overview: parsedJson.overview || "",
      client: parsedJson.client || "",
      challenge: parsedJson.challenge || "",
      keyConstraints: parsedJson.keyConstraints || "N/A",
      solutionAgents: Array.isArray(parsedJson.solutionAgents) ? parsedJson.solutionAgents : [{ title: "", description: "" }],
      uniqueSolution: parsedJson.uniqueSolution || "N/A",
      tech: Array.isArray(parsedJson.tech) ? parsedJson.tech : [{ title: "", description: "" }],
      results: parsedJson.results || "N/A",
      summary: parsedJson.summary || "",
    };

    return NextResponse.json(cleanedJson);
  } catch (error: any) {
    console.error("Parse API error:", error);
    const status = error.message.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}
