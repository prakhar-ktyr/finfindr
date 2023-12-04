//const backendURL = 'http://localhost:8000/';
const backendURL = 'https://finfindrbackend.onrender.com';

const connection = {
    advisorEndpoint: `${backendURL}/advisor`,
    investorEndpoint: `${backendURL}/investor`,
    userEndpoint: `${backendURL}/user`,
    authEndpoint: `${backendURL}`,
};

export default connection;
