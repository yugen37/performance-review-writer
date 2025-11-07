/**
 * Landing Page Input Validation Utilities
 * 
 * Validates user input for performance review bullets according to PRD requirements:
 * - Cannot be empty
 * - Maximum 200 words
 */

/**
 * Validates if text is empty
 * @param text - The text to validate
 * @returns true if empty, false otherwise
 */
export function isEmpty(text: string): boolean {
  return !text || text.trim() === ''
}

/**
 * Validates text length (word count)
 * @param text - The text to validate
 * @param maxWords - Maximum allowed words (default: 200)
 * @returns Object with isValid flag and wordCount
 */
export function validateLength(text: string, maxWords: number = 200): {
  isValid: boolean
  wordCount: number
  error?: string
} {
  const trimmedText = text.trim()
  const words = trimmedText.split(/\s+/).filter(word => word.length > 0)
  const wordCount = words.length

  if (wordCount === 0) {
    return {
      isValid: false,
      wordCount: 0,
      error: 'Please enter your performance review bullet'
    }
  }

  if (wordCount > maxWords) {
    return {
      isValid: false,
      wordCount,
      error: `Please enter a single bullet point. Your entry is too long (max ${maxWords} words).`
    }
  }

  return {
    isValid: true,
    wordCount
  }
}

/**
 * Validates the entire input according to PRD requirements
 * @param text - The text to validate
 * @returns Validation result with error message if invalid
 */
export function validateInput(text: string): {
  isValid: boolean
  error?: string
  wordCount: number
} {
  // Check if empty
  if (isEmpty(text)) {
    return {
      isValid: false,
      error: 'Please enter your performance review bullet',
      wordCount: 0
    }
  }

  // Check word count
  const lengthValidation = validateLength(text, 200)
  if (!lengthValidation.isValid) {
    return {
      isValid: false,
      error: lengthValidation.error,
      wordCount: lengthValidation.wordCount
    }
  }

  return {
    isValid: true,
    wordCount: lengthValidation.wordCount
  }
}

/**
 * Sanitizes input text (optional - for future use)
 * @param text - The text to sanitize
 * @returns Sanitized text
 */
export function sanitizeInput(text: string): string {
  return text.trim()
}

