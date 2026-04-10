import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { title, description, problemSolved, techStack } = await request.json();

    if (!title || !description || !problemSolved) {
      return NextResponse.json({ error: "Title, Description and Problem Solved are required" }, { status: 400 });
    }

    // Using gemini-1.5-flash - currently more stable on free tier
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert startup investor and project evaluator for IdeaBuild, a student innovation platform.

Evaluate this student project idea for real-world viability, profit potential, and whether it deserves a cash prize.

Project Title: ${title}
Description: ${description}
Problem it Solves: ${problemSolved}
Tech Stack: ${techStack || "Not specified"}

Give a structured evaluation with:
1. Overall Score (out of 100)
2. Feasibility Score (1-10)
3. Innovation Score (1-10)
4. Real-world Impact Score (1-10)
5. Profit Potential Score (1-10)
6. Prize Worthiness (Yes/No + short reason)
7. Key Strengths
8. Weaknesses / Suggestions
9. Final Recommendation (Strongly Recommend / Recommend with Changes / Not Recommended)

Be honest, constructive, and focus on both business value and student learning.`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return NextResponse.json({ 
      validation: response,
      success: true 
    });

  } catch (error: unknown) {
    console.error("API Error:", error);

    let userMessage = "AI validation failed. Please try again in a few minutes.";

    if (error instanceof Error && (error.message.includes("429") || error.message.includes("quota"))) {
      userMessage = "Gemini free tier quota reached. Please wait 1-2 minutes and try again.";
    }

    return NextResponse.json({ 
      error: userMessage 
    }, { status: 500 });
  }
}