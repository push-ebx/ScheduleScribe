import {Avatar, Empty, Flex, List, Tag, Typography} from "antd";
import {useEffect, useState} from "react";
import {getEventsAfterDate} from "@/api/event";
import dayjs from "dayjs";
import styles from "@/components/ui/notes-list/style.module.scss";
import clsx from "clsx";

export const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const importances = [
    {color: "success", title: "Низкий"},
    {color: "warning", title: "Средний"},
    {color: "error", title: "Высокий"}
  ];

  const fetchEvents = async () => {
    const res = await getEventsAfterDate({date: dayjs().format("YYYY-MM-DD HH:mm:ss")});
    setEvents(res.data);
    setIsFetching(false);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <List
      className={clsx(!events.length && styles.centered)}
      locale={{emptyText: <Empty description="Предстоящие события не найдены" />}}
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
            <Typography.Text type={"secondary"}>{dayjs(item.reminder_date).format("DD.MM.YYYY HH:MM")}</Typography.Text>
          </Flex>
        </List.Item>
      )}
    />
  );
};