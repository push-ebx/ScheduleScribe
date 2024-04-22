import {Button, Card} from "antd";
import {DeleteOutlined} from '@ant-design/icons';
import styles from "./style.module.scss";
import {useState} from "react";
import {deleteProject} from "@/api/projects.js";

export const ProjectCard = ({id, title, description, onDelete, onSelect}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteProject({id});

    setTimeout(() => {
      onDelete({id});
      setIsDeleting(false);
    }, 500);
  };

  return (
    <Card
      key={id}
      title={title}
      className={styles.card}
      onClick={() => onSelect({id, title, description})}
    >
      <div className={styles.description}>{description}</div>
      <Button
        type="text"
        danger
        icon={<DeleteOutlined/>}
        onClick={handleDelete}
        loading={isDeleting}
      >
        Удалить проект
      </Button>
    </Card>
  );
};