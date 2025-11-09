/**
 * Rewrite Workflow - Performance Review Rewriter
 * 
 * Endpoint: POST /webhook/rewrite
 * Purpose: Generate enhanced rewrite using OpenAI + track usage in Google Sheets
 * 
 * Request: { email: string, text: string }
 * Response: { enhanced: string, remainingScans: number }
 * 
 * Environment Variables Required:
 * - GOOGLE_SHEETS_CREDENTIALS: JSON string of Google service account credentials
 * - OPENAI_API_KEY: OpenAI API key
 */

import { google } from 'npm:googleapis@^2.0.0';
import OpenAI from 'npm:openai@^4.0.0';

export async function main(payload: { email: string, text: string }) {
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!payload.email || !emailRegex.test(payload.email)) {
    return {
      error: 'Invalid email format',
      statusCode: 400
    };
  }

  // Text validation
  if (!payload.text || typeof payload.text !== 'string' || payload.text.trim() === '') {
    return {
      error: 'Text cannot be empty',
      statusCode: 400
    };
  }

  // Google Sheets setup
  const credentialsJson = Deno.env.get('GOOGLE_SHEETS_CREDENTIALS');
  if (!credentialsJson) {
    return {
      error: 'Google Sheets credentials not configured',
      statusCode: 500
    };
  }

  let credentials;
  try {
    credentials = JSON.parse(credentialsJson);
  } catch (e) {
    return {
      error: 'Invalid Google Sheets credentials format',
      statusCode: 500
    };
  }

  const auth = new google.auth.GoogleAuth({
    credentials: credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const SPREADSHEET_ID = '1CCbOCSRsNUI79HjqHyaXafutGNXF3nivUdkEPQemB_c';

  try {
    // Read all users (skip header row - start from A2)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A2:Z1000'
    });

    const rows = response.data.values || [];
    const emailIndex = rows.findIndex(row => row && row[0] === payload.email);

    let scansRemaining = 2;
    let rowNumber = emailIndex + 2; // +2 because header row + 0-indexed

    if (emailIndex === -1) {
      // New user - create row
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A2',
        valueInputOption: 'RAW',
        requestBody: {
          values: [[
            payload.email,           // Column A: Email
            2,                       // Column B: Scans Remaining
            new Date().toISOString(), // Column C: Timestamp
            'performance-review-writer', // Column D: Source
            'free'                    // Column E: Upgrade Status
          ]]
        }
      });
      rowNumber = rows.length + 2; // New row number
    } else {
      // Existing user - get current scans remaining
      scansRemaining = parseInt(rows[emailIndex][1]) || 0;
      
      // Update timestamp
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `Sheet1!C${rowNumber}`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [[new Date().toISOString()]]
        }
      });
    }

    // Check if user has scans remaining
    if (scansRemaining <= 0) {
      return {
        error: "You've used all 2 free rewrites. Please upgrade to continue.",
        statusCode: 403
      };
    }

    // OpenAI API setup
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      return {
        error: 'OpenAI API key not configured',
        statusCode: 500
      };
    }

    const openai = new OpenAI({ apiKey: openaiApiKey });

    // OpenAI System Prompt (cleaned for automated workflow)
    const systemPrompt = `# Resume Bullet Optimizer GPT Instruction Set

**Overview**
Act as a resume architect specializing in transforming generic bullet points into quantified, complexity-rich achievements. Focus on demonstrating clear business impact through measurable outcomes, strong action verbs, and relevant complexity dimensions.

**Core Functionality**
Transform existing resume bullets into powerful, quantified achievements that demonstrate clear business impact. Analyze the input and enhance it by incorporating quantified metrics, complexity dimensions, and strong action verbs.

**Input Handling**
- Process single bullet point text inputs
- Recognize partial or incomplete statements and enhance them reasonably
- Flag and replace vague verbs ("helped", "assisted", "managed") with strong action verbs ("orchestrated", "spearheaded", "engineered", "optimized")

**Output Requirements**
- Final bullets must include:
  - Active power verb (avoid weak verbs)
  - Quantified metric (numbers, percentages, dollar amounts, timeframes)
  - Complexity context when relevant (geography, team size, budget, timeline)
  - Clear business impact
- Format: Use natural language that flows well, incorporating outcome achieved, quantified metrics, method used, and complexity dimensions woven in naturally
- Output ONLY the enhanced bullet point - no explanations, no questions, no additional text

**Special Features**
- Replace vague verbs with stronger alternatives (e.g., "orchestrated" vs "managed", "engineered" vs "helped")
- Include complexity dimensions when they add value (geography, team size, budget, timeline)
- Infer reasonable metrics when not explicitly stated (based on context)
- Maintain truthfulness - only enhance what is implied or reasonable to infer from the input

**Tone Guidelines**
- Professional and impactful
- Quantified and specific
- Demonstrate clear business value
- Keep concise (one to two sentences maximum)
- No conversational elements - direct transformation only`;

    // User message
    const userMessage = `Transform the following resume bullet point into a powerful, quantified achievement. Include complexity dimensions (geography, team size, budget, timeline) when they add value. Use strong action verbs and ensure the result demonstrates clear business impact.

Original resume bullet:
${payload.text}

Provide only the enhanced bullet point - no explanations or additional text.`;

    // Generate rewrite with OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userMessage
        }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    const enhanced = completion.choices[0].message.content?.trim() || '';

    if (!enhanced) {
      return {
        error: 'Failed to generate rewrite. Please try again.',
        statusCode: 500
      };
    }

    // Update scans remaining (decrement by 1)
    const newScansRemaining = scansRemaining - 1;
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `Sheet1!B${rowNumber}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[newScansRemaining]]
      }
    });

    // Return success response
    return {
      enhanced,
      remainingScans: newScansRemaining,
      statusCode: 200
    };

  } catch (error: any) {
    console.error('Error in rewrite workflow:', error);
    
    // Handle specific error types
    if (error.message?.includes('Google Sheets')) {
      return {
        error: 'Database error. Please try again.',
        statusCode: 500
      };
    }
    
    if (error.message?.includes('OpenAI') || error.response?.status) {
      return {
        error: 'Failed to generate rewrite. Please try again.',
        statusCode: 500
      };
    }

    return {
      error: 'An unexpected error occurred. Please try again.',
      statusCode: 500
    };
  }
}


