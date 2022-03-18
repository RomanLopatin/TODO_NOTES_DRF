import React from 'react'


const TaskItem = ({task}) => {
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
       </tr>
   )
}

const TaskList = ({tasks}) => {
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
           {tasks.map((task) => <TaskItem task={task} />)}
       </table>
   )
}

export default TaskList
