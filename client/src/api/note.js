import {$api} from "./config";

export const createNote = async ({noteboard_id, content, importance}) => {
  const res = await $api.post(`/note/create`, {noteboard_id, content, importance});
  return res.data;
};

export const getNotes = async ({noteboard_id}) => {
  const res = await $api.get(`/notes/get?noteboard_id=${noteboard_id}`);
  return res.data;
};

export const getNote = async ({note_id}) => {
  const res = await $api.get(`/note/get?${note_id}`);
  return res.data;
};

export const deleteNote = async ({id}) => {
  const res = await $api.delete(`/note/delete?id=${id}`);
  return res.data;
};