import { makeAutoObservable, runInAction } from 'mobx';

import * as api from '../api';

class Conference {
  _error = false;
  _loading = false;
  _conference = undefined;
  _conferences = undefined;

  get loading() {
    return this._loading;
  }

  get conferences() {
    return this._conferences;
  }

  get conference() {
    return this._conference;
  }

  async createConference(data) {
    this._loading = true;

    try {
      await api.createConference(data);
    } catch (error) {
      runInAction(() => {
        this._loading = false;
        this._error = true;
      });
      return;
    }

    runInAction(() => {
      this._loading = false;
    });
  }

  async getConference(data) {
    this._loading = true;

    let res;

    try {
      res = await api.getConference(data);
    } catch (error) {
      runInAction(() => {
        this._loading = false;
        this._error = true;
      });
      return;
    }

    if (res.status === 200) {
      runInAction(() => {
        this._conference = res.data;
      });
    } else if (res.status === 404) {
      runInAction(() => {
        this._conference = [];
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

  async getConferences(data) {
    this._loading = true;

    let res;

    try {
      res = await api.getConferences(data);
    } catch (error) {
      runInAction(() => {
        this._loading = false;
        this._error = true;
      });
      return;
    }

    if (res.status === 200) {
      runInAction(() => {
        this._conferences = res.data.records;
      });
    } else if (res.status === 404) {
      runInAction(() => {
        this._conferences = [];
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

  constructor() {
    makeAutoObservable(this);
  }
}

let store;

export function getStore() {
  if (!store) store = new Conference();

  return store;
}
