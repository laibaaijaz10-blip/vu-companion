import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API route for AI-powered VU concept clearing
app.post('/api/concept-clear', async (req, res) => {
  try {
    const { courseCode, topic, doubt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return res.json({
        fallback: true,
        message: 'No GEMINI_API_KEY configured; utilizing local high-fidelity curriculum engine.',
      });
    }

    const ai = new GoogleGenAI();
    const prompt = `You are a friendly, highly skilled senior tutor for Virtual University of Pakistan (VU) students across Semesters 1 to 8.
The student has a doubt/topic and wants an IN-DEPTH explanation so they do not have to re-watch a 50-minute video lecture.
Go deep into WHAT, WHY, HOW, and CLASSIFICATIONS/TYPES.

Course Code: ${courseCode || 'General VU Course'}
Topic / Question: ${topic || ''}
Specific Doubt: ${doubt || ''}

Please structure your explanation thoroughly following these exact sections:

### 1. 📌 WHAT IS IT? (Kia Hai?)
- Clear scientific / technical definition and formal identity.
- Exact chemical formula, technical specification, or mathematical notation.
- Key essential characteristics.

### 2. 💡 WHY DOES IT MATTER? (Kyun Zaroori Hai?)
- Primary purpose and why nature, system architectures, or businesses created/utilize it.
- Biological, computational, or enterprise role.
- What fails or ceases to work if this concept/molecule/mechanism is absent.

### 3. ⚙️ HOW DOES IT FORM / WORK? (Kese Banta Hai / Kaam Karta Hai?)
- Exact step-by-step formation process or operational mechanism.
- Chemical reaction equation, programming syntax/code snippet, or mathematical formula.
- Step-by-step sequential flow (Step 1, Step 2, Step 3, Step 4).

### 4. 🗂️ MAJOR TYPES & CLASSIFICATIONS (Inki Majors / Types Kia Hain?)
- Comprehensive list of the major classes/types with descriptive explanations and concrete examples (e.g., if Carbohydrates: Monosaccharides, Disaccharides, Oligosaccharides, Polysaccharides).

### 5. 🗣️ ASAAN ALFAAZ & ROZMARRAH KI MISAAL (In-Depth Roman Urdu)
- Conversational Pakistani Roman Urdu breakdown using a relatable daily-life Pakistani analogy (e.g., car petrol, vending machine, shop ledger) so the student instantly connects intuition to the theory.

### 6. 🎯 VU EXAM PAST PAPERS SECRET (Midterm & Finalterm)
- Frequent 3-to-5 marks subjective questions asked in VU papers.
- Long question structure.
- Tricky MCQ tip from past papers.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    return res.json({
      success: true,
      explanation: response.text,
      source: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    // Return fallback gracefully so client uses offline engine without 500 error
    return res.json({
      fallback: true,
      message: 'Using offline curriculum engine',
    });
  }
});

// API route for AI-powered Student Assignment Humanizer
app.post('/api/humanize-assignment', async (req, res) => {
  try {
    const { text, tone, courseContext } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return res.json({
        fallback: true,
        message: 'No GEMINI_API_KEY configured; using local humanizer engine.',
      });
    }

    const ai = new GoogleGenAI();
    const prompt = `You are an expert academic writing editor for Virtual University of Pakistan (VU) undergraduate students.
The student has drafted an assignment using AI tools or rough notes, and needs it humanized into authentic, natural, undergraduate coursework English that bypasses AI detectors (such as Turnitin) cleanly and ethically.

Original Student Draft:
"""
${text}
"""

Tone Requested: ${tone || 'Standard Undergraduate Coursework'}
Course Context: ${courseContext || 'VU Coursework'}

Rules for Humanizing:
1. STRICTLY ELIMINATE all robotic AI cliché words and phrases:
   - "delve into", "tapestry", "testament to", "multifaceted", "beacon", "in today's fast-paced world", "furthermore", "moreover" overuse, "it is important to note that", "plays a crucial role in", "serves as a reminder", "unleash", "holistic approach", "paradigm shift".
2. Vary sentence length dramatically (create high burstiness and perplexity): mix short 5-8 word direct statements with well-argued 18-word compound sentences.
3. Write in an authentic, intelligent Pakistani undergraduate academic voice: direct, logical, grammatically sound, avoiding pretentious purple prose.
4. Keep all factual arguments, technical code/formulas, citations, and specific course names accurate.
5. Provide ONLY the final humanized text directly without conversational meta-commentary or wrapping quotes.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    return res.json({
      success: true,
      humanizedText: response.text?.trim() || '',
      source: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    return res.json({
      fallback: true,
      message: 'Using offline student humanizer algorithm',
    });
  }
});

// API route for AI-powered VU Quiz Solver (Solve With AI)
app.post('/api/solve-quiz', async (req, res) => {
  try {
    const { question, options, courseCode } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return res.json({
        fallback: true,
        message: 'No GEMINI_API_KEY configured; utilizing local curriculum knowledge engine.',
      });
    }

    const ai = new GoogleGenAI();
    const prompt = `You are an expert Virtual University of Pakistan (VU) quiz solver and academic tutor.
Analyze this official VU quiz question and choose the 100% correct option based on official VU Course Handouts.

Course Code: ${courseCode || 'VU General Course'}
Question Statement:
${question}

Available Options:
${(options || []).map((opt: string, i: number) => `${i + 1}. ${opt}`).join('\n')}

Respond ONLY with a valid JSON object strictly matching this schema, without extra markdown or text:
{
  "correctOptionIndex": <0-based index of the correct option>,
  "correctOptionText": "<the exact text of the correct option>",
  "confidenceScore": <integer between 90 and 100>,
  "handoutReference": "<specific VU Handouts lecture / module reference proof>",
  "rationale": "<1-2 sentence clear explanation why this is correct and why other choices are distractors>"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    return res.json({
      success: true,
      solution: {
        ...parsed,
        source: 'gemini-3.8-flash',
      },
    });
  } catch (error: any) {
    return res.json({
      fallback: true,
      message: 'Using offline VU curriculum quiz engine',
    });
  }
});


// Mount Vite middleware in development
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`VU Companion server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
