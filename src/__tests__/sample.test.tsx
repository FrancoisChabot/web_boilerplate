import * as preact from 'preact';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/preact';

import { Lost } from '../pages/Lost';

test('Sample test', () => {
  const { queryByText } = render(<Lost />);

  expect(queryByText(/Where/i)).toBeInTheDocument();
});
