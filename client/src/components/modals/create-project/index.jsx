import {Button, FloatButton, Form, Input, Modal, Tooltip} from "antd";
import {useState} from "react";
import {createProject} from "@/api/project.js";
import {PlusOutlined, ProjectOutlined} from "@ant-design/icons";

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

      setTimeout(() => {
        onCreate({id: res.data.id, title: values.title, description: values.description});
        setOpen(false);
        setConfirmLoading(false);
      }, 500);
    } catch (err) {
      console.error('Validation failed:', err);
    }
  };

  return (
    <>
      <Tooltip title={"Создать новый проект"} placement={"top"}>
        <FloatButton onClick={() => setOpen(true)} icon={<PlusOutlined />}/>
      </Tooltip>
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