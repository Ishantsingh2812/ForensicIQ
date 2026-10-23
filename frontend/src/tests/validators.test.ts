import { describe, it, expect } from 'vitest';
import { validateScenario, validateEmail, validatePassword } from '../lib/validators';

describe('Form Validators', () => {
  it('validates scenario minimum and maximum length', () => {
    expect(validateScenario('').isValid).toBe(false);
    expect(validateScenario('Too short scenario.').isValid).toBe(false);
    
    const validText = 'On October 14, two individuals on a motorcycle intercepted the complainant near Bandra West and brandished a firearm to steal his belongings.';
    expect(validateScenario(validText).isValid).toBe(true);

    const longText = 'A'.repeat(5001);
    expect(validateScenario(longText).isValid).toBe(false);
  });

  it('validates email formats', () => {
    expect(validateEmail('invalid-email').isValid).toBe(false);
    expect(validateEmail('trainee@policeacademy.gov.in').isValid).toBe(true);
  });

  it('validates password minimum length of 8 characters', () => {
    expect(validatePassword('12345').isValid).toBe(false);
    expect(validatePassword('SecurePass123!').isValid).toBe(true);
  });
});
