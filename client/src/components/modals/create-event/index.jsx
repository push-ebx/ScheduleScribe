import styles from "./style.module.scss";
import {Form, Input, Modal, Flex, Typography} from "antd";
import {useState} from "react";
import {createNote} from "@/api/note.js";
import {useSelector} from "react-redux";
import { Segmented } from 'antd';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {createEvent} from "@/api/event";

const format = 'HH:mm';
const {TextArea} = Input;

export const CreateEvent = ({onCreate, open, setOpen, date}) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const calendar = useSelector((state) => state.calendar);
  dayjs.extend(utc)

  const handleCreate = async () => {
    try {
      setConfirmLoading(true);

      const values = await form.validateFields();

      const reminder_date = `${date.format("YYYY-MM-DD")} ${values.time.format(format)}`

      await createEvent({
        calendar_id: calendar.id,
        importance: values.importance ?? "1",
        content: values.content,
        reminder_date: reminder_date,
        title: values.title
      });

      setTimeout(() => {
        onCreate({
          calendar_id: calendar.id,
          importance: values.importance ?? "1",
          content: values.content,
          reminder_date: reminder_date,
          title: values.title
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
      <Modal
        title="Создание события"
        open={open}
        onOk={handleCreate}
        onCancel={() => setOpen(false)}
        centered
        confirmLoading={confirmLoading}
      >
        <Flex vertical gap={10}>
          <Typography.Text type={"secondary"}>Выбранная дата: {date.format('DD.MM.YYYY')}</Typography.Text>
          <Form form={form} layout="vertical">
            <Form.Item
              name="title"
              label="Название события:"
              rules={[{required: true, message: 'Пожалуйста, введите название события'}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="content"
              label="Описание:"
              rules={[{required: true, message: 'Пожалуйста, введите описание события'}]}
            >
              <TextArea rows={5} />
            </Form.Item>
            <Form.Item
              name="time"
              label="Время:"
              rules={[{required: true, message: 'Пожалуйста, выберите время события'}]}
            >
              <TimePicker format={format} />
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
        </Flex>
      </Modal>
    </>
  );
};