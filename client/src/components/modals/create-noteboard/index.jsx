import {Button, FloatButton, Form, Input, Modal, Tooltip} from "antd";
import {useState} from "react";
import {createNoteboard} from "@/api/noteboard.js";
import {useSelector} from "react-redux";
import {PlusOutlined} from "@ant-design/icons";

const {TextArea} = Input;

export const CreateNoteboard = ({onCreate}) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const project = useSelector((state) => state.project);

  const handleCreate = async () => {
    try {
      setConfirmLoading(true);

      const values = await form.validateFields();
      const res = await createNoteboard({
        title: values.title,
        description: values.description,
        project_id: project.id
      });
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
      <Tooltip title={"Создать доску заметок"} placement={"top"}>
        <Button shape={"circle"} onClick={() => setOpen(true)} icon={<PlusOutlined />}/>
      </Tooltip>
      <Modal
        title="Создание доски заметок"
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
            rules={[{required: true, message: 'Пожалуйста, введите название доски'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="description"
            label="Описание"
            rules={[{required: true, message: 'Пожалуйста, введите описание доски'}]}
          >
            <TextArea rows={4}/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};