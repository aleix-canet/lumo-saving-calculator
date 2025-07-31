import { render, screen } from '@testing-library/react';
import SavingsCalculator from './';

test('renders Home Page', () => {
  render(
    <SavingsCalculator />,
  );
  expect(screen.getByText('Click on the Vite and React logos to learn more')).toBeInTheDocument();
});