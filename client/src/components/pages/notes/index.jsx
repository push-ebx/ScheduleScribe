import styles from './style.module.scss';
import {useDispatch, useSelector} from "react-redux";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {Noteboards} from "@/components/ui/noteboards";
import {Projects} from "@/components/ui/projects/index.jsx";
import {useEffect, useState} from "react";
import {deleteNote, getNotes} from "@/api/note.js";
import {CreateNote} from "@/components/modals/create-note/index.jsx";
import {Breadcrumb, Button, Flex, Tooltip} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {init as initNoteboard} from "@/lib/slices/noteboardSlice.js";
import {NoteCard} from "@/components/pages/notes/note-card.jsx";
import {ArrowLeftOutlined} from "@ant-design/icons";

export const Notes = () => {
  const project = useSelector((state) => state.project);
  const noteboard = useSelector((state) => state.noteboard);

  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchNotes = async () => {
    const res = await getNotes({noteboard_id: noteboard.id});
    console.log(res.data)
    setNotes(res.data)
  }

  useEffect(() => {
    noteboard.id && fetchNotes();
  }, [noteboard]);

  const toNoteboards = () => {
    dispatch(initNoteboard({}));
    navigate(`${location.pathname}?project_id=${project.id}`);
  }

  const handleCreate = ({id, content, importance, noteboard_id, title, username, url}) => {
    setNotes(prev => [...prev, {id, content, importance, noteboard_id, title, username, url}]);
  }

  const handleDelete = async (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    await deleteNote({id});
  }

  return (
    <main className={styles.main}>
      <Breadcrumb
        items={[
          {
            title: 'Заметки',
          },
          project.title ? {
            title: project.title,
          } : {},
          noteboard.title ? {
            title: noteboard.title,
          } : {}
        ]}
      />
      {
        project.id && noteboard.id ?
          <Flex className={styles.board} vertical gap={30}>
            <Flex align={"end"} gap={10}>
              <Tooltip title={"К списку досок"} placement={"top"}>
                <Button shape={"circle"} type={"text"} onClick={toNoteboards}><ArrowLeftOutlined/></Button>
              </Tooltip>
              <h1>{noteboard.title}</h1>
            </Flex>
            <ResponsiveMasonry
              columnsCountBreakPoints={{320: 1, 880: 2, 1150: 3, 1450: 4}}
              style={{width: '100%'}}
            >
              <Masonry gutter={"10px"}>
                {notes.map((item, index) => (
                  <NoteCard key={index} note={item} onDelete={() => handleDelete(item.id)}/>
                ))}
                <CreateNote onCreate={handleCreate}/>
              </Masonry>
            </ResponsiveMasonry>
          </Flex> :
          project.id ?
            <Noteboards/> :
            <Projects/>
      }
    </main>
  );
};