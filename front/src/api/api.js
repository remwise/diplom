import axios from 'axios';

export async function register(data) {
  let res;
  try {
    res = await axios.post(`/api/users/create.php`, data);
  } catch (error) {
    res = error.response;
  }
  return res;
}

export async function login(data) {
  let res;
  try {
    res = await axios.post(`/api/users/login.php`, data);
  } catch (error) {
    res = error.response;
  }

  return res;
}

export async function validate(data) {
  let res;
  try {
    res = await axios.post(`/api/token/validate.php`, data);
  } catch (error) {
    res = error.response;
  }
  return res;
}

export async function getCities() {
  let res;
  try {
    res = await axios.get(`/api/cities/read.php`);
  } catch (error) {
    res = error.response;
  }
  return res;
}

export async function getPositions() {
  let res;
  try {
    res = await axios.get(`/api/positions/read.php`);
  } catch (error) {
    res = error.response;
  }
  return res;
}

export async function getOrganizations() {
  let res;
  try {
    res = await axios.get(`/api/organizations/read.php`);
  } catch (error) {
    res = error.response;
  }
  return res;
}
