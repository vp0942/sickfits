/* eslint-disable react/prop-types */

import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;
// After deletion the product will still be visible in the Products page
// until we update the page. One way to solve the issue will be with
// refetchQueries: [{ query: ALL_PRODUCTS_QUERY }], like in CreateProduct.js
// Another way will be to remove it from the Apollo cach:
// Payload is the info returned from the mutation: {id, name}
function update(cache, payload) {
  // console.log(payload, cache);
  // console.log('Running the update function after deletion');
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  // {children} make the button more flexible
  // You can add more stuff in it like
  // <DeleteProduct id={product.id}><p>Some staff...</p></DeleteProduct>

  // console.log(id);

  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id },
      // execute an update function after the deletion
      update,
    }
  );

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete this item?')) {
          // Go ahead and delete it
          // console.log('Deleting!');
          deleteProduct().catch((err) => err.message);
        }
      }}
    >
      {children}
    </button>
  );
}
