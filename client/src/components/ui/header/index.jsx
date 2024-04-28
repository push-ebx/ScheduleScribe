import styles from "./style.module.scss";
import {Avatar, Dropdown, Space} from 'antd';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clear} from "@/lib/slices/userSlice.js";
import clsx from "clsx";
import {stringToColour} from "@/utils/index.js";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
        Schedule<span style={{color: "#ff5555"}}>S</span>cribe
      </div>
      <div className={styles.user}>
        <Dropdown menu={{items}}>
          <Space>
            <Avatar
              style={{
                backgroundColor: stringToColour(user.username)
              }}
              src={user.url}
            >
              {user.username[0]}
            </Avatar>
            <p style={{fontSize: 16}}>{user.username}</p>
          </Space>
        </Dropdown>
      </div>
    </header>
  )
}
