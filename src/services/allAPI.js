import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./serverUrl";

// register Api
export const registerAPI = async (user) => {
  return await commonAPI("POST", `${SERVER_URL}/register`, user, "");
};
// login API
export const loginAPI = async (user) => {
  return await commonAPI("POST", `${SERVER_URL}/login`, user, "");
};
// Add project api
export const addProjectAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${SERVER_URL}/addProject`,
    reqBody,
    reqHeader
  );
};
// get home Project Api
export const getHomeProjectsAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/homeProjects`, "", "");
};
// get userProjects
export const getUserProjectsAPI = async (reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/userProjects`, "", reqHeader);
};
// get ALL porjects API
export const getAllProjectsAPI = async (searchKey,reqHeader) => {
  return await commonAPI("GET", `${SERVER_URL}/allProjects?search=${searchKey}`, "", reqHeader);
};
//Edit project api
export const editProjectAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${SERVER_URL}/projects/edit/${id}`,
    reqBody,
    reqHeader
  );
};
// DeleteProjectsAPI
export const DeleteProjectsAPI=async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/projects/delete/${id}`,{},reqHeader)
} 