import useForm from '../lib/useForm';
import Form from './styles/Form';

export default function CreateProduct() {
  // curly brackets are used for objects, square ones for single variable
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: '',
    name: 'Nice shoes',
    price: 34234,
    description: 'These are the best shoes!',
  });
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(inputs);
      }}
    >
      {/* the fieldset is used for grouped diabling of the form,
      Form cant be used in the same way */}
      <fieldset>
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
            placeholder="price"
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
