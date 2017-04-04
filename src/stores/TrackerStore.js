import { observable } from 'mobx';

class TrackerStore {
    @observable me = {};
    @observable iterations = [];
    @observable iterationHistory = {};
    @observable stories = [];
    @observable members = [];
    @observable validStates = ['planned', 'started', 'finished', 'delivered',
      'accepted', 'rejected'];
}

const trackerStore = new TrackerStore();

export default trackerStore;