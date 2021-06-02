import { makeAutoObservable, runInAction } from 'mobx';

import * as api from '../api';

class Event {
  _error = false;
  _loading = false;
  _events = undefined;
  _event = undefined;

  get loading() {
    return this._loading;
  }

  get events() {
    return this._events;
  }

  get event() {
    return this._event;
  }

  async getEvent(data) {
    this._loading = true;

    let res;

    try {
      res = await api.getEvent(data);
    } catch (error) {
      runInAction(() => {
        this._loading = false;
        this._error = true;
      });
      return;
    }

    if (res.status === 200) {
      runInAction(() => {
        this._event = res.data;
      });
    } else if (res.status === 404) {
      runInAction(() => {
        this._event = [];
      });
    } else {
      runInAction(() => {
        this._error = true;
      });
    }

    runInAction(() => {
      this._loading = false;
    });
  }

  async getEvents() {
    this._loading = true;

    let res;

    try {
      res = await api.getEvents();
    } catch (error) {
      runInAction(() => {
        this._loading = false;
        this._error = true;
      });
      return;
    }

    if (res.status === 200) {
      runInAction(() => {
        this._events = res.data.records;
      });
    } else if (res.status === 404) {
      runInAction(() => {
        this._events = [];
      });
    } else {
      runInAction(() => {
        this._error = true;
      });
    }

    runInAction(() => {
      this._loading = false;
    });
  }

  // async createConference(data) {
  //   this._loading = true;

  //   try {
  //     await api.createConference(data);
  //   } catch (error) {
  //     runInAction(() => {
  //       this._loading = false;
  //       this._error = true;
  //     });
  //     return;
  //   }

  //   runInAction(() => {
  //     this._loading = false;
  //   });
  // }

  // async getConferences(data) {
  //   this._loading = true;

  //   let res;

  //   try {
  //     res = await api.getConferences(data);
  //   } catch (error) {
  //     runInAction(() => {
  //       this._loading = false;
  //       this._error = true;
  //     });
  //     return;
  //   }

  //   if (res.status === 200) {
  //     runInAction(() => {
  //       this._events = res.data.records;
  //     });
  //   } else if (res.status === 404) {
  //     runInAction(() => {
  //       this._events = [];
  //     });
  //   } else {
  //     runInAction(() => {
  //       this._error = true;
  //     });
  //   }

  //   runInAction(() => {
  //     this._loading = false;
  //   });
  // }

  constructor() {
    makeAutoObservable(this);
  }
}

let store;

export function getStore() {
  if (!store) store = new Event();

  return store;
}
