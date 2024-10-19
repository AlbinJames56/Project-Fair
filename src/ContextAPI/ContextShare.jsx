import React, { createContext, useState } from "react";
export const addProjectContextResponse = createContext();
function ContextShare({ children }) {
  const [addProjectResponse, setAddProjectResponse] = useState("");
  return (
    <>
      <addProjectContextResponse.Provider
        value={{ addProjectResponse, setAddProjectResponse }}
      >
        {children}
      </addProjectContextResponse.Provider>
    </>
  );
}
export default ContextShare;
