import React, { createContext, useState } from "react";
export const addProjectContextResponse = createContext();
export const editProjectContextResponse=createContext()
function ContextShare({ children }) {
  const [addProjectResponse, setAddProjectResponse] = useState("");
  const [editProjectResponse,setProjectResponse]=useState("")
  return (
    <>
      <addProjectContextResponse.Provider
        value={{ addProjectResponse, setAddProjectResponse }}
      >
        <editProjectContextResponse.Provider value={{editProjectResponse,setProjectResponse}}>
           {children}
        </editProjectContextResponse.Provider>
       
      </addProjectContextResponse.Provider>
    </>
  );
}
export default ContextShare;
