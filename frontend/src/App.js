import React from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import LoginForm from './components/LoginForm.js';
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js'
import ProjectTaskList from './components/ProjectTaskList.js'
import TaskList from './components/TaskList.js'
import TaskForm from './components/TaskForm.js';
import ProjectForm from './components/ProjectForm.js';
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
            token: '',
            username: '',
        }
    }

     is_authenticated() {
        return !!this.state.token
    }

    logout() {
        localStorage.setItem('token', '')
        localStorage.setItem('username', '')
        this.setState(
            {
                'token': '',
                'username': '',
                users:[],
                projects:[],
                tasks:[],
            }, this.getData
        )
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    getToken(username, password) {
        console.log(username, password)
        axios
            .post('http://127.0.0.1:8000/api-auth-token/', {username: username, password: password})
            .then(response => {
                const token = response.data.token
                localStorage.setItem('token', token)
                localStorage.setItem('username', username)
                this.setState(
                    {
                        'token': token,
                        'username': username
                    }, this.getData)
            })
            .catch(error => alert('Неверный логин или пароль'))
    }

     getData() {

         let headers = this.getHeaders()

         axios
            .get('http://127.0.0.1:8000/api/users/',{headers})
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
            .get('http://127.0.0.1:8000/api/projects/', {headers})
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
            .get('http://127.0.0.1:8000/api/tasks/', {headers})
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

    componentDidMount() {
        let token = localStorage.getItem('token')
        let username = localStorage.getItem('username')
        this.setState(
            {
                'token': token,
                'username': username
            }, this.getData
        )
    }

    newTask(note_text, project, user) {
        let headers = this.getHeaders()
        axios
            .post('http://127.0.0.1:8000/api/tasks/', {'note_text': note_text, 'project': project,'user': user}, {headers})
            .then (response => {
                    this.getData()
            })
            .catch (error => console.log(error))
     }

   newProject(name, repo_link, users) {
        let headers = this.getHeaders()
        axios
            .post('http://127.0.0.1:8000/api/projects/', {'name': name, 'repo_link': repo_link,'users': users}, {headers})
            .then (response => {
                    this.getData()
            })
            .catch (error => console.log(error))
     }

    deleteTask(id) {
        let headers = this.getHeaders()
        axios
            .delete(`http://127.0.0.1:8000/api/tasks/${id}`, {headers})
            .then (response => {
                this.setState(
                    {
                        'tasks': this.state.tasks.filter((task)=>task.id !=id)
                    })
            })
            .catch (error => console.log(error))

    }

     deleteProject(id) {
        let headers = this.getHeaders()
        axios
            .delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then (response => {
                this.setState(
                    {
                        'projects': this.state.projects.filter((project)=>project.id !=id)
                    })
            })
            .catch (error => console.log(error))

    }

    render () {
        return(
            <BrowserRouter>
                    <div>User: {this.state.username}</div>
                    {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <a href="/login">Login</a>}
                    <nav>
                        <ul>
                            <li><Link to='/users'>Users</Link></li>
                            <li><Link to='/projects'>Projects</Link></li>
                            <li><Link to='/tasks'>Tasks</Link></li>
                            <li><Link to='/tasks/create'>New task</Link></li>
                            <li><Link to='/projects/create'>New project</Link></li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route exact path = '/' element = {<Navigate to='/users'/>}/>
                        <Route exact path = '/login' element = {<LoginForm getToken={(username, password) => this.getToken(username, password)}/>}/>
                        <Route exact path = '/users' element = {<UserList users={this.state.users} />}/>
                        <Route exact path = '/projects' element = {<ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)}  />} />
                        <Route path = '/projects/project/:id' element = {<ProjectTaskList tasks={this.state.tasks}/>} />
                        <Route exact path = '/tasks' element = {<TaskList tasks={this.state.tasks} deleteTask={(id) => this.deleteTask(id)} />} />
                        <Route exact path = '/tasks/create' element = {<TaskForm projects={this.state.projects} users={this.state.users} newTask={(note_text, project, user) => this.newTask(note_text, project, user)}/>}/>
                        <Route exact path = '/projects/create' element = {<ProjectForm users={this.state.users} newProject={(name, repo_link, users) => this.newProject(name, repo_link, users)}/>}/>
                        <Route path = '*' element = {<NotFound404 /> } />
                    </Routes>
            </BrowserRouter>
        )
    }
}

export default App;