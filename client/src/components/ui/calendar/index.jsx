import styles from './style.module.scss';
import {Badge, Button, Calendar as AntdCalendar, Tooltip} from 'antd';
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {init as initCalendar} from "@/lib/slices/calendarSlice";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useState} from "react";
import {CreateEvent} from "@/components/modals/create-event";

const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        },
        {
          type: 'error',
          content: 'This is error event.',
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event',
        },
        {
          type: 'success',
          content: 'This is very long usual event......',
        },
        {
          type: 'error',
          content: 'This is error event 1.',
        },
        {
          type: 'error',
          content: 'This is error event 2.',
        },
        {
          type: 'error',
          content: 'This is error event 3.',
        },
        {
          type: 'error',
          content: 'This is error event 4.',
        },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value) => {
  if (value.month() === 8) {
    return <Badge status={"error"} text={"10 событий"} />;
  }
};

export const Calendar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const [currentDate, setCurrentDate] = useState('');

  const [open, setOpen] = useState(false);

  const toCalendars = () => {
    dispatch(initCalendar({}));
    navigate(`${location.pathname}?project_id=${project.id}`);
  }

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events" onClick={() => console.log(value)}>
        {listData.map((item) => (
          <li key={item.content} onClick={() => console.log(item)}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  const handleSelect = (date) => {
    setCurrentDate(date.format('DD.MM.YYYY'));
    setOpen(true);
  }

  return (
    <main className={styles.main}>
      <Tooltip title={"К списку календарей"} placement={"top"}>
        <Button shape={"circle"} type={"text"} onClick={toCalendars}><ArrowLeftOutlined/></Button>
      </Tooltip>
      <AntdCalendar onSelect={handleSelect} cellRender={cellRender} />
      <CreateEvent setOpen={setOpen} open={open} date={currentDate}/>
    </main>
  );
};