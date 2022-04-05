import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Pagination from './Pagination';

test('Pagination component', () => {
  const count = 21;
  const currentPage = 3;
  const displayedPerPage = 5;
  const linkPartial = '/page';
  const totalPages = 5;

  const { getByText } = render(
    <MemoryRouter>
      <Pagination
        count={count}
        currentPage={currentPage}
        displayedPerPage={displayedPerPage}
        linkPartial={linkPartial}
        totalPages={totalPages}
      />
    </MemoryRouter>
  );

  // Since we are showing a page that has pages before and after it,
  // we expect to see both our Previous and Next links in the components
  const previousLink = getByText('← Previous');
  const nextLink = getByText('Next →');
  expect(previousLink).toBeInTheDocument();
  expect(nextLink).toBeInTheDocument();

  // With our current page as 3, we expect the Previous link to go to page 2
  // and the Next link to go to page 4
  expect(previousLink).toHaveAttribute('href', '/page/2');
  expect(nextLink).toHaveAttribute('href', '/page/4');
});
