import styles from "@/components/pages/notes/style.module.scss";
import {Breadcrumb, Button, Flex, Tooltip} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {Projects} from "@/components/ui/projects";
import {useDispatch, useSelector} from "react-redux";
import {init as initCalendar} from "@/lib/slices/calendarSlice";
import {init as initProject} from "@/lib/slices/projectSlice";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {CreateCalendar} from "@/components/modals/create-calendar";
import {deleteCalendar, getCalendars} from "@/api/calendar";
import {CalendarCard} from "@/components/pages/calendars/calendar-card";
import {Calendar} from "@/components/ui/calendar";

export const Calendars = () => {
  const project = useSelector((state) => state.project);
  const calendar = useSelector((state) => state.calendar);

  const [calendars, setCalendars] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchCalendars = async () => {
    const res = await getCalendars({project_id: project.id});
    setCalendars(res.data)
  }

  useEffect(() => {
    project.id && fetchCalendars();
  }, [project]);

  const toProjects = () => {
    dispatch(initProject({}));
    // navigate(`${location.pathname}`);
  }

  const handleCreate = ({id, title, project_id, description, username}) => {
    setCalendars(prev => [...prev, {id, title, project_id, description, username}]);
  }

  const handleDelete = async (id) => {
    setCalendars(prev => prev.filter(calendar => calendar.id !== id));
    await deleteCalendar({id});
  }

  const handleSelect = (item) => {
    console.log(location)
    dispatch(initCalendar({id: item.id, title: item.title, description: item.description}));
    // navigate(`${location.pathname}${location.search}&calendar_id=${item.id}`)
  }

  return (
    <main className={styles.main}>
      <Breadcrumb
        items={[
          {
            title: 'Календари',
          },
          project.title ? {
            title: project.title,
          } : {},
          calendar.title ? {
            title: calendar.title,
          } : {}
        ]}
      />
      {
        project.id && calendar.id ?
          <Calendar/> :
          project.id ?
            <Flex className={styles.board} vertical gap={30}>
              <Flex align={"end"} gap={10}>
                <Tooltip title={"К списку проектов"} placement={"top"}>
                  <Button shape={"circle"} type={"text"} onClick={toProjects}><ArrowLeftOutlined/></Button>
                </Tooltip>
                <h1>{calendar.title}</h1>
              </Flex>
              <ResponsiveMasonry
                columnsCountBreakPoints={{320: 1, 880: 2, 1150: 3, 1450: 4}}
                style={{width: '100%'}}
              >
                <Masonry gutter={"10px"}>
                  {calendars.map((item, index) => (
                    <CalendarCard
                      key={index}
                      calendar={item}
                      onDelete={() => handleDelete(item.id)}
                      onSelect={() => handleSelect(item)}
                    />
                  ))}
                  <CreateCalendar onCreate={handleCreate}/>
                </Masonry>
              </ResponsiveMasonry>
            </Flex> :
            <Projects/>
      }
    </main>
  );
};