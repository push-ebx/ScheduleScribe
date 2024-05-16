import {Button, FloatButton, Form, Input, Modal, Tooltip} from "antd";
import {useState} from "react";
import {createNote} from "@/api/note.js";
import {useSelector} from "react-redux";
import { Segmented } from 'antd';
import styles from "./style.module.scss";
import {PlusOutlined} from "@ant-design/icons";
import {createCalendar} from "@/api/calendar";

const {TextArea} = Input;

export const CreateCalendar = ({onCreate}) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);

  const handleCreate = async () => {
    try {
      setConfirmLoading(true);

      const values = await form.validateFields();
      const res = await createCalendar({
        description: values.description,
        project_id: project.id,
        title: values.title
      });

      setTimeout(() => {
        onCreate({
          id: res.data.id,
          description: values.description,
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
      <Tooltip title={"Создать календарь"} placement={"top"}>
        <Button shape={"circle"} onClick={() => setOpen(true)} icon={<PlusOutlined />}/>
      </Tooltip>
      <Modal
        title="Создание календаря"
        open={open}
        onOk={handleCreate}
        onCancel={() => setOpen(false)}
        centered
        confirmLoading={confirmLoading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Название календаря:"
            rules={[{required: true, message: 'Пожалуйста, введите название календаря'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="description"
            label="Описание:"
            rules={[{required: true, message: 'Пожалуйста, введите описание календаря'}]}
          >
            <TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};