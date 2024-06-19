const backendURL = 'https://finfindr-bcab9a51da87.herokuapp.com';
//const backendURL = 'https://finfindrbackend.onrender.com';

const connection = {
    advisorEndpoint: `${backendURL}/advisor`,
    investorEndpoint: `${backendURL}/investor`,
    userEndpoint: `${backendURL}/user`,
    authEndpoint: `${backendURL}`,
};

export default connection;
