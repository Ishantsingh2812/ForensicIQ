export interface PiiDetectionResult {
  hasPii: boolean;
  types: ('phone' | 'aadhaar' | 'pan' | 'email')[];
  findingsCount: number;
}

export function detectPii(text: string): PiiDetectionResult {
  const types: ('phone' | 'aadhaar' | 'pan' | 'email')[] = [];
  let findingsCount = 0;

  // Phone regex: Indian 10-digit, optionally with +91 or 0
  const phoneRegex = /(?:(?:\+91|0)?[6-9]\d{9})\b/g;
  const phones = text.match(phoneRegex);
  if (phones && phones.length > 0) {
    types.push('phone');
    findingsCount += phones.length;
  }

  // Aadhaar regex: 12 digits (with optional spaces or dashes)
  const aadhaarRegex = /\b\d{4}[ -]?\d{4}[ -]?\d{4}\b/g;
  const aadhaars = text.match(aadhaarRegex);
  if (aadhaars && aadhaars.length > 0) {
    types.push('aadhaar');
    findingsCount += aadhaars.length;
  }

  // PAN regex: 5 uppercase letters, 4 digits, 1 uppercase letter
  const panRegex = /\b[A-Z]{5}[0-9]{4}[A-Z]\b/gi;
  const pans = text.match(panRegex);
  if (pans && pans.length > 0) {
    types.push('pan');
    findingsCount += pans.length;
  }

  // Email regex
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const emails = text.match(emailRegex);
  if (emails && emails.length > 0) {
    types.push('email');
    findingsCount += emails.length;
  }

  return {
    hasPii: types.length > 0,
    types,
    findingsCount,
  };
}

export function anonymizePii(text: string): string {
  let cleaned = text;

  // Mask emails first
  cleaned = cleaned.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[REDACTED_EMAIL]');

  // Mask PAN
  cleaned = cleaned.replace(/\b[A-Z]{5}[0-9]{4}[A-Z]\b/gi, '[REDACTED_PAN]');

  // Mask Aadhaar (12-digit)
  cleaned = cleaned.replace(/\b\d{4}[ -]?\d{4}[ -]?\d{4}\b/g, '[REDACTED_AADHAAR]');

  // Mask phone
  cleaned = cleaned.replace(/(?:(?:\+91|0)?[6-9]\d{9})\b/g, '[REDACTED_PHONE]');

  return cleaned;
}
