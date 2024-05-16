import {Avatar, Empty, Flex, List, Tag, Typography} from "antd";
import {useEffect, useState} from "react";
import styles from "./style.module.scss"
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import {getUserNotes} from "@/api/note";
import clsx from "clsx";

export const NotesList = () => {
  const [events, setEvents] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const calendar = useSelector((state) => state.calendar);
  const importances = [
    {color: "success", title: "Низкий"},
    {color: "warning", title: "Средний"},
    {color: "error", title: "Высокий"}
  ];

  const fetchEvents = async () => {
    const res = await getUserNotes();
    setEvents(res.data);
    setIsFetching(false);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <List
      className={clsx(!events.length && styles.centered)}
      locale={{emptyText: <Empty description="Заметки не найдены" />}}
      itemLayout="horizontal"
      dataSource={events}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            title={item.title}
            description={item.content}
          />
          <Flex vertical gap={5} align={"end"}>
            <Tag color={importances[item.importance-1].color}>{importances[item.importance-1].title}</Tag>
            <Typography.Text type={"secondary"}>{dayjs(item.reminder_date).format("DD.MM.YYYY HH:mm")}</Typography.Text>
          </Flex>
        </List.Item>
      )}
    />
  );
};