import {$api} from "./config";

export const createProject = async ({title, description}) => {
  const res = await $api.post(`/project/create`, {title, description});
  return res.data;
};

export const addProject = async ({id}) => {
  const res = await $api.post(`/project/add`, {id});
  return res.data;
};

export const getProjects = async () => {
  const res = await $api.get(`/projects/get`);
  return res.data;
};

export const getProject = async ({project_id}) => {
  const res = await $api.get(`/project/get?project_id=${project_id}`);
  return res.data;
};

export const deleteProject = async ({id}) => {
  const res = await $api.delete(`/project/delete?id=${id}`);
  return res.data;
};