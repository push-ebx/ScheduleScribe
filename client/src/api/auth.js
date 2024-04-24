import {$api} from "./config";

export const login = async (username, password) => {
  const res = await $api.post(`/auth/login`, {username, password});

  if (res.success) {
    localStorage.setItem("token", res.data.data.token);
  }

  return res.data;
};

export const registration = async (username, password, url) => {
  const res = await $api.post(`/auth/registration`, {username, password, url});
  return res.data;
};