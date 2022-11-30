/* eslint-disable react/prop-types */
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;
const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    # Which variables are getting passed in?
    # And what types are they?
    # ! means "Required"
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      # dont pass id: $id in data:{} too - it will yell at you
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // 1. We need to get the existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  console.log({ data });
  // 2. We need to get the mutation to update the product
  // to avoid using the same variables like in 1:
  const [
    updateProduct,
    { data: updateData, loading: updateLoading, updateError },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    variables: {
      id,
      // TODO: pass in updates to Product here!
      // will be done on call of onSubmit this time
      // Refer to CreateProduct for declaration
      // in the body of useMutation hook
    },
  });
  // 2.5 Create some state for the form inputs -> pass "data" from the our query
  const { inputs, handleChange, resetForm, clearForm } = useForm(data?.Product);
  console.log({ inputs });
  if (loading) return <p>Loading...</p>;
  // 3. We need the form to handle the updates
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // passing the state trough the handler
        const res = await updateProduct({
          variables: {
            // we are in the scope of updateProduct
            id,
            // passing only the required data from our state (inputs)
            // if you pass inputs.id it will get confused as we have already
            // passed 'id' but with different type and Keystone is typed!
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        }).catch(console.error);
        console.log(res);
      }}
    >
      {/* If error is false DisplayError component will not render:
      refer to the code of ErrorMessage */}
      <DisplayError error={error || updateError} />
      {/* the fieldset is used for grouped diabling of the form,
      Form cant be used in the same way */}
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
