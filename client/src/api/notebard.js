import {$api} from "./config";

export const createNoteboard = async ({title, description, project_id}) => {
  const res = await $api.post(`/noteboard/create`, {title, description, project_id});
  return res.data;
};

export const getNoteboards = async () => {
  const res = await $api.get(`/noteboards/get`);
  return res.data;
};

export const getNoteboard = async ({noteboard_id}) => {
  const res = await $api.get(`/noteboard/get?noteboard_id=${noteboard_id}`);
  return res.data;
};

export const deleteNoteboard = async ({id}) => {
  const res = await $api.delete(`/noteboard/delete?id=${id}`);
  return res.data;
};