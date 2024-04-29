import React from 'react';
import {Avatar, Button, Card, Popconfirm, Segmented, Space, Tooltip} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import styles from "./style.module.scss";
import {changeImportance} from "@/api/note.js";
import { Typography } from 'antd';

export const CalendarCard = ({calendar, onDelete, onSelect}) => {
  return (
    <Card
      title={
        <Space direction={"vertical"} style={{marginTop: 15, rowGap: 0}}>
          <h2 style={{textWrap: "wrap"}}>{calendar.title}</h2>
        </Space>
      }
      className={styles.card}
      extra={
        <Tooltip title={"Удалить календарь"} placement={"top"}>
          <Popconfirm
            title="Удаление календаря"
            description={<>Вы действительно хотите <br/> удалить календарь?</>}
            onConfirm={onDelete}
            okText="Да"
            cancelText="Нет"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined/>}
            />
          </Popconfirm>
        </Tooltip>
      }
      onClick={onSelect}
    >
      <Space direction={"vertical"} style={{width: "100%", gap: 15}}>
        <Typography.Paragraph copyable className={styles.content}>{calendar.description}</Typography.Paragraph>
        {/*<Tooltip title={calendar.username} placement={"right"}>*/}
        {/*  <Avatar src={calendar.url}>{calendar.username[0]}</Avatar>*/}
        {/*</Tooltip>*/}
      </Space>
    </Card>
  );
};