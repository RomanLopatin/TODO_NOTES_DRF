import React from 'react'


const TaskItem = ({task, deleteTask}) => {
   return (
       <tr>
           <td>
               {task.project}
           </td>
           <td>
               {task.noteText}
           </td>
           <td>
               {task.isActive}
           </td>
           <td>
               <button onClick={()=>deleteTask(task.id)}>Delete</button>
           </td>
       </tr>
   )
}

const TaskList = ({tasks, deleteTask}) => {
   return (
       <table>
           <th>
               Project
           </th>
           <th>
               Note text
           </th>
           <th>
               Is active
           </th>
           {tasks.map((task) => <TaskItem task={task} deleteTask={deleteTask} />)}
       </table>
   )
}

export default TaskList
