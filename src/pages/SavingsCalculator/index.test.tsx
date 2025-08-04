import { render, screen } from '@testing-library/react';
import SavingsCalculator from './';

test('renders Home Page', () => {
  render(
    <SavingsCalculator />,
  );
  expect(screen.getByText('Lumo energy savings calculator')).toBeInTheDocument();
});