import {Button, Form, Input, Modal, Select} from "antd";
import {useState} from "react";
import {createNote} from "@/api/note.js";
import {useSelector} from "react-redux";

const {TextArea} = Input;

export const CreateNote = ({onCreate}) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const project = useSelector((state) => state.project);

  const handleCreate = async () => {
    try {
      setConfirmLoading(true);

      const values = await form.validateFields();
      const res = await createNote({
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
      <Button onClick={() => setOpen(true)}>Создать</Button>
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
            name="content"
            label="Содежимое"
            rules={[{required: true, message: 'Пожалуйста, введите содержимое заметки'}]}
          >
            <TextArea rows={4}/>
          </Form.Item>
          <Form.Item
            name="importance"
            label="Приоритет"
            rules={[{required: true, message: 'Пожалуйста, выберите приоритет заметки'}]}
          >
            <Select/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};