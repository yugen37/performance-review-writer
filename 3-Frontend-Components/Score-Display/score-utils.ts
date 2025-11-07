/**
 * Score Display Utility Functions
 * 
 * Helper functions for Score Display component:
 * - Score color determination
 * - Score category/rating
 * - Score formatting
 */

/**
 * Get color gradient class based on score
 * @param score - Score value (0-100)
 * @returns Tailwind gradient class string
 */
export function getScoreColor(score: number): string {
  if (score < 40) return 'from-red-500 to-red-600'
  if (score < 70) return 'from-orange-500 to-orange-600'
  return 'from-primary to-primary/90' // Teal gradient
}

/**
 * Get background color class based on score
 * @param score - Score value (0-100)
 * @returns Tailwind background color class string
 */
export function getScoreBgColor(score: number): string {
  if (score < 40) return 'bg-red-50 border-red-200'
  if (score < 70) return 'bg-orange-50 border-orange-200'
  return 'bg-primary/10 border-primary/30' // Teal-tinted
}

/**
 * Get text color class based on score
 * @param score - Score value (0-100)
 * @returns Tailwind text color class string
 */
export function getScoreTextColor(score: number): string {
  if (score < 40) return 'text-red-600'
  if (score < 70) return 'text-orange-600'
  return 'text-primary' // Teal
}

/**
 * Get score category/rating label
 * @param score - Score value (0-100)
 * @returns Category label string
 */
export function getScoreCategory(score: number): string {
  if (score >= 70) return 'Excellent'
  if (score >= 40) return 'Good'
  return 'Needs Improvement'
}

/**
 * Get badge variant based on score
 * @param score - Score value (0-100)
 * @returns Badge variant string
 */
export function getScoreBadgeVariant(score: number): 'default' | 'secondary' | 'destructive' {
  if (score >= 70) return 'default'
  if (score >= 40) return 'secondary'
  return 'destructive'
}

/**
 * Format score for display
 * @param score - Score value (0-100)
 * @returns Formatted score string
 */
export function formatScore(score: number): string {
  return Math.round(score).toString()
}

/**
 * Get breakdown item status
 * @param found - Whether the item was found
 * @returns Status object with badge variant and label
 */
export function getBreakdownItemStatus(found: boolean): {
  variant: 'default' | 'destructive'
  label: string
  icon: 'check' | 'x'
} {
  return {
    variant: found ? 'default' : 'destructive',
    label: found ? 'Found' : 'Missing',
    icon: found ? 'check' : 'x'
  }
}

/**
 * Calculate score percentage
 * @param score - Score value (0-100)
 * @returns Percentage string
 */
export function getScorePercentage(score: number): string {
  return `${Math.round(score)}%`
}

/**
 * Get score description based on range
 * @param score - Score value (0-100)
 * @returns Description string
 */
export function getScoreDescription(score: number): string {
  if (score >= 70) {
    return 'Your review demonstrates strong impact with measurable results.'
  }
  if (score >= 40) {
    return 'Your review is good but could be stronger with more specific metrics.'
  }
  return 'Your review needs improvement. Focus on adding clear outcomes, metrics, and methods.'
}

