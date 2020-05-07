import {useState} from 'react';


// Luento 5, 25.3 45min objektista dynaaminen nimen haku
const useLoginForm = (callback) => {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });
    const handleSubmit = (event) => {
      if (event) {
        event.preventDefault();
      }
      callback();
    }
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
      inputs
    };
  };


export default useLoginForm;