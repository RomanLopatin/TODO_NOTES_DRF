import React from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js'
import ProjectTaskList from './components/ProjectTaskList.js'
import TaskList from './components/TaskList.js'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
import NotFound404 from './components/NotFound404.js'
import {BrowserRouter, Route, Routes, Link, useLocation, Navigate} from 'react-router-dom'

class App extends React.Component{
    constructor(props) {
        super(props)
        this.state ={
            users:[],
            projects:[],
            tasks:[],
        }
    }

    componentDidMount() {
    axios
        .get('http://127.0.0.1:8000/api/users/')
        .then (response => {
            const users = response.data
            this.setState(
                {
                    'users': users
                }
            )
        })
        .catch (error => console.log(error))
    axios
        .get('http://127.0.0.1:8000/api/projects/')
        .then (response => {
            const projects = response.data
            this.setState(
                {
                    'projects': projects
                }
            )
        })
        .catch (error => console.log(error))
    axios
        .get('http://127.0.0.1:8000/api/tasks/')
        .then (response => {
            const tasks = response.data
            this.setState(
                {
                    'tasks': tasks
                }
            )
        })
        .catch (error => console.log(error))
    }

    render () {
        return(
            <BrowserRouter>
                    <nav>
                        <ul>
                            <li><Link to='/users'>Users</Link></li>
                            <li><Link to='/projects'>Projects</Link></li>
                            <li><Link to='/tasks'>Tasks</Link></li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route exact path = '/' element = {<Navigate to='/users'/>}/>
                        <Route exact path = '/users' element = {<UserList users={this.state.users} />}/>
                        <Route exact path = '/projects' element = {<ProjectList projects={this.state.projects} />} />
                        <Route path = '/projects/project/:id' element = {<ProjectTaskList tasks={this.state.tasks}/>} />
                        <Route exact path = '/tasks' element = {<TaskList tasks={this.state.tasks} />} />
                        <Route path = '*' element = {<NotFound404 /> } />
                    </Routes>
            </BrowserRouter>
        )
    }
}

export default App;