import TrackerStore from './../stores/TrackerStore';
import Project from './../api/Project';

export function populateTrackerStore(projectIds) {
  return new Promise((resolve) => {
    TrackerStore.iterations = [];
    TrackerStore.stories = [];
    TrackerStore.members = [];
    let projectsFetched = 0;

    projectIds.forEach((projectId) => {
      populateIterations(projectId)
        .then((iteration) => populateStories(projectId, iteration.start))
        .then(() => populateMembers(projectId))
        .then(() => {
          projectsFetched++;

          if (projectsFetched === projectIds.length) {
            resolve();
          }
        });
    });
  });
}

function populateIterations(projecId) {
  return Project.getCurrentIteration(projecId)
    .then((iterations) => {
      TrackerStore.iterations.push(iterations[0]);
      return iterations[0];
    });
}

function populateStories(projectId, startDate) {
  return Project.getCurrentStories(projectId, startDate)
    .then((stories) => {
      TrackerStore.stories = TrackerStore.stories.concat(stories);
      return stories;
    });
}

function populateMembers(projectId) {
  return Project.getMembers(projectId)
    .then((members) => {
      addDistinctMembers(TrackerStore.members, members);
      return members;
    });
}

function addDistinctMembers(source, members) {
  members.forEach((member) => {
    const found = source.some((person) => {
      if (person.id === member.person.id) {
        return person;
      }
    });

    if (!found) {
      source.push(member.person);
    }
  });
}
