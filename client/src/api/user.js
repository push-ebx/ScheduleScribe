import {$api} from "./config";

export const getUser = async () => {
  const res = await $api.get(`/user/get`);
  return res.data;
};