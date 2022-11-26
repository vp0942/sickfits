import { useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs with useState hook
  const [inputs, setInputs] = useState(initial);

  // {
  //   image:'',
  //   name: 'Nice shoes',
  //   price: 34234,
  //   description: 'These are the best shoes!',
  // }

  function handleChange(e) {
    // console.dir(e.target);
    let { value, name, type } = e.target;
    if (type === 'number') value = parseInt(value);
    // when working with files
    if (type === 'file') {
      // take the firs item of the files array only
      [value] = e.target.files;
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
    // console.log(inputs);
  }

  function resetForm() {
    setInputs(initial);
    // console.log(inputs);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      // substitute the value of the [key, value] with '' or null
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
    // console.log(inputs);
  }

  // return the things we want to surface it (expose it) from this custom hook !
  return { inputs, handleChange, resetForm, clearForm };
}
