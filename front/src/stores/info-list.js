import { makeAutoObservable, runInAction } from 'mobx';

import * as api from '../api';

class InfoList {
  _error = false;
  _loading = false;
  _cities = undefined;
  _organizations = undefined;
  _positions = undefined;

  get loading() {
    return this._loading;
  }

  get cities() {
    return this._cities;
  }

  get organizations() {
    return this._organizations;
  }

  get positions() {
    return this._positions;
  }

  async getInfoLists() {
    this._loading = true;

    this.getCities();
    this.getPositions();
    this.getOrganizations();

    runInAction(() => {
      this._loading = false;
    });
  }

  async getCities() {
    this._loading = true;

    let res;

    try {
      res = await api.getCities();
    } catch (error) {
      runInAction(() => {
        this._loading = false;
        this._error = true;
      });
      return;
    }
    runInAction(() => {
      this._cities = res.data.records.map(el => {
        return { label: `${el['city_name']}, ${el['country_name']}`, value: el['city_id'] };
      });
      this._loading = false;
    });
  }

  async getOrganizations() {
    this._loading = true;

    let res;

    try {
      res = await api.getOrganizations();
    } catch (error) {
      runInAction(() => {
        this._loading = false;
        this._error = true;
      });
      return;
    }
    runInAction(() => {
      this._organizations = res.data.records.map(el => {
        return { label: el.name, value: el['organization_id'] };
      });
      this._loading = false;
    });
  }

  async getPositions() {
    this._loading = true;

    let res;

    try {
      res = await api.getPositions();
    } catch (error) {
      runInAction(() => {
        this._loading = false;
        this._error = true;
      });
      return;
    }
    runInAction(() => {
      this._positions = res.data.records.map(el => {
        return { label: el.name, value: el['position_id'] };
      });
      this._loading = false;
    });
  }

  constructor() {
    makeAutoObservable(this);
  }
}

let store;

export function getStore() {
  if (!store) store = new InfoList();

  return store;
}
