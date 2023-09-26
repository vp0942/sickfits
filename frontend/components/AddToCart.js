import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User';

// Refer to the addToCart mutation in the backend.
// The mutation takes a productId argument.
const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }], // refetch the currently logged in user
  });
  return (
    <button disabled={loading} type="button" onClick={addToCart}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
}

AddToCart.propTypes = {
  id: PropTypes.string.isRequired,
};
