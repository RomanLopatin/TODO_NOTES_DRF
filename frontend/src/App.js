import React from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import UserList from './components/UserList.js'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'


class App extends React.Component{
    constructor(props) {
        super(props)
        this.state ={
            users:[]
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
    }

    render () {
        return(

            <div>
                <div>
                    <Menu />
                </div>
                <div>
                    <UserList users={this.state.users} />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default App;