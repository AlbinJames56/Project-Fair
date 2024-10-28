import React, { createContext, useEffect, useState } from "react";
export const TokenAuthContext = createContext();
function TokenAuth({ children }) {
  const [isAuthorized, setIsAUthorized] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsAUthorized(true);
    } else {
      setIsAUthorized(false);
    }
  }, [isAuthorized]);
  return (
    <div>
      <TokenAuthContext.Provider value={{ isAuthorized, setIsAUthorized }}>
        {children}
      </TokenAuthContext.Provider> 
    </div>
  );
}

export default TokenAuth;
