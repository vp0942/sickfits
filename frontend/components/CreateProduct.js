import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import Form from './styles/Form';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in?
    # And what types are they?
    # ! means "Required"
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  // curly brackets are used for objects, square ones for single variable
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: '',
    name: 'Nice shoes',
    price: 34234,
    description: 'These are the best shoes!',
  });
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      // variables can be put here if known
      // otherwise put them when calling the
      // handler createProduct
      variables: inputs,
      // Update the products page
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );
  // console.dir(createProduct);

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        //---------------------------------------
        // const res = await createProduct({
        //   // We can put the variables here  instaed
        //   // of useMutation if we
        //   // only know them at the time of Submision
        //   variables: inputs,
        // });
        //---------------------------------------
        // Submit the input fields to the backend:
        const res = await createProduct();
        console.log('res: ', res);
        // equivalent to:
        // await createProduct();
        clearForm();
        // Go to that product's page
        Router.push({
          pathname: `/product/${res.data.createProduct.id}`,
        });
      }}
    >
      {/* If error is false DisplayError component will not render:
      refer to the code of ErrorMessage */}
      <DisplayError error={error} />
      {/* the fieldset is used for grouped diabling of the form,
      Form cant be used in the same way */}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>

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
        {/* <button type="button" onClick={clearForm}>
          Clear Form
        </button>
        <button type="button" onClick={resetForm}>
          Reset Form
        </button> */}
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
