import {Calendar, Grid, Notes, Notification} from "@/components/icons/index.jsx";
import styles from "./style.module.scss";
import {NavLink} from "react-router-dom";
import clsx from "clsx";

const sidebarItems = [
  {icon: <Grid />, path: '/dashboard'},
  {icon: <Calendar />, path: '/calendars'},
  {icon: <Notes />, path: '/notes'},
  {icon: <Notification />, path: '/notifications'},
];

export const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      {
        sidebarItems.map(item => (
          <NavLink
            className={({ isActive }) => clsx(isActive && styles.active, styles.navlink) }
            to={item.path}
          >
            {item.icon}
          </NavLink>
        ))
      }
    </nav>
  )
}