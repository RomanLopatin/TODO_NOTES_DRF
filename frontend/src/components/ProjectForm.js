import React from 'react'

class ProjectForm extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            repo_link: '',
            users: '',
        }
    }

    handleTextChange(event){
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleUserChange(event){
        if (!event.target.selectedOptions){
            return
        }

        let users = []
        for (let i=0; i < event.target.selectedOptions.length; i++){
            users.push(parseInt(event.target.selectedOptions.item(i).value))
        }

        this.setState(
            {
                'users': users
            }
        );
    }

    handleSubmit(event) {
        this.props.newProject(this.state.name, this.state.repo_link, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={this.state.name}
                    onChange={(event)=>this.handleTextChange(event)}
                />
                <input
                    type="text"
                    name="repo_link"
                    placeholder="repo link"
                    value={this.state.repo_link}
                    onChange={(event)=>this.handleTextChange(event)}
                />
                <select multiple onChange={(event)=>this.handleUserChange(event)}>
                    {this.props.users.map((user)=> <option value={user.id}> {user.username} </option>)}
                </select>
                <input type="submit" value="Create" />
            </form>
        )
    }
}

export default ProjectForm;
