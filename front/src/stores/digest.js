import { makeAutoObservable, runInAction } from 'mobx';

import * as api from '../api';

class Digest {
  _error = false;
  _loading = false;
  _digests = undefined;
  _digest = undefined;
  _digestId = undefined;

  get loading() {
    return this._loading;
  }

  get digests() {
    return this._digests;
  }

  get digest() {
    return this._digest;
  }

  async getDigests(data) {
    this._loading = true;

    let res;

    try {
      res = await api.getDigests(data);
    } catch (error) {
      runInAction(() => {
        this._loading = false;
        this._error = true;
      });
      return;
    }

    if (res.status === 200) {
      runInAction(() => {
        this._digests = res.data;
      });
    } else if (res.status === 404) {
      runInAction(() => {
        this._digests = [];
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

  async getDigest(data) {
    this._loading = true;

    let res;

    try {
      res = await api.getDigest(data);
    } catch (error) {
      runInAction(() => {
        this._loading = false;
        this._error = true;
      });
      return;
    }

    if (res.status === 200) {
      runInAction(() => {
        this._digest = res.data.records;
      });
    } else if (res.status === 404) {
      runInAction(() => {
        this._digest = undefined;
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
  if (!store) store = new Digest();

  return store;
}
