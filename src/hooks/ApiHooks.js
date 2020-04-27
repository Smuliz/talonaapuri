
const baseUrl = 'http://media.mw.metropolia.fi/wbma/';


const register = async (inputs) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(baseUrl + 'users', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateProfile = async (inputs, token) => {
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(baseUrl + 'users', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const login = async (inputs) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(baseUrl + 'login', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const checkUserAvailable = async (name) => {
  try {
    const response = await fetch(baseUrl + 'users/username/' + name);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const checkToken = async (token) => {
  const fetchOptions = {
    headers: {
      'x-access-token': token,
    },
  };
  try {
    const response = await fetch(baseUrl + 'users/user', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};



export { 
  register,
  login,
  checkUserAvailable,
  checkToken,
  updateProfile
};