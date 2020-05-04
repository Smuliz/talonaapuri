import { useState } from 'react';


// Luento 5, 25.3 45min objektista dynaaminen nimen haku
const useProfileForm = (callback) => {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        full_name: '',
        file: null,
        file_name:'',
    });
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        delete inputs.confirm;
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

    const handleFileChange = (event) => {
        event.persist();
        console.log(event.target.files[0]);
        setInputs((inputs) => {
          return {
            ...inputs,
            file: event.target.files[0],
          };
        });
      };

    return {
        handleSubmit,
        handleInputChange,
        inputs,
        setInputs,
        handleFileChange,
    };
}


export default useProfileForm;