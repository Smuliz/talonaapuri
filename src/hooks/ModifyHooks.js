import {useState} from 'react';

const useModifyForm = (callback) => {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    filename: '',
  });

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => {
      return {
        ...inputs,
        [event.target.name]: event.target.value,
      };
    });
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    setInputs,
  };
};

export default useModifyForm;