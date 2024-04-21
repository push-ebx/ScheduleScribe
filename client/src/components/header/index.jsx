import styles from "./style.module.scss";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        Выйти
      </a>
    ),
  }
];

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        ScheduleScribe
      </div>
      <div className={styles.user}>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            username
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      </div>
    </header>
  )
}
