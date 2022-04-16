import React from 'react'

class TaskForm extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            note_text: '',
            project: '',
            user: '',
        }
    }

    handleChange(event){
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSelectChange(event, name){
        this.setState(
            {
                [name]: parseInt(event.target.value)
            }
        );
    }

    handleSubmit(event) {
        this.props.newTask(this.state.note_text, this.state.project, this.state.user)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <input
                    type="text"
                    name="note_text"
                    placeholder="note text"
                    value={this.state.note_text}
                    onChange={(event)=>this.handleChange(event)}
                />
                <select onChange={(event)=>this.handleSelectChange(event, 'project')}>
                    {this.props.projects.map((project)=> <option value={project.id}> {project.name} </option>)}
                </select>
                <select onChange={(event)=>this.handleSelectChange(event, 'user')}>
                    {this.props.users.map((user)=> <option value={user.id}> {user.username} </option>)}
                </select>
                <input type="submit" value="Create" />
            </form>
        )
    }
}

export default TaskForm;
