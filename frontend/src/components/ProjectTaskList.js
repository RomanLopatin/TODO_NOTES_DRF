import React from 'react'
import {useParams} from 'react-router-dom'


const ProjectTaskItem = ({task}) => {
   return (
       <tr>
           <td>
               {task.project}
           </td>
           <td>
               {task.noteText}
           </td>
           <td>
               {task.user}
           </td>
           <td>
               {task.isActive}
           </td>
           <td>
               {task.created}
           </td>
           <td>
               {task.updated}
           </td>
       </tr>
   )
}


const  ProjectTaskList = ({tasks}) => {
   let {id} = useParams()
   let ProjectTasks = tasks.filter((task) => parseInt(task.project) === parseInt(id))
   console.log(typeof(id))
   console.log(tasks)
   console.log(ProjectTasks)

   return (
       <table>
           <th>
               Project
           </th>
           <th>
               Note text
           </th>
           <th>
               User
           </th>
           <th>
               Is active
           </th>
           <th>
               Created
           </th>
           <th>
               Updated
           </th>
           {ProjectTasks.map((task) => <ProjectTaskItem task={task} />)}
       </table>
   )
}

export default ProjectTaskList
