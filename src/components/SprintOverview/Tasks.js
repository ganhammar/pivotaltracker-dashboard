import React, { PropTypes, Component } from 'react';

import Task from './Task';
import TrackerStore from './../../stores/TrackerStore';

class Tasks extends Component {
  constructor() {
    super();

    this.state = {
      tasks: []
    };
  }

  componentWillMount() {
    this.setState({tasks: this.props.tasks});
  }

  getNewTask() {
    return {
      description: '',
      complete: false
    };
  }

  onEdit(updatedTask) {
    let tasks = this.state.tasks;

    tasks.forEach((task, index) => {
      if (task.id === updatedTask.id) {
        tasks[index] = updatedTask;
      }
    });

    this.setState({tasks: tasks});
    this.props.callback(tasks);
  }

  onCreate(task) {
    let tasks = this.state.tasks;

    tasks.push(task);

    this.setState({tasks: tasks});
    this.props.callback(tasks);
  }

  onDelete(deletedTask) {
    let tasks = this.state.tasks;

    tasks.forEach((task, index) => {
      if (task.id === deletedTask.id) {
        tasks.splice(i, 1);
      }
    });

    this.setState({tasks: tasks});
    this.props.callback(tasks);
  }

  render() {
    let tasks = [];

    this.props.tasks.forEach((task) => {
      tasks.push(<Task key={task.id} task={task}
        projectId={this.props.projectId}
        editCallback={this.onEdit.bind(this)}
        createCallback={this.onCreate.bind(this)}
        deleteCallback={this.onDelete.bind(this)} />);
    });

    return (<form>
      {tasks}
      <Task task={this.getNewTask()} projectId={this.props.projectId}
        editCallback={this.onEdit.bind(this)}
        createCallback={this.onCreate.bind(this)}
        deleteCallback={this.onDelete.bind(this)} />
    </form>);
  }
}

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  projectId: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired
};

export default Tasks;
