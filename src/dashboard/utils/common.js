// return the token from the session storage
export const getTokenSession = () => {
    return localStorage.getItem("token") ||   null
  };

  // remove the token and user from the session storage
  export const removeTokenSession = () => {
    localStorage.removeItem("token");
  };
  
  // set the token and user from the session storage
  export const setTokenSession = (token,id) => {
    localStorage.setItem("token", token);
  };
  