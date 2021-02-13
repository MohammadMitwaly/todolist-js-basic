import React from 'react';
import shortId from 'shortid';

export default class CreateTaskForm extends React.Component {
  state = {
    taskText: '',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    // Prevent page from refreshing
    event.preventDefault();
    // Create new task and add it to the todo-list
    this.props.addTaskToList({
      id: shortId.generate(),
      text: this.state.taskText,
      complete: false,
    });

    //Clear the text after adding task
    this.setState({ taskText: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="taskText"
          placeholder="Please enter a task"
          value={this.state.taskText}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Add task</button>
      </form>
    );
  }
}
