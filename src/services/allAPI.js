



import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI"

//register user API

export const registerAPI = async(user)=> {
    return await commonAPI("POST",`${BASE_URL}/user/register`,user,"")
}

//login api

export const loginAPI = async(user) => {
    return await commonAPI("POST",`${BASE_URL}/user/login`,user,"")
}

//add project api
export const addProjectAPI = async(reqBody,reqHeader) =>{
    return await commonAPI("POST",`${BASE_URL}/projects/add`,reqBody,reqHeader) //we need reqHeader as we are sending an image to the backend and not json data
}


//getHomeprojects
export const homeProjectAPI = async() => {
    return await commonAPI("GET",`${BASE_URL}/projects/homeprojects`,"","")
}


//getAllprojects
export const allProjectAPI = async(searchKey,reqHeader) => {
    return await commonAPI("GET",`${BASE_URL}/projects/all?search=${searchKey}`,"",reqHeader)
}

//userproject
export const userprojectAPI = async (reqHeader) => {
    return await commonAPI("GET",`${BASE_URL}/user/allprojects`,"",reqHeader)
}

//edit project 

export const editProjectAPI = async(projectId, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${BASE_URL}/Projects/edit/${projectId}`, reqBody, reqHeader) //projectId for identifying the project to be edited
}

//delete a project

export const deleteProjectAPI = async(projectId, reqHeader) => {
    return await commonAPI("DELETE",`${BASE_URL}/projects/remove/${projectId}`,{},reqHeader) //reqBody passed as empty object as we are deleting...
}
