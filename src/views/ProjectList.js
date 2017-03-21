import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import Notification from './../components/Notification';
import TrackerStore from './../stores/TrackerStore';

class ProjectList extends React.Component {
  constructor() {
    super();

    this.state = {
      projects: [],
      showHint: false
    };
  }

  componentWillMount() {
    this.setProjects();
  }

  setProjects() {
    const checkedProjectsMap = TrackerStore.me.projects.map((project) => {
      let result = {
        name: project.project_name,
        id: project.project_id,
        selected: this.context.appState.selectedProjects
          .indexOf(project.project_id) !== -1
      };
      return result;
    });
    this.setState({ projects: checkedProjectsMap });
  }

  handleChange(event) {
    const projects = this.state.projects;

    projects.forEach((project) => {
      if (project.id == event.target.value) {
        project.selected = event.target.checked;
      }
    });

    this.setState({ projects: projects, showHint: false });
  }

  doneSelecting(event) {
    event.preventDefault();
    const selectedProjects = this.state.projects.filter((project) => {
      if (project.selected) {
        return true;
      }
      return false;
    }).map((project) => project.id);

    if (selectedProjects.length === 0) {
      return this.setState({ showHint: true });
    }

    this.context.appState.selectedProjects = selectedProjects;
    browserHistory.push('/sprint-backlog');
  }

  render() {
    let checkboxes = [];

    this.state.projects.forEach((project) => {
      checkboxes.push(<formfield className=
        {`projects-wrapper__project ${project.selected
          ? 'projects-wrapper__project__selected' : ''}`}
        key={project.id}>
          <label htmlFor={`project-${project.id}`}>
            {project.name}
          </label>
          <input type="checkbox" value={project.id}
            checked={project.selected}
            onChange={this.handleChange.bind(this)}
            id={`project-${project.id}`} />
      </formfield>);
    });

    let hint;

    if (this.state.showHint === true) {
        hint = (
          <Notification level="notice"
            message="You need to select at least one project." />
        );
    }

    return (
      <form className="projects-wrapper">
        {checkboxes}
        {hint}
        <input type="submit" value="Select"
          onClick={this.doneSelecting.bind(this)} />
      </form>
    );
  }
}

ProjectList.contextTypes = {
    appState: PropTypes.object
};

export default ProjectList;
