import { makeAutoObservable, runInAction } from 'mobx';
import { getCookie, setCookie, deleteCookie } from '../utils/cookies';

import * as api from '../api';

class User {
  _error = false;
  _loading = false;
  _user = undefined;

  get loading() {
    return this._loading;
  }

  get user() {
    return this._user;
  }

  get isAuthenticated() {
    return Boolean(this._user);
  }

  async register(data) {
    this._loading = true;

    let res;

    try {
      res = await api.register(data);
    } catch (error) {
      runInAction(() => {
        this._loading = false;
        this._error = true;
      });
      return;
    }

    if (res.status === 200) {
      await this.login({ email: data.email, password: data.password });
    } else {
      runInAction(() => {
        this._error = true;
      });
    }

    runInAction(() => {
      this._loading = false;
    });
  }

  async login(data) {
    this._loading = true;

    let res;

    try {
      res = await api.login(data);
    } catch (error) {
      runInAction(() => {
        this._loading = false;
        this._error = true;
      });
      return;
    }

    if (res.status === 200) {
      let date = new Date(Date.now() + 86400e3);
      date = date.toUTCString();
      setCookie('token', res.data.jwt, { expires: date });

      await this.getUser();
      // await activitiesStore.getActivities();
    } else {
      runInAction(() => {
        this._error = true;
      });
    }

    runInAction(() => {
      this._loading = false;
    });
  }

  async getUser() {
    this._loading = true;

    let res;

    const token = getCookie('token');

    if (!token) {
      this._loading = false;
      this._user = undefined;
      return;
    }

    try {
      res = await api.validate({ jwt: token });
    } catch (error) {
      runInAction(() => {
        this._loading = false;
        this._error = true;
      });
      return;
    }
    runInAction(() => {
      this._user = res.data.data;
      this._loading = false;
    });
  }

  logout() {
    this._user = undefined;
    deleteCookie('token');
  }

  constructor() {
    makeAutoObservable(this);
  }
}

let store;

export function getStore() {
  if (!store) store = new User();

  return store;
}
