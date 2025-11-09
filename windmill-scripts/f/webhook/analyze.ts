/**
 * Analysis Workflow - Performance Review Analyzer
 * 
 * Endpoint: POST /webhook/analyze
 * Purpose: Analyze performance review bullets and return score + breakdown
 * 
 * Request: { text: string }
 * Response: { score: number, breakdown: object, painPoint: string, originalText: string }
 */

export async function main(payload: { text: string }) {
  // Input validation
  if (!payload.text || typeof payload.text !== 'string') {
    return {
      error: 'Text cannot be empty',
      statusCode: 400
    };
  }

  const text = payload.text.trim();
  
  if (text === '') {
    return {
      error: 'Text cannot be empty',
      statusCode: 400
    };
  }

  // Word count validation (max 200 words)
  const words = text.split(/\s+/).filter(word => word.length > 0);
  if (words.length > 200) {
    return {
      error: 'Text exceeds 200 words. Please enter a single bullet point.',
      statusCode: 400
    };
  }

  // XYZ Framework Analysis
  const textLower = text.toLowerCase();
  
  // Check for OUTCOME (X) - Achievement/Impact indicators (40 points)
  const outcomeKeywords = [
    'achieved', 'delivered', 'improved', 'increased', 'decreased', 'reduced',
    'saved', 'led', 'drove', 'established', 'created', 'launched', 'implemented'
  ];
  
  let hasOutcome = false;
  let outcomeReason = 'Missing clear achievement or impact statement';
  
  for (const keyword of outcomeKeywords) {
    if (textLower.includes(keyword)) {
      hasOutcome = true;
      outcomeReason = 'Contains achievement indicator';
      break;
    }
  }

  // Check for METRICS (Y) - Quantifiable numbers (40 points)
  const hasMetrics = /\d+/.test(text);
  const metricsReason = hasMetrics 
    ? 'Contains quantifiable metrics' 
    : 'No quantifiable metrics detected';

  // Check for METHOD (Z) - How it was done (20 points)
  const methodKeywords = [
    'by', 'through', 'via', 'using', 'with', 'implementing',
    'executing', 'managing', 'leading', 'developing', 'designing'
  ];
  
  let hasMethod = false;
  let methodReason = 'Missing explanation of how the work was done';
  
  for (const keyword of methodKeywords) {
    if (textLower.includes(keyword)) {
      hasMethod = true;
      methodReason = 'Contains method indicator';
      break;
    }
  }

  // Calculate score (0-100)
  // Outcome: 40 points, Metrics: 40 points, Method: 20 points
  let score = 0;
  if (hasOutcome) score += 40;
  if (hasMetrics) score += 40;
  if (hasMethod) score += 20;

  // Build breakdown object
  const breakdown = {
    outcome: {
      found: hasOutcome,
      reason: outcomeReason
    },
    metrics: {
      found: hasMetrics,
      reason: metricsReason
    },
    method: {
      found: hasMethod,
      reason: methodReason
    }
  };

  // Generate pain point message based on score
  let painPoint = '';
  if (score >= 90) {
    painPoint = 'Excellent! Your review demonstrates clear impact with measurable results.';
  } else if (score >= 70) {
    painPoint = 'Good! Your review shows impact, but could be stronger with more specific details.';
  } else if (score >= 40) {
    painPoint = 'Your review has some good elements, but it needs more quantifiable metrics and clearer impact.';
  } else {
    const missing = [];
    if (!hasOutcome) missing.push('clear achievement');
    if (!hasMetrics) missing.push('quantifiable metrics');
    if (!hasMethod) missing.push('method explanation');
    painPoint = `Your review needs improvement. Consider adding: ${missing.join(', ')}.`;
  }

  // Return success response
  return {
    score,
    breakdown,
    painPoint,
    originalText: payload.text,
    statusCode: 200
  };
}


