import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { remove } from 'nprogress';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { CURRENT_USER_QUERY } from './User';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

// This is to make the UI feel faster
function update(cache, payload) {
  // console.log('Running remove from cart update function');
  // console.log(payload);
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    // refetchQueries: [{ query: CURRENT_USER_QUERY }], // refetch the currently logged in user
    // -----------------------------------------------------------------------------------------------
    // This is to make the UI feel faster
    update,
    // This feature is not reliable yet: https://www.apollographql.com/docs/react/performance/optimistic-ui/
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: 'CartItem',
    //     id,
    //   },
    // },
  });
  return (
    <BigButton
      onClick={removeFromCart}
      disabled={loading}
      type="button"
      title="Remove This Item from Cart"
    >
      &times;
    </BigButton>
  );
}

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};
