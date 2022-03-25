import React from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import LoginForm from './components/LoginForm.js';
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
            token: '',
        }
    }

     is_authenticated() {
        return !!this.state.token
    }

    logout() {
        localStorage.setItem('token', '')
        this.setState(
            {
                'token': '',
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
                console.log(token)
                localStorage.setItem('token', token)
                this.setState(
                    {
                        'token': token
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
        this.setState(
            {
                'token': token
            }, this.getData
        )
    }

    render () {
        return(
            <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                            </li>
                            <li><Link to='/users'>Users</Link></li>
                            <li><Link to='/projects'>Projects</Link></li>
                            <li><Link to='/tasks'>Tasks</Link></li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route exact path = '/' element = {<Navigate to='/users'/>}/>
                        <Route exact path = '/login' element = {<LoginForm getToken={(username, password) => this.getToken(username, password)}/>}/>
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