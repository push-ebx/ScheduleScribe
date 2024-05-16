import React, {useEffect, useState} from 'react';
import {Header} from "@/components/ui/header";
import {Sidebar} from "@/components/ui/sidebar";
import clsx from "clsx";
import styles from "./style.module.scss";
import {init as initProject} from "@/lib/slices/projectSlice";
import {init as initNoteboard} from "@/lib/slices/noteboardSlice";
import {init as initCalendar} from "@/lib/slices/calendarSlice";
import {useDispatch, useSelector} from "react-redux";
import {getNoteboard} from "@/api/noteboard.js";
import {parseURL} from "@/utils/index.js";
import {getProject} from "@/api/project.js";
import {getCalendar} from "@/api/calendar";
import {getEventsAfterDate} from "@/api/event";
import dayjs from "dayjs";
import {log} from "@craco/craco/dist/lib/logger";

export const DashboardLayout = ({children}) => {
  const searchParams = parseURL(window.location.href);
  const project = useSelector((state) => state.project);
  const noteboard = useSelector((state) => state.noteboard);
  const calendar = useSelector((state) => state.calendar);
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);

  function checkEventsTime() {
    const currentTime = new Date().getTime();

    events && events.forEach((event, i) => {
      if (currentTime >= event.time && !event.notified) {
        sendNotification(event.name);
        const copy = events.slice();
        copy[i].notified = true;
        setEvents(prev => copy);
      }
    });
  }

  function sendNotification(eventName) {
    if ("Notification" in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          const notification = new Notification("Наступило событие!", {
            body: `${eventName} началось`,
          });
        }
      });
    }
  }

  const fetchNoteboard = async () => {
    const res = await getNoteboard({noteboard_id: searchParams.noteboard_id});

    dispatch(initNoteboard({
      id: res.data.id,
      title: res.data.title,
      description: res.data.description,
    }));
  }

  const fetchProject = async () => {
    const res = await getProject({project_id: searchParams.project_id});

    dispatch(initProject({
      id: res.data.id,
      title: res.data.title,
      description: res.data.description,
    }));
  }

  const fetchCalendar = async () => {
    const res = await getCalendar({calendar_id: searchParams.calendar_id});
    console.log(res)
    dispatch(initCalendar({
      id: res.data.id,
      title: res.data.title,
      description: res.data.description,
    }));
  }

  useEffect(() => {
    !project.id && searchParams?.project_id && fetchProject();
    !noteboard.id && searchParams?.noteboard_id && fetchNoteboard();
    !calendar.id && searchParams?.calendar_id && fetchCalendar();

    const interval = setInterval(() => {
      getEventsAfterDate({date: dayjs().format("YYYY-MM-DD HH:mm:ss")}).then(res => {
        setEvents(res.data.map(event => ({
          name: event.title,
          time: new Date(event.reminder_date).getTime()
        })));
      });
    }, 10000)

    return () => clearInterval(interval)
  }, []);

  useEffect(() => {
    // console.log(events);
    //
    const interval = setInterval(() => {
      checkEventsTime();
    }, 1000)

    return () => clearInterval(interval)
  }, [events]);

  return (
    <>
      <Header />
      <Sidebar />
      <main className={clsx(styles.container)}>{children}</main>
    </>
  );
};