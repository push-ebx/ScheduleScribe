import React, {useEffect} from 'react';
import {Header} from "@/components/ui/header/index.jsx";
import {Sidebar} from "@/components/ui/sidebar/index.jsx";
import clsx from "clsx";
import styles from "./style.module.scss";
import {init as initProject} from "@/lib/slices/projectSlice.js";
import {init as initNoteboard} from "@/lib/slices/noteboardSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {getNoteboard} from "@/api/noteboard.js";
import {parseURL} from "@/utils/index.js";
import {getProject} from "@/api/project.js";

export const DashboardLayout = ({children}) => {
  const searchParams = parseURL(window.location.href);
  const project = useSelector((state) => state.project);
  const noteboard = useSelector((state) => state.noteboard);
  const dispatch = useDispatch();

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

  useEffect(() => {
    !project.id && searchParams?.project_id && fetchProject();
    !noteboard.id && searchParams?.noteboard_id && fetchNoteboard();
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <main className={clsx(styles.container)}>{children}</main>
    </>
  );
};