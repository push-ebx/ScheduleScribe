import React from 'react';
import styles from "@/components/pages/notes/style.module.scss";
import {Button, Card} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

export const NoteCard = ({content}) => {
  return (
    <Card
      className={styles.card}
      // onClick={() => onSelect({id, title, description})}
    >
      <div className={styles.content}>{content}</div>
      <Button
        type="text"
        danger
        icon={<DeleteOutlined/>}
        // onClick={handleDelete}
        // loading={isDeleting}
      />
    </Card>
  );
};