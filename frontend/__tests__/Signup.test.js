import { fakeUser } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../components/User';
import SignUp, { SIGNUP_MUTATION } from '../components/SignUp';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import wait from 'waait';

const me = fakeUser();

const password = 'wes';

const mocks = [
  // Mutation mock
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        password: password,
      }
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  // Current user mock (not needed for this test)
  // {
  //   request: {query: CURRENT_USER_QUERY},
  //   result: {data: {authenticatedItem: me}},
  // },
];

describe('<SignUp/>', () => {
  it('renders and matches snapshot', async () => {
    const { container } = render(
      <MockedProvider>
        <SignUp />
      </MockedProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('calls the mutation properly', async() => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <SignUp />
      </MockedProvider>,
    );
    // Select the input boxes with .getByPlaceholderText and type in them
    await userEvent.type(screen.getByPlaceholderText(/name/i), me.name);
    await userEvent.type(screen.getByPlaceholderText(/email/i), me.email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), password);
    // debug();
    // Select the submit button with .getByText and click it
    await userEvent.click(screen.getByText('Sign Up!'));
    // Wait for the response just to be on the safe side. We can
    // await wait();
    await screen.findByText(`Signed up with ${me.email} - Please Go Ahead and Sign in!`); // .findByText is async
    debug();
  });
});