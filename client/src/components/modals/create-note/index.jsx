import {FloatButton, Form, Input, Modal, Tooltip, Typography} from "antd";
import {useState} from "react";
import {createNote} from "@/api/note.js";
import {useSelector} from "react-redux";
import { Segmented } from 'antd';
import styles from "./style.module.scss";
import {PlusOutlined} from "@ant-design/icons";

const {TextArea} = Input;

export const CreateNote = ({onCreate}) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const noteboard = useSelector((state) => state.noteboard);
  const user = useSelector((state) => state.user);

  const handleCreate = async () => {
    try {
      setConfirmLoading(true);

      const values = await form.validateFields();
      const res = await createNote({
        content: values.content,
        importance: values.importance ?? "1",
        noteboard_id: noteboard.id,
        title: values.title
      });

      setTimeout(() => {
        onCreate({
          id: res.data.id,
          content: values.content,
          importance: values.importance ?? "1",
          noteboard_id: noteboard.id,
          title: values.title,
          username: user.username,
          url: user.url
        });
        setOpen(false);
        form.resetFields();
        setConfirmLoading(false);
      }, 500);
    } catch (err) {
      console.error('Validation failed:', err);
      setConfirmLoading(false);
    }
  };

  return (
    <>
      <Tooltip title={"Создать заметку"} placement={"top"}>
        <FloatButton onClick={() => setOpen(true)} icon={<PlusOutlined />}/>
      </Tooltip>
      <Modal
        title="Создание заметки"
        open={open}
        onOk={handleCreate}
        onCancel={() => setOpen(false)}
        centered
        confirmLoading={confirmLoading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Название заметки:"
            rules={[{required: true, message: 'Пожалуйста, введите название заметки'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="content"
            label="Содежимое:"
            rules={[{required: true, message: 'Пожалуйста, введите содержимое заметки'}]}
          >
            <TextArea rows={5} />
          </Form.Item>
          <Form.Item
            name="importance"
            label="Приоритет:"
          >
            <Segmented
              options={[
                { value: '1', label: 'Низкий', className: styles.low },
                { value: '2', label: 'Средний', className: styles.medium },
                { value: '3', label: 'Высокий', className: styles.high }
              ]}
              size="middle"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};