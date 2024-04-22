import styles from "./style.module.scss";
import { DownOutlined } from '@ant-design/icons';
import {Button, Dropdown, Space} from 'antd';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clear} from "@/lib/slices/userSlice.js";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const items = [
    {
      key: '1',
      label: (
        <Button onClick={() => {
          window.localStorage.setItem('token', '');
          dispatch(clear())
          navigate('/auth');
        }}>
          Выйти
        </Button>
      ),
    }
  ];

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        ScheduleScribe
      </div>
      <div className={styles.user}>
      <Dropdown menu={{items}}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {user.username}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      </div>
    </header>
  )
}
