import React, { useEffect ,useState} from "react";
import Header from "../Components/Header";
import { Col, Row } from "react-bootstrap";
import ProjectCard from "../Components/ProjectCard";
import { getAllProjectsAPI } from "../services/allAPI";
function Projects() {
  const [projects,setProjects]=useState([]);
  const [searchKey,setSearchKey]=useState("")
  const getAllProjects=async ()=>{
    const token=sessionStorage.getItem("token") 
    if(token){
      const reqHeader={
        "authorization":`Bearer ${token}`,
        "Content-Type":"multipart/form-data"
      }
      // api call
      const result=await getAllProjectsAPI(searchKey,reqHeader);
      // console.log("result:", result);
      if(result.status===200){
        setProjects(result.data)
      }else{
        console.log(result);
      }
    }
  } 
  useEffect(()=>{
    getAllProjects()
  },[searchKey])

  return (
    <div>
      <Header />
      <div className="projects" style={{ marginTop: "100px" }}>
        <h1 className="text-center mt-5 fw-bolder">All Projects</h1>
        <div className="d-flex justify-content-center align-items-center w-100">
          <div className="d-flex border w-50 rounded m-3 ">
            <input
              type="text"
              className="form-control"
              placeholder="search by technologies" onChange={e=>setSearchKey(e.target.value)}
            />
            <i
              style={{ marginLeft: "-50px" }}
              className="fa-solid fa-magnifying-glass fa-rotate-90"
            ></i>
          </div>
        </div>
        <Row className="m-5 container">

          {
            projects.length>0?projects.map((project,index)=>(
              <Col key={index} sm={12} md={6} lg={4}>
        <ProjectCard project={project} />
          </Col>
            )):<p className="text-danger"> Nothing to Display</p>
            
        }
        </Row>
      </div>

    </div>
  );
}

export default Projects;
