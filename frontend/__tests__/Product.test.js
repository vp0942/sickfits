import { render, screen } from '@testing-library/react';
import Product from '../components/Product';
import { fakeItem } from '../lib/testUtils';
// Mocked provider is a component that mocks the Apollo provider
import { MockedProvider } from '@apollo/client/testing';
import priceTag from '../components/styles/PriceTag';

// Fake item from testUtils.js (in /lib)
const product = fakeItem();
describe('<Product />', () => {
  it('it renders out the price tag and title', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>,
    );

    // Test the intire element
    debug();

    // Test the priceTag element
    const priceTag = screen.getByText('$50');
    debug(priceTag);
    expect(priceTag).toBeInTheDocument();

    // Test the <a> element
    const link = container.querySelector('a');
    debug(link);

    // Test for a specific attribute
    expect(link).toHaveAttribute('href', '/product/abc123');

    // Test for a specific text
    // expect(link).toHaveTextContent('dogs are best');
    expect(link).toHaveTextContent(product.name);

    // In the frontend word just check if the things render out appropriately

  });
});