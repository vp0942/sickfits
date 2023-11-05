// Make some mocks for being logged out, logged in, and logged in with cart items
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeCartItem, fakeUser } from '../lib/testUtils';
import Nav from '../components/Nav';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { CartStateProvider } from '../lib/cartState';

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: null } },
  },
];

const SignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: fakeUser() } },
  },
];

const SignedInMocksWithCartItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        authenticatedItem: fakeUser(
          { cart: [fakeCartItem(),] },
        ),
      },
    },
  },
];

describe('<Nav/>', () => {
  it('Renders a minimal nav when signed out', () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={notSignedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>);
    debug();
    expect(container).toHaveTextContent('Sign In');
    expect(container).toMatchSnapshot();
    const link = screen.getByText('Sign In');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/signin');
    const productsLink = screen.getByText('Products');
    expect(productsLink).toBeInTheDocument();

    // And we keep writing expects until we have confidence in our component
  });
  it('renders a full nav when signed in', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={SignedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>);
    // Initially Apollo will return loading true and then when the query is done it will return the data
    // So initially will get signed out nav and then after a while - signed in nav
    // So we need to wait for the signed in nav to appear. We can do that by using findByText
    // which is asynchronous and will wait for the text to appear
    await screen.findByText('Account');
    debug();
    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent('Sign Out');
  });

  it('renders the amount of items in the cart', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={SignedInMocksWithCartItems}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>);
    await screen.findByText('Account');
    debug();
    expect(container).toHaveTextContent('3');
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});