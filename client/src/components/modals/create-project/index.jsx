import {Button, Form, Input, Modal} from "antd";
import {useState} from "react";
import {createProject} from "@/api/projects.js";

const {TextArea} = Input;

export const CreateProject = ({onCreate}) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCreate = async () => {
    try {
      setConfirmLoading(true);

      const values = await form.validateFields();
      const res = await createProject({title: values.title, description: values.description});
      form.resetFields();

      onCreate({id: res.data.id, title: values.title, description: values.description});
      setOpen(false);
      setConfirmLoading(false);
    } catch (err) {
      console.error('Validation failed:', err);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Создать</Button>
      <Modal
        title="Создание проекта"
        open={open}
        onOk={handleCreate}
        onCancel={() => setOpen(false)}
        centered
        confirmLoading={confirmLoading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Название"
            rules={[{required: true, message: 'Пожалуйста, введите название проекта'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="description"
            label="Описание"
            rules={[{required: true, message: 'Пожалуйста, введите описание проекта'}]}
          >
            <TextArea rows={4}/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};