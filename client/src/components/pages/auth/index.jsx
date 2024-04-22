import {useState} from 'react';
import {Button, Form, Input, message, Tabs} from 'antd';
import styles from "./style.module.scss";
import {login, registration} from "@/api/auth.js";
import {useNavigate} from 'react-router-dom';
import {useAuth} from "@/components/hooks/useAuth.js";
const {TabPane} = Tabs;

export const Auth = (() => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {user, isFetching: isFetchingUser} = useAuth();

  const navigate = useNavigate();

  if (user) {
    navigate("/dashboard");
  }

  const handleRegistration = async () => {
    const res = await registration(username, password);

    if (res.success) {
      message.success('Регистрация прошла успешно! Вы можете войти в аккаунт.');
    } else {
      message.error(`${res.message}`);
    }
  };

  const handleLogin = async () => {
    const res = await login(username, password);

    if (res.success) {
      window.localStorage.setItem('token', res.data.token);
      navigate("/dashboard");
    } else {
      message.error(`${res.message}`);
    }
  };

  return (
    <>
      {
        isFetchingUser || user ?
        <div className="loader-container">
          <div className="loader"></div>
        </div> :
        <div className={styles.container}>
          <div className={styles.formWrapper}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Вход" key="1">
                <Form
                  onFinish={handleLogin}
                  layout="vertical"
                >
                  <Form.Item
                    label="Имя пользователя"
                    name="username"
                    rules={[{required: true, message: 'Пожалуйста, введите ваше имя пользователя!'}]}
                  >
                    <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
                  </Form.Item>
                  <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{required: true, message: 'Пожалуйста, введите ваш пароль!'}]}
                  >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">Войти</Button>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab="Регистрация" key="2">
                <Form
                  onFinish={handleRegistration}
                  layout="vertical"
                >
                  <Form.Item
                    label="Имя пользователя"
                    name="username"
                    rules={[{required: true, message: 'Пожалуйста, введите ваше имя пользователя!'}]}
                  >
                    <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
                  </Form.Item>
                  <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{required: true, message: 'Пожалуйста, введите ваш пароль!'}]}
                  >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">Зарегистрироваться</Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </div>
        </div>
      }
    </>
  );
});