import styles from './style.module.scss';
import {useDispatch, useSelector} from "react-redux";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {Noteboards} from "@/components/ui/noteboards";
import {Projects} from "@/components/ui/projects/index.jsx";
import {useEffect, useState} from "react";
import {getNotes} from "@/api/note.js";
import {CreateNote} from "@/components/modals/create-note/index.jsx";
import {Button} from "antd";
import {useLocation, useNavigate} from "react-router-dom";
import {init as initNoteboard} from "@/lib/slices/noteboardSlice.js";
import {NoteCard} from "@/components/pages/notes/note-card.jsx";

export const Notes = () => {
  const project = useSelector((state) => state.project);
  const noteboard = useSelector((state) => state.noteboard);

  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchNotes = async () => {
    const res = await getNotes({noteboard_id: noteboard.id});
    setNotes(res.data)
  }

  useEffect(() => {
    noteboard.id && fetchNotes();
  }, [noteboard]);

  const toNoteboards = () => {
    dispatch(initNoteboard({}));
    navigate(`${location.pathname}?project_id=${project.id}`);
  }

  const handleCreate = ({id, content, importance, noteboard_id}) => {
    setNotes(prev => [...prev, {id, content, importance, noteboard_id}]);
  }

  return (
    <main className={styles.main}>
      {
        project.id && noteboard.id ?
          <div className={styles.board}>
            <Button onClick={toNoteboards}>К списку досок</Button>
            <h1>{noteboard.title}</h1>
            <ResponsiveMasonry
              columnsCountBreakPoints={{350: 1, 750: 2, 1200: 3}}
              style={{width: '100%'}}
            >
              <Masonry gutter={"10px"}>
                {notes.map((item, index) => (
                  <NoteCard key={index} content={item.content}/>
                ))}
                <CreateNote onCreate={handleCreate}/>
              </Masonry>
            </ResponsiveMasonry>
          </div> :
          project.id ?
            <Noteboards/> :
            <Projects/>
      }
    </main>
  );
};