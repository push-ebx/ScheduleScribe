import {$api} from "./config";

export const createEvent = async ({calendar_id, reminder_date, content, title, importance}) => {
  const res = await $api.post(`/event/create`, {calendar_id, reminder_date, content, title, importance});
  return res.data;
};

export const getEvents = async ({calendar_id}) => {
  const res = await $api.get(`/events/get?calendar_id=${calendar_id}`);
  return res.data;
};

export const getImportantEvents = async () => {
  const res = await $api.get(`/events/important`);
  return res.data;
};

export const getEventsAfterDate = async ({date}) => {
  const res = await $api.get(`/events/afterDate?date=${date}`);
  return res.data;
};

export const getEventsByDate = async ({date}) => {
  const res = await $api.get(`/events/byDate?date=${date}`);
  return res.data;
};

export const getEvent = async ({event_id}) => {
  const res = await $api.get(`/event/get?event_id=${event_id}`);
  return res.data;
};

export const deleteEvent = async ({id}) => {
  const res = await $api.delete(`/event/delete?id=${id}`);
  return res.data;
};