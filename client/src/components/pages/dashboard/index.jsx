import styles from "./style.module.scss";
import { Header } from '@/components/header'
import {Sidebar} from "@/components/sidebar/index.jsx";
import clsx from "clsx";
import {useSelector} from "react-redux";

export const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <Header />
      <Sidebar />
      <main className={clsx("container", styles.cards)}>
        <div className={clsx(styles.today_events, styles.card)}>
          today_events
          <div className={styles.card_content}>
            content today_events
          </div>
        </div>
        <div className={clsx(styles.calendar, styles.card)}>
          calendar
          <div className={styles.card_content}>
            {/*<Calendar/>*/}
            {JSON.stringify(user)}
          </div>
        </div>
        <div className={clsx(styles.info, styles.card)}>
          info
          <div className={styles.card_content}>
            content info
          </div>
        </div>
        <div className={clsx(styles.notes, styles.card)}>
          notes
          <div className={styles.card_content}>
            content notes
          </div>
        </div>
        <div className={clsx(styles.important_events, styles.card)}>
          important_events
          <div className={styles.card_content}>
            content important_events
          </div>
        </div>
        <div className={clsx(styles.upcoming_events, styles.card)}>
          upcoming_events
          <div className={styles.card_content}>
            content upcoming_events
          </div>
        </div>
      </main>
    </>
  )
}
