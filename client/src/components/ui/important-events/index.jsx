import {Avatar, Flex, List, Tag, Typography} from "antd";
import {useEffect, useState} from "react";
import {getEvents, getImportantEvents} from "@/api/event";
import {useSelector} from "react-redux";
import dayjs from "dayjs";

export const ImportantEvents = () => {
  const [events, setEvents] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const calendar = useSelector((state) => state.calendar);
  const importances = [
    {color: "success", title: "Низкий"},
    {color: "warning", title: "Средний"},
    {color: "error", title: "Высокий"}
  ];

  const fetchEvents = async () => {
    const res = await getImportantEvents();
    setEvents(res.data);
    setIsFetching(false);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <List
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