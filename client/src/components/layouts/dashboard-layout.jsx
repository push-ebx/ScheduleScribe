import React from 'react';
import {Header} from "@/components/ui/header/index.jsx";
import {Sidebar} from "@/components/ui/sidebar/index.jsx";
import clsx from "clsx";
import styles from "./style.module.scss";

export const DashboardLayout = ({children}) => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className={clsx(styles.container)}>{children}</main>
    </>
  );
};