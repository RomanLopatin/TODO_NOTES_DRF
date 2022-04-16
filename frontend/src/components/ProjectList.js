import React from 'react'
import {Link} from 'react-router-dom'


const ProjectItem = ({project, deleteProject}) => {
   return (
       <tr>
           <td>
               <Link to={`project/${project.id}`}>{project.name} </Link>
           </td>
           <td>
               {project.users}
           </td>
            <td>
               <button onClick={()=>deleteProject(project.id)}>Delete</button>
           </td>
       </tr>
   )
}

const ProjectList = ({projects, filterInput, deleteProject, setProjectFilter, filterProjects}) => {
   return (
       <div>
           <input
               type="text"
               name="project_filter"
               placeholder="project filter"
               onChange={(event)=>{setProjectFilter(event.target.value)}}
           />
           <button onClick={()=>filterProjects(filterInput)}>Filter</button>
           <table>
               <th>
                   Name
               </th>
               <th>
                   Users
               </th>
               {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
           </table>
       </div>
   )
}

export default ProjectList
