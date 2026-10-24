export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateScenario(text: string): ValidationResult {
  const trimmed = text.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Scenario description is required.' };
  }
  if (trimmed.length < 5) {
    return {
      isValid: false,
      error: `Scenario is too brief (${trimmed.length} chars). Please provide at least 5 characters of incident narrative.`,
    };
  }
  if (trimmed.length > 5000) {
    return {
      isValid: false,
      error: `Scenario exceeds maximum length of 5,000 characters (current: ${trimmed.length}).`,
    };
  }
  return { isValid: true };
}

export function validateEmail(email: string): ValidationResult {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    return { isValid: false, error: 'Email address is required.' };
  }
  if (!regex.test(email.trim())) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }
  return { isValid: true };
}

export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: 'Password is required.' };
  }
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long.' };
  }
  return { isValid: true };
}

export function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
