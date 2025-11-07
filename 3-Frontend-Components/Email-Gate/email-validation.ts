/**
 * Email Gate Validation Utilities
 * 
 * Helper functions for Email Gate component:
 * - Email format validation
 * - Email sanitization
 * - Error message generation
 */

/**
 * Validates email format using regex
 * @param email - The email address to validate
 * @returns true if valid email format, false otherwise
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Validates email and returns detailed result
 * @param email - The email address to validate
 * @returns Validation result with error message if invalid
 */
export function validateEmailWithMessage(email: string): {
  isValid: boolean
  error?: string
} {
  // Check if empty
  if (!email || !email.trim()) {
    return {
      isValid: false,
      error: 'Please enter your email address'
    }
  }

  // Check format
  if (!validateEmail(email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    }
  }

  return {
    isValid: true
  }
}

/**
 * Sanitizes email input (trims whitespace, converts to lowercase)
 * @param email - The email address to sanitize
 * @returns Sanitized email address
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return ''
  }
  
  return email.trim().toLowerCase()
}

/**
 * Checks if email is empty
 * @param email - The email address to check
 * @returns true if empty, false otherwise
 */
export function isEmpty(email: string): boolean {
  return !email || email.trim() === ''
}

/**
 * Extracts domain from email address
 * @param email - The email address
 * @returns Domain name or null if invalid
 */
export function getEmailDomain(email: string): string | null {
  if (!validateEmail(email)) {
    return null
  }
  
  const parts = email.trim().split('@')
  return parts.length === 2 ? parts[1] : null
}

/**
 * Checks if email is from a common provider
 * @param email - The email address to check
 * @returns true if from common provider (gmail, yahoo, outlook, etc.)
 */
export function isCommonEmailProvider(email: string): boolean {
  const domain = getEmailDomain(email)
  if (!domain) return false
  
  const commonProviders = [
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'hotmail.com',
    'icloud.com',
    'aol.com',
    'mail.com',
    'protonmail.com'
  ]
  
  return commonProviders.includes(domain.toLowerCase())
}

/**
 * Validates email length (reasonable limits)
 * @param email - The email address to validate
 * @returns true if length is valid (max 254 chars per RFC 5321)
 */
export function validateEmailLength(email: string): boolean {
  if (!email) return false
  // RFC 5321: Maximum email length is 254 characters
  return email.length <= 254
}

