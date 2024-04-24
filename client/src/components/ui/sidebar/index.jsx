import {Calendar, Grid, Notes, Notification} from "@/components/icons/index.jsx";
import styles from "./style.module.scss";
import {NavLink} from "react-router-dom";
import clsx from "clsx";
import {Tooltip} from "antd";

const sidebarItems = [
  {id: 1, icon: <Grid />, path: '/dashboard', title: 'Главная'},
  {id: 2, icon: <Calendar />, path: '/calendars', title: 'Календари'},
  {id: 3, icon: <Notes />, path: '/notes', title: 'Заметки'},
  {id: 4, icon: <Notification />, path: '/notifications', title: 'Уведомления'},
];

export const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      {
        sidebarItems.map(item => (
          <Tooltip title={item.title} placement={"right"} key={item.id}>
            <NavLink
              className={({ isActive }) => clsx(isActive && styles.active, styles.navlink) }
              to={item.path}
            >
              {item.icon}
            </NavLink>
          </Tooltip>
        ))
      }
    </nav>
  )
}