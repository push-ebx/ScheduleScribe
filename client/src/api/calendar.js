import {$api} from "./config";

export const createCalendar = async ({title, description, project_id}) => {
  const res = await $api.post(`/calendar/create`, {title, description, project_id});
  return res.data;
};

export const getCalendars = async ({project_id}) => {
  const res = await $api.get(`/calendars/get?project_id=${project_id}`);
  return res.data;
};

export const getCalendar = async ({calendar_id}) => {
  const res = await $api.get(`/calendar/get?calendar_id=${calendar_id}`);
  return res.data;
};

export const deleteCalendar = async ({id}) => {
  const res = await $api.delete(`/calendar/delete?id=${id}`);
  return res.data;
};