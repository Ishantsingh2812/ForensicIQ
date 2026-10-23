import { describe, it, expect } from 'vitest';
import { detectPii, anonymizePii } from '../lib/piiDetector';

describe('PII Detector & Redactor (DPDP Act Compliance)', () => {
  it('detects Indian phone numbers and redacts them', () => {
    const raw = 'Suspect contacted caller on 9876543210 regarding the ransom.';
    const result = detectPii(raw);
    expect(result.hasPii).toBe(true);
    expect(result.types).toContain('phone');

    const anonymized = anonymizePii(raw);
    expect(anonymized).toContain('[REDACTED_PHONE]');
    expect(anonymized).not.toContain('9876543210');
  });

  it('detects Aadhaar 12-digit numbers', () => {
    const raw = 'Victim identity confirmed via Aadhaar 1234 5678 9012 at hospital.';
    const result = detectPii(raw);
    expect(result.hasPii).toBe(true);
    expect(result.types).toContain('aadhaar');

    const anonymized = anonymizePii(raw);
    expect(anonymized).toContain('[REDACTED_AADHAAR]');
    expect(anonymized).not.toContain('1234 5678 9012');
  });

  it('detects PAN numbers', () => {
    const raw = 'Bank locker registered under PAN ABCDE1234F.';
    const result = detectPii(raw);
    expect(result.hasPii).toBe(true);
    expect(result.types).toContain('pan');

    const anonymized = anonymizePii(raw);
    expect(anonymized).toContain('[REDACTED_PAN]');
  });

  it('returns clean result when no PII is present', () => {
    const raw = 'Two unidentified individuals broke the glass cabinet at midnight and fled with cash.';
    const result = detectPii(raw);
    expect(result.hasPii).toBe(false);
    expect(result.types).toHaveLength(0);
  });
});
