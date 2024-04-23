import styles from './style.module.scss';
import {useSelector} from "react-redux";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {Noteboards} from "@/components/ui/noteboards";
import {Projects} from "@/components/ui/projects/index.jsx";
import {useEffect, useState} from "react";
import {getNotes} from "@/api/note.js";
import {CreateNoteboard} from "@/components/modals/create-noteboard/index.jsx";
import {CreateNote} from "@/components/modals/create-note/index.jsx";

export const Notes = () => {
  const project = useSelector((state) => state.project);
  const noteboard = useSelector((state) => state.noteboard);

  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await getNotes(noteboard.id);
    setNotes(res.data)
  }

  useEffect(() => {
    noteboard.id && fetchNotes();
  }, [noteboard]);

  return (
    <main className={styles.main}>
      {
        project.id && noteboard.id ?
          <div className={styles.board}>
            <h1>{noteboard.title}</h1>
            <ResponsiveMasonry
              columnsCountBreakPoints={{350: 1, 750: 2, 1200: 3}}
              style={{width: '100%'}}
            >
              <Masonry gutter={"10px"}>
                {Array.from({length: 16}).map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: '100%',
                      border: '1px solid red'
                    }}
                  >
                    {index}
                  </div>
                ))}
                <CreateNote/>
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