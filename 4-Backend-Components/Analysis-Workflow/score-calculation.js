/**
 * Performance Review Score Calculation - XYZ Framework
 * 
 * This code calculates a score (0-100) for performance review bullets based on the XYZ framework:
 * - X (Outcome): Achievement/impact statements (40 points)
 * - Y (Metrics): Quantifiable numbers/metrics (40 points)
 * - Z (Method): How the work was done (20 points)
 * 
 * @param {string} text - The performance review bullet text
 * @returns {object} - Score, breakdown, and pain point message
 */

// XYZ Framework Score Calculation
const text = $input.first().json.text.toLowerCase();
const originalText = $input.first().json.text;

const breakdown = {
  outcome: { found: false, reason: '' },
  metrics: { found: false, reason: '' },
  method: { found: false, reason: '' }
};

// Check for OUTCOME (X) - Achievement/Impact indicators
const outcomeKeywords = [
  'achieved', 'delivered', 'improved', 'increased', 'decreased', 'reduced',
  'led', 'drove', 'established', 'created', 'launched', 'implemented'
];

for (const keyword of outcomeKeywords) {
  if (text.includes(keyword)) {
    breakdown.outcome.found = true;
    breakdown.outcome.reason = `Contains achievement indicator`;
    break;
  }
}

if (!breakdown.outcome.found) {
  breakdown.outcome.reason = 'Missing clear achievement or impact statement';
}

// Check for METRICS (Y) - Quantifiable numbers
if (/\d+/.test(text)) {
  breakdown.metrics.found = true;
  breakdown.metrics.reason = 'Contains quantifiable metrics';
} else {
  breakdown.metrics.reason = 'No quantifiable metrics detected';
}

// Check for METHOD (Z) - How it was done
const methodKeywords = [
  'by', 'through', 'via', 'using', 'with', 'implementing',
  'executing', 'managing', 'leading'
];

for (const keyword of methodKeywords) {
  if (text.includes(keyword)) {
    breakdown.method.found = true;
    breakdown.method.reason = `Contains method indicator`;
    break;
  }
}

if (!breakdown.method.found) {
  breakdown.method.reason = 'Missing explanation of how the work was done';
}

// Calculate overall score (0-100)
// Outcome: 40 points, Metrics: 40 points, Method: 20 points
let score = 0;
if (breakdown.outcome.found) score += 40;
if (breakdown.metrics.found) score += 40;
if (breakdown.method.found) score += 20;

// Generate pain point message based on score
let painPoint = '';
if (score < 40) {
  painPoint = 'Your review is weak and missing impact. Add specific achievements and measurable results.';
} else if (score < 70) {
  painPoint = 'Your review is generic and needs improvement. Add more quantifiable metrics or explain your method.';
} else if (score < 90) {
  painPoint = 'Your review is good but could be stronger. Consider adding more detail to missing elements.';
} else {
  painPoint = 'Excellent! Your review demonstrates clear impact with measurable results.';
}

// Return results
return [{
  json: {
    score: score,
    breakdown: breakdown,
    painPoint: painPoint,
    originalText: originalText
  }
}];







