import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SignUp from '../components/SignUp';
import RequestReset, { REQUEST_RESET_MUTATION } from '../components/RequestReset';
import userEvent from '@testing-library/user-event';

const email = 'wesbos@gmail.com';

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email: email },
    },
    result: {
      data: { sendUserPasswordResetLink: null },
    },
  },
];

describe('<RequestReset/>', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('calls the mutation when submitted', async () => {
    const { container, debug } = render(
      // now we pass mocks to our MockedProvider
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>,
    );
    // type into the email box
    userEvent.type(screen.getByPlaceholderText(/email/i), email);
    // click on the button
    userEvent.click(screen.getByText(/request reset/i), 'Request Reset!');
    // we need to wait for the response from the mutation
    const success = await screen.findByText(/success/i);
    // screen.debug(success);
    debug();
    expect(success).toBeInTheDocument();
  });
});