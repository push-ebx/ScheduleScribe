import {Button, Form, Input, Modal, Select} from "antd";
import {useState} from "react";
import {createNote} from "@/api/note.js";
import {useSelector} from "react-redux";

const {TextArea} = Input;

export const CreateNote = ({onCreate}) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const noteboard = useSelector((state) => state.noteboard);

  const handleCreate = async () => {
    try {
      setConfirmLoading(true);

      const values = await form.validateFields();
      const res = await createNote({
        content: values.content,
        importance: values.importance ?? "1",
        noteboard_id: noteboard.id
      });
      form.resetFields();

      setTimeout(() => {
        onCreate({
          id: res.data.id,
          content: values.content,
          importance: values.importance ?? "1",
          noteboard_id: noteboard.id
        });
        setOpen(false);
        setConfirmLoading(false);
      }, 500);
    } catch (err) {
      console.error('Validation failed:', err);
      setConfirmLoading(false);
    }
  };

  const handleChangeImportance = (value) => {
    console.log(`selected ${value}`);
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
            <TextArea rows={5} />
          </Form.Item>
          <Form.Item
            name="importance"
            label="Приоритет"
          >
            <Select
              defaultValue="1"
              style={{ width: 150 }}
              onChange={handleChangeImportance}
              options={[
                { value: '1', label: 'Низкий' },
                { value: '2', label: 'Средний' },
                { value: '3', label: 'Высокий' }
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};