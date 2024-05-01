import styles from './style.module.scss';
import {Badge, Button, Calendar as AntdCalendar, Tooltip} from 'antd';
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {init as initCalendar} from "@/lib/slices/calendarSlice";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {CreateEvent} from "@/components/modals/create-event";
import dayjs from "dayjs";
import {getEvents} from "@/api/event";
import {Loader} from "@/components/ui/loader";

export const Calendar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [open, setOpen] = useState(false);
  const calendar = useSelector((state) => state.calendar);
  const [events, setEvents] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const importance_colors = ["success", "warning", "error"];

  const fetchEvents = async () => {
    const res = await getEvents({calendar_id: calendar.id});
    setEvents(res.data);
    setIsFetching(false);
  }

  useEffect(() => {
    fetchEvents()
  }, []);

  const toCalendars = () => {
    dispatch(initCalendar({}));
    navigate(`${location.pathname}?project_id=${project.id}`);
  }

  const getCorrectDeclension = count => {
    if (count % 10 === 1) return "событие";
    else if (count % 10 >= 2 && count % 10 <= 4) return "события";
    return "событий";
  }

  const monthCellRender = (value) => {
    const count = events.filter(event => dayjs.utc(event.reminder_date).month() === value.month()).length;

    return count ? (
      <div className="notes-month">
        <Badge status={"error"} text={`${count} ${getCorrectDeclension(count)}`} />
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const day_events = events.filter(event => {
      return dayjs.utc(event.reminder_date).format('YYYY-MM-DD') === value.utc().format('YYYY-MM-DD');
    })

    return (
      <ul className="events">
        {day_events.map((item) => (
          <li key={item.content}>
            <Badge status={importance_colors[item.importance-1]} text={item.title} />
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
    setCurrentDate(date);
    setOpen(true);
  }

  const handlerCreate = ({calendar_id,
                           importance,
                           content,
                           reminder_date,
                           title}) => {
    setEvents(prev => [...prev, {calendar_id, importance, content, reminder_date, title}]);
  }

  return (
    <main className={styles.main}>
      <Tooltip title={"К списку календарей"} placement={"top"}>
        <Button shape={"circle"} type={"text"} onClick={toCalendars}><ArrowLeftOutlined/></Button>
      </Tooltip>
      {
        isFetching ? <Loader/> : <AntdCalendar onSelect={handleSelect} cellRender={cellRender} />
      }
      <CreateEvent onCreate={handlerCreate} setOpen={setOpen} open={open} date={currentDate}/>
    </main>
  );
};