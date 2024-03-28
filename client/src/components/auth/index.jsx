import {useEffect, useState} from 'react';
import {Tabs, Form, Input, Button, message, Spin} from 'antd';
// import {login, registration} from '@/api/auth.ts';
import styles from "./style.module.scss";
import {useNavigate} from 'react-router-dom';
// import userStore from "@/store/user-store.ts";
// import {observer} from "mobx-react-lite";

const {TabPane} = Tabs;
// export const Auth = observer(() => {
export const Auth = (() => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

//   useEffect(() => {
//     // if (userStore.user && window.localStorage.getItem('token')) {
//     if (window.localStorage.getItem('token')) {
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 2000);
//     }
//   }, [userStore.user]);

  const handleRegistration = async () => {
    // const res = await registration(username, password, email);

    if (res.success) {
      message.success('Регистрация прошла успешно! Вы можете войти в аккаунт.');
    } else {
      message.error(`${res.message}`);
    }
  };

  const handleLogin = async () => {
    // const res = await login(username, password);

    // if (res.success) {
    //   message.success('Вы успешно вошли в аккаунт. Сейчас вы будете перенаправлены на страницу с вашими проектами!');
    //   console.log(res.data)
    //   userStore.setUser({username: res.data.username, email: res.data.email, id: res.data.id});
    // } else {
    //   message.error(`${res.message}`);
    // }
  };

  return (
    <>
      {window.localStorage.getItem('token')&0 ?
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
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{
                      required: true,
                      type: 'email',
                      message: 'Пожалуйста, введите корректный адрес электронной почты!'
                    }]}
                  >
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">Зарегистрироваться</Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </div>
        </div>}
    </>
  );
});