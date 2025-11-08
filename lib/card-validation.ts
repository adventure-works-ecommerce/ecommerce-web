// Card validation utilities

// Luhn algorithm for credit card validation
export function validateCardNumber(cardNumber: string): boolean {
  // Remove spaces and non-digits
  const cleaned = cardNumber.replace(/\s+/g, "").replace(/\D/g, "")

  if (cleaned.length < 13 || cleaned.length > 19) {
    return false
  }

  let sum = 0
  let isEven = false

  // Loop through values starting from the rightmost digit
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(cleaned.charAt(i), 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

// Validate expiry date (MM/YY format)
export function validateExpiryDate(expiryDate: string): boolean {
  const cleaned = expiryDate.replace(/\s+/g, "")
  const match = cleaned.match(/^(\d{2})\/(\d{2})$/)

  if (!match) {
    return false
  }

  const month = Number.parseInt(match[1], 10)
  const year = Number.parseInt(match[2], 10)

  if (month < 1 || month > 12) {
    return false
  }

  // Get current date
  const now = new Date()
  const currentYear = now.getFullYear() % 100 // Get last 2 digits
  const currentMonth = now.getMonth() + 1

  // Check if card is expired
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false
  }

  return true
}

// Validate CVV (3 or 4 digits)
export function validateCVV(cvv: string): boolean {
  const cleaned = cvv.replace(/\s+/g, "").replace(/\D/g, "")
  return cleaned.length === 3 || cleaned.length === 4
}

// Format card number with spaces (XXXX XXXX XXXX XXXX)
export function formatCardNumber(value: string): string {
  const cleaned = value.replace(/\s+/g, "").replace(/\D/g, "")
  const groups = cleaned.match(/.{1,4}/g)
  return groups ? groups.join(" ") : cleaned
}

// Format expiry date (MM/YY)
export function formatExpiryDate(value: string): string {
  const cleaned = value.replace(/\s+/g, "").replace(/\D/g, "")
  if (cleaned.length >= 2) {
    return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4)
  }
  return cleaned
}
