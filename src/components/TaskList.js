import React from 'react';
import CreateTaskForm from './CreateTaskForm';
import Task from './Task';

export default class TaskList extends React.Component {
  state = {
    taskList: [],
    // The default is to show all of the tasks
    filterParam: 'all',
    setAllTasksAsCompleted: true,
  };

  addTaskToList = (newTask) => {
    this.setState((state) => ({
      taskList: [newTask, ...state.taskList],
    }));
  };

  setTaskAsComplete = (id) => {
    // Update the task-list
    this.setState((state) => ({
      // Iterate to find the task
      taskList: state.taskList.map((task) => {
        if (task.id === id) {
          // We found the task we need to update
          return {
            // Keep all attributes the same
            ...task,
            // Except for the complete flag
            complete: !task.complete,
          };
        } else {
          // Keep it the same
          return task;
        }
      }),
    }));
  };

  // Delete task permanently
  removeTask = (id) => {
    this.setState((state) => ({
      taskList: state.taskList.filter((task) => task.id !== id),
    }));
  };

  // Delete all completed tasks from list
  removeAllCompletedTasks = () => {
    this.setState((state) => ({
      taskList: state.taskList.filter((task) => !task.complete),
    }));
  };

  // Set all tasks as completed
  setAllTasksAsCompleted = () => {
    this.setState((state) => ({
      taskList: state.taskList.map((task) => ({
        ...task,
        complete: state.setAllTasksAsCompleted,
      })),
      setAllTasksAsCompleted: !state.setAllTasksAsCompleted,
    }));
  };

  // Upadting the fliter paramter to show only specific types of tasks(complted, still active, or all of the tasks)
  updateFilterParam = (filterValue) => {
    this.setState({
      filterParam: filterValue,
    });
  };

  // Function to map and return a list of tasks as DOM elements
  displayTasks = (taskList) => {
    return taskList.map((task) => (
      <Task
        key={task.id}
        task={task}
        completeTask={() => this.setTaskAsComplete(task.id)}
        removeTask={() => this.removeTask(task.id)}
      />
    ));
  };

  tasksLeftToComplete = () => {
    // Return the length(amount) of tasks left to complete
    return this.state.taskList.filter((task) => !task.complete)
      .length;
  };

  completedTasksExit = () => {
    // Check if at least there is one completed task
    return this.state.taskList.some((task) => task.complete);
  };

  render() {
    let taskList = [];

    // Check if we need to fliter before rendering everything
    if (this.state.filterParam === 'all') {
      taskList = this.state.taskList;
    } else if (this.state.filterParam === 'complete') {
      taskList = this.state.taskList.filter((task) => task.complete);
    } else if (this.state.filterParam === 'active') {
      taskList = this.state.taskList.filter((task) => !task.complete);
    }

    return (
      <div>
        <CreateTaskForm addTaskToList={this.addTaskToList} />
        {this.displayTasks(taskList)}
        <div>
          You have {this.tasksLeftToComplete()} tasks left to
          complete.
        </div>
        <button onClick={() => this.updateFilterParam('all')}>
          Show all tasks
        </button>
        <button onClick={() => this.updateFilterParam('active')}>
          Show active tasks
        </button>
        <button onClick={() => this.updateFilterParam('complete')}>
          Show completed tasks
        </button>
        {/* If there are any completed tasks, show the "delete completed tasks button", else don't show it */}
        {this.completedTasksExit() ? (
          <div>
            <button onClick={() => this.removeAllCompletedTasks()}>
              Remove all completed tasks
            </button>
          </div>
        ) : null}
        <div>
          <button onClick={() => this.setAllTasksAsCompleted()}>
            Set all tasks as completed:
            {`${this.state.setAllTasksAsCompleted}`}
          </button>
        </div>
      </div>
    );
  }
}
