import { fakeItem } from '../lib/testUtils';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import CreateProduct, { CREATE_PRODUCT_MUTATION } from '../components/CreateProduct';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import wait from 'waait';

const item = fakeItem();

// mock the router because we can't stop Router.push in CreateProducts.js from being called
// so we have to replace it with a mock function. This will still ensure that the function
// (the jest.fn)will be called with the appropriate values.
// jest will find the push function in the router and replace it with a mock function
jest.mock('next/router', () => {return {push: jest.fn()};});


describe('<CreateProduct/>', () => {
  it('renders and matches snapshot', () => {
    const { container, debug } = render(
      // no need to pass mocks here as we are not testing the mutation (no submitting) yet
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('handles the updating', async () => {
    // render the form out
    const { container, debug } = render(
      // no need to pass mocks here as we are not testing the mutation (no submitting) yet
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>,
    );
    // type into the boxes
    await userEvent.type(screen.getByPlaceholderText(/name/i), item.name);
    await userEvent.type(screen.getByPlaceholderText(/price/i), item.price.toString()); // toString() because price is a number
    await userEvent.type(screen.getByPlaceholderText(/description/i), item.description);
    // check that those boxes are populated!
    // getByDisplayValue is used for inputs
    expect(screen.getByDisplayValue(item.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.price)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.description)).toBeInTheDocument();
  });

  it('creates the items when the form is submitted', async () => {
    // creates the mocks for the mutation
    const mocks = [
      // mock the mutation
      {
        request: {
          query: CREATE_PRODUCT_MUTATION,
          variables: {
            name: item.name,
            description: item.description,
            image: '',
            price: item.price,
          },
        },
        result: {
          data: {
            createProduct: {
              ...item, // all fakeItem fields
              __typename: 'Item',
            },
          },
        },
      },
      // Products also needs to be mocked as it is refetched after the mutation
      {
        request: {
          query: CREATE_PRODUCT_MUTATION,
          variables: {skip: 0, first:2 },
        },
        result: {
          data: {
            allProducts: [item],
          },
        },
      },
    ];

    const { container, debug } = render(
      // now we pass mocks to our MockedProvider
      <MockedProvider mocks={ mocks }>
        <CreateProduct />
      </MockedProvider>,
    );
    // type into the boxes
    await userEvent.type(screen.getByPlaceholderText(/name/i), item.name);
    await userEvent.type(screen.getByPlaceholderText(/price/i), item.price.toString()); // toString() because price is a number
    await userEvent.type(screen.getByPlaceholderText(/description/i), item.description);
    // submit the form and see if the page change has been called (triggered by Router.push)
    await userEvent.click(screen.getByText(/add product/i));
    // console.log(Router.push);

    // we need to wait for the fake router to be called
    await waitFor(()=>wait(0));
    expect(Router.push).toHaveBeenCalled();
    expect(Router.push).toHaveBeenCalledWith({pathname: "/product/abc123"}); // put something wrong here to see the test fail
  });
});
