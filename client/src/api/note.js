import {$api} from "./config";

export const createNote = async ({noteboard_id, content, importance, title}) => {
  const res = await $api.post(`/note/create`, {noteboard_id, content, importance, title});
  return res.data;
};

export const getNotes = async ({noteboard_id}) => {
  const res = await $api.get(`/notes/get?noteboard_id=${noteboard_id}`);
  return res.data;
};

export const getUserNotes = async () => {
  const res = await $api.get(`/notes/getUserNotes`);
  return res.data;
};

export const getNote = async ({note_id}) => {
  const res = await $api.get(`/note/get?note_id=${note_id}`);
  return res.data;
};

export const deleteNote = async ({id}) => {
  const res = await $api.delete(`/note/delete?id=${id}`);
  return res.data;
};

export const changeImportance = async ({note_id, importance}) => {
  const res = await $api.post(`/note/changeImportance?note_id=${note_id}&importance=${importance}`);
  return res.data;
};