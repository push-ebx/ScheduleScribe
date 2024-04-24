import styles from "./style.module.scss";
import {DownOutlined} from '@ant-design/icons';
import {Avatar, Dropdown, Space} from 'antd';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clear} from "@/lib/slices/userSlice.js";
import clsx from "clsx";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);

  const items = [
    {
      key: '1',
      label: (
        <a onClick={() => {
          window.localStorage.setItem('token', '');
          dispatch(clear())
          navigate('/auth');
        }}>
          Выйти
        </a>
      ),
    }
  ];

  return (
    <header className={clsx(styles.header)}>
      <div className={styles.logo}>
        ScheduleScribe
      </div>
      <div>
        {project.title}
      </div>
      <div className={styles.user}>
        <Dropdown menu={{items}}>
          <Space>
            <Avatar src={user.url}>{user.username[0]}</Avatar>
            {user.username}
            <DownOutlined/>
          </Space>
        </Dropdown>
      </div>
    </header>
  )
}
