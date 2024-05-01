import {$api} from "./config";

export const getUser = async () => {
  const res = await $api.get(`/user/get`);
  return res.data;
};

export const getStatistics = async ({date}) => {
  const res = await $api.get(`/user/statistics?date=${date}`);
  return res.data;
};