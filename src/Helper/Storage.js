const setUserData = async (userData) => { 
    window.localStorage.setItem("@userData", JSON.stringify(userData));
  };
  // const getUserdata = async () => {
  //   let value = await window.localStorage.getItem("@userData");
  //   if (value !== null) {
  //     return value;
  //   }
  //   return null;
  // };
  const setToken = async (userToken) => {  
    window.localStorage.setItem("@userToken", userToken);
  };
  
  const getUserdata = async () => {
    let value = window.localStorage.getItem("@userData");
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  };
   
  const getToken = () => {
    return window.localStorage.getItem("@userToken");
  };
  
  const Logout = async () => {
    return (
      window.localStorage.removeItem("@userToken"),
      localStorage.removeItem("@userData")
    );
  };
  
  export { setUserData, setToken, getToken, getUserdata, Logout };
  