import React from 'react';
import {Avatar, Button, Card, Popconfirm, Segmented, Space, Tooltip} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import styles from "./style.module.scss";
import {changeImportance} from "@/api/note.js";
import { Typography } from 'antd';

export const NoteCard = ({note, onDelete}) => {
  const handleChangeImportance = async (value) => {
    await changeImportance({note_id: note.id, importance: value});
  };

  return (
    <Card
      title={
        <Space direction={"vertical"} style={{marginTop: 15, rowGap: 0}}>
          <span style={{fontSize: 12, opacity: 0.7}}>
            {note.creation_date?.split('T')[0].split("-").reverse().join(".") ?? new Date().toLocaleDateString()}
          </span>
          <h2 style={{textWrap: "wrap"}}>{note.title}</h2>
        </Space>
      }
      className={styles.card}
      extra={
        <Tooltip title={"Удалить заметку"} placement={"top"}>
          <Popconfirm
            title="Удаление заметки"
            description={<>Вы действительно хотите <br/> удалить заметку?</>}
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
    >
      <Space direction={"vertical"} style={{width: "100%", gap: 15}}>
        <Typography.Paragraph copyable className={styles.content}>{note.content}</Typography.Paragraph>
        <Tooltip title={note.username} placement={"right"}>
          <Avatar src={note.url}>{note.username[0]}</Avatar>
        </Tooltip>
        <Segmented
          defaultValue={note.importance.toString()}
          options={[
            {value: '1', label: 'Низкий', className: styles.low},
            {value: '2', label: 'Средний', className: styles.medium},
            {value: '3', label: 'Высокий', className: styles.high}
          ]}
          size="middle"
          onChange={handleChangeImportance}
        />
      </Space>
    </Card>
  );
};