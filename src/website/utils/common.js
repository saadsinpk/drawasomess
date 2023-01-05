// return the token from the session storage
export const getUserToken = () => {
    return localStorage.getItem("usertoken") ||   null
  };

  // remove the token and user from the session storage
  export const removeUserToken = () => {
    localStorage.removeItem("usertoken");
  };
  
  // set the token and user from the session storage
  export const setUserToken = (token) => {
    localStorage.setItem("usertoken", token);
  };
  