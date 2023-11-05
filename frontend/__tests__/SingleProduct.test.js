import SingleProduct, { SINGLE_ITEM_QUERY } from '../components/SingleProduct';
import { fakeItem } from '../lib/testUtils';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

// fakeItem() is a function that returns a fake item
// it resides in lib/testUtils.js
const product = fakeItem();
// Some mock data for the query
const mocks = [
  {
    // When someone requests this query and variables combo
    request: {
      query: SINGLE_ITEM_QUERY,
      variables: { id: 'abc123' },
    },

    // Return this fake data (mocked data)
    result:{
      data:{
        Product: product,
      }
    }
  },
];

describe('<SingleProduct />', () => {
  it('render with proper data', async () => {
    // We need to make some fake data for the query
    const {container, debug} = render(
      // The MockProvider takes a prop called mocks, which is an array of mocks
      <MockedProvider mocks = {mocks}>
        <SingleProduct id="abc123" />
      </MockedProvider>
    );
    // Wait for the test ID to show up
    // In SingleProduct.js, we added data-testid = 'singleProduct'
    // getByTestId is synchronous, while findByTestId is asynchronous
    // findByTestId returns a promise which will resolve within about 3 seconds
    await screen.findByTestId('singleProduct');
    debug();
    // Create a snapshot of the component to monitor changes
    expect(container).toMatchSnapshot();
  })


  // Test the ErrorMessages component
  it('Errors out when an item is not found', async () => {
    const errorMock = [
      {
        // When someone requests this query and variables combo
        request: {
          query: SINGLE_ITEM_QUERY,
          variables: { id: 'abc123' },
        },

        // Return this fake data (mocked data)
        result:{
          errors: [
            {
              message: 'Item not found',
            }
          ]
        }
      },
    ];
    const {container, debug} = render(
      // The MockProvider takes a prop called mocks, which is an array of mocks
      <MockedProvider mocks = {errorMock}>
        <SingleProduct id="abc123" />
      </MockedProvider>
    );
    // In ErrorMessage.js, we added data-testid = 'graphql-error'
    await screen.findByTestId('graphql-error');
    // To visually see the error message
    debug();
    // Some expects
    expect(container).toMatchSnapshot();
    // expect(container).toHaveTextContent('Item not found');
    // expect(container).toHaveTextContent('Shoot!');



  });
});
