import { makePaginationMocksFor } from '../lib/testUtils';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('<Pagination />', () => {

  it('displays a loading message', () => {
    const { container } = render(
      <MockedProvider mocks={makePaginationMocksFor(1)}>
        <Pagination />
      </MockedProvider>,
    );
    expect(container).toHaveTextContent('Loading...');
  });

  it('renders pagination for 18 items', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>,
    );
    // we need to wait for the data to load
    // We have added a data-testid to the pagination div
    await screen.findByTestId('pagination');
    debug();
    expect(container).toHaveTextContent('Page 1 of 9');
    // Here we use a data-testid to find the span that holds the page count
    const pageCountSpan = screen.getByTestId('pageCount');
    expect(pageCountSpan).toHaveTextContent('9'); // we grab a spa and check its content
    // We can also make a snapshot of the whole component
    expect(container).toMatchSnapshot();
  });

  it('desables the prev page on first page', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(6)}>
        <Pagination page={1} />
      </MockedProvider>,
    );
    // we need to wait for the data to load
    // We have added a data-testid to the pagination div
    await screen.findByTestId('pagination');
    debug();
    const prevButton = screen.getByText(/prev/i);
    const nextButton = screen.getByText(/next/i);
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');

  });

  it('desables the next page on last page', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(6)}>
        <Pagination page={3} />
      </MockedProvider>,
    );
    // we need to wait for the data to load
    // We have added a data-testid to the pagination div
    await screen.findByTestId('pagination');
    debug();
    const prevButton = screen.getByText(/prev/i);
    const nextButton = screen.getByText(/next/i);
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    expect(nextButton).toHaveAttribute('aria-disabled', 'true');

});
});  it('desables the prev page on middle page', async () => {
  const { container, debug } = render(
    <MockedProvider mocks={makePaginationMocksFor(6)}>
      <Pagination page={2} />
    </MockedProvider>,
  );
  // we need to wait for the data to load
  // We have added a data-testid to the pagination div
  await screen.findByTestId('pagination');
  debug();
  const prevButton = screen.getByText(/prev/i);
  const nextButton = screen.getByText(/next/i);
  expect(prevButton).toHaveAttribute('aria-disabled', 'false');
  expect(nextButton).toHaveAttribute('aria-disabled', 'false');

});
