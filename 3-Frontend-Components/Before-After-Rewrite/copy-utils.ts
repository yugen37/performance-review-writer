/**
 * Copy to Clipboard Utility Functions
 * 
 * Helper functions for Before/After Rewrite component:
 * - Copy text to clipboard
 * - Clipboard API fallback
 * - Copy success/error handling
 */

/**
 * Copies text to clipboard using modern Clipboard API
 * @param text - The text to copy
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text || typeof text !== 'string') {
    return false
  }

  // Check if Clipboard API is available
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
      return false
    }
  }

  // Fallback for older browsers
  return fallbackCopyToClipboard(text)
}

/**
 * Fallback method for copying to clipboard (for older browsers)
 * @param text - The text to copy
 * @returns true if successful, false otherwise
 */
function fallbackCopyToClipboard(text: string): boolean {
  try {
    // Create a temporary textarea element
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    
    // Select and copy
    textArea.focus()
    textArea.select()
    
    const successful = document.execCommand('copy')
    document.body.removeChild(textArea)
    
    return successful
  } catch (err) {
    console.error('Fallback copy failed:', err)
    return false
  }
}

/**
 * Copies text to clipboard with error handling
 * @param text - The text to copy
 * @returns Object with success status and error message if failed
 */
export async function copyToClipboardWithError(text: string): Promise<{
  success: boolean
  error?: string
}> {
  if (!text || typeof text !== 'string') {
    return {
      success: false,
      error: 'No text provided to copy'
    }
  }

  const success = await copyToClipboard(text)
  
  if (success) {
    return { success: true }
  } else {
    return {
      success: false,
      error: 'Failed to copy to clipboard. Please try again.'
    }
  }
}

/**
 * Checks if clipboard API is available
 * @returns true if Clipboard API is available, false otherwise
 */
export function isClipboardAPIAvailable(): boolean {
  return !!(navigator.clipboard && navigator.clipboard.writeText)
}

/**
 * Sanitizes text before copying (removes extra whitespace)
 * @param text - The text to sanitize
 * @returns Sanitized text
 */
export function sanitizeTextForCopy(text: string): string {
  if (!text || typeof text !== 'string') {
    return ''
  }
  
  // Trim and normalize whitespace
  return text.trim().replace(/\s+/g, ' ')
}

/**
 * Formats text for better clipboard display
 * @param text - The text to format
 * @returns Formatted text
 */
export function formatTextForCopy(text: string): string {
  if (!text || typeof text !== 'string') {
    return ''
  }
  
  // Preserve line breaks and trim
  return text.trim()
}

