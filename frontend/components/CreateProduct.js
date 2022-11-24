import useForm from '../lib/useForm';

export default function CreateProduct() {
  // curly brackets are used for objects, square ones for single variable
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: 'Nice shoes',
    price: 34234,
    description: 'These are the best shoes!',
  });
  return (
    <form>
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
        <input
          type="text"
          name="description"
          id="description"
          placeholder="description"
          value={inputs.description}
          onChange={handleChange}
        />
      </label>
      <button type="button" onClick={clearForm}>
        Clear Form
      </button>
      <button type="button" onClick={resetForm}>
        Reset Form
      </button>
    </form>
  );
}
