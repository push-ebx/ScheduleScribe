import styles from "./style.module.scss";
import {useEffect, useState} from "react";
import {getNoteboards} from "@/api/noteboard.js";
import {Loader} from "@/components/ui/loader/index.jsx";
import {NoteboardCard} from "@/components/ui/noteboards/noteboard-card.jsx";
import {CreateNoteboard} from "@/components/modals/create-noteboard/index.jsx";
import {Button, Flex, Space, Tooltip} from "antd";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {init} from "@/lib/slices/noteboardSlice.js";
import {useLocation, useNavigate} from "react-router-dom";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {init as initProject} from "@/lib/slices/projectSlice";

export const Noteboards = () => {
  const [noteboards, setNoteboards] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const navigate = useNavigate();
  const location= useLocation();

  const fetchNoteboards = async () => {
    const res = await getNoteboards({project_id: project.id});
    setNoteboards(res.data)
    setIsFetching(false);
  }

  useEffect(() => {
    fetchNoteboards()
  }, []);

  const handleCreate = ({id, title, description}) => {
    setNoteboards(prev => [...prev, {id, title, description}])
  }

  const handleDelete = ({id}) => {
    setNoteboards(prev => prev.filter(noteboard => noteboard.id !== id))
  }

  const handleSelect = ({id, title, description}) => {
    dispatch(init({id, title, description}));
    // navigate(`${location.pathname}${location.search}&noteboard_id=${id}`)
  }

  const toProjects = () => {
    dispatch(initProject({}));
    // navigate(`${location.pathname}`);
  }

  return (
    <Flex vertical align={"start"} gap={10}>
      <Tooltip title={"К списку проектов"} placement={"top"}>
        <Button shape={"circle"} type={"text"} onClick={toProjects}><ArrowLeftOutlined/></Button>
      </Tooltip>
      <Space wrap className={clsx(styles.noteboards, styles.space)}>
        {
          noteboards.length ? noteboards.map(noteboard => (
              <NoteboardCard
                key={noteboard.id}
                id={noteboard.id}
                title={noteboard.title}
                description={noteboard.description}
                onDelete={handleDelete}
                onSelect={handleSelect}
              />
            )) :
            isFetching ?
              <Loader/> :
              "Доски не найдены"
        }
        <CreateNoteboard onCreate={handleCreate}/>
      </Space>
    </Flex>
  );
};