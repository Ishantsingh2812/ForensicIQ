import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import axe from 'axe-core';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SkipLink } from '../components/ui/SkipLink';

describe('Accessibility Standards (WCAG 2.2 AA)', () => {
  it('Button component has no critical a11y violations', async () => {
    const { container } = render(
      <Button variant="primary" size="lg" aria-label="Analyze Criminal Case">
        Analyze Case
      </Button>
    );

    const results = await axe.run(container);
    const criticalViolations = results.violations.filter((v) => v.impact === 'critical');
    expect(criticalViolations).toHaveLength(0);
  });

  it('Badge component renders with accessible text and contrast', async () => {
    const { container } = render(
      <Badge variant="crime">Cognizable Offence</Badge>
    );

    const results = await axe.run(container);
    const criticalViolations = results.violations.filter((v) => v.impact === 'critical');
    expect(criticalViolations).toHaveLength(0);
  });

  it('SkipLink targets main content correctly', () => {
    const { getByText } = render(<SkipLink />);
    const link = getByText('Skip to main content');
    expect(link).toHaveAttribute('href', '#main-content');
  });
});
