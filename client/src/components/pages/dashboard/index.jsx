import styles from "./style.module.scss";
import clsx from "clsx";
import {useSelector} from "react-redux";
import {Calendar, Card, theme, Typography} from 'antd';
import {Info} from "@/components/ui/info/index.jsx";
import {TodayEvents} from "@/components/ui/today-events/index.jsx";
import {UpcomingEvents} from "@/components/ui/upcoming-events/index.jsx";
import {ImportantEvents} from "@/components/ui/important-events/index.jsx";
import {NotesList} from "@/components/ui/notes-list/index.jsx";

const {Paragraph, Text} = Typography;

const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

export const Dashboard = () => {
  const user = useSelector((state) => state.user);

  const {token} = theme.useToken();
  const wrapperStyle = {
    padding: '30px 90px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <>
      <div className={styles.cards}>
        <div className={clsx(styles.today_events, styles.card)}>
          <Typography.Title className={styles.title} level={3}>Сегодняшние события</Typography.Title>
          <div className={styles.card_content}>
            <TodayEvents/>
          </div>
        </div>
        <div className={clsx(styles.calendar, styles.card)}>
          <Typography.Title className={styles.title} level={3}>Календарь</Typography.Title>
          <div className={styles.card_content}>
            <div style={wrapperStyle}>
              <Calendar locale="ru-RU" fullscreen={false} onPanelChange={onPanelChange}/>
            </div>
            {/*{JSON.stringify(user)}*/}
          </div>
        </div>
        <div className={clsx(styles.info, styles.card)}>
          <Typography.Title className={styles.title} level={3}>Статистика</Typography.Title>
          <div className={styles.card_content}>
            <Info/>
          </div>
        </div>
        <div className={clsx(styles.notes, styles.card)}>
          <Typography.Title className={styles.title} level={3}>Заметки</Typography.Title>
          <div className={styles.card_content}>
            <NotesList/>
          </div>
        </div>
        <div className={clsx(styles.important_events, styles.card)}>
          <Typography.Title className={styles.title} level={3}>Важные события</Typography.Title>
          <div className={styles.card_content}>
            <ImportantEvents/>
          </div>
        </div>
        <div className={clsx(styles.upcoming_events, styles.card)}>
          <Typography.Title className={styles.title} level={3}>Прошедшие события</Typography.Title>
          <div className={styles.card_content}>
            <UpcomingEvents/>
          </div>
        </div>
      </div>
    </>
  )
}
