import styles from './style.module.scss';
import {Projects} from "@/components/ui/projects";
import {useSelector} from "react-redux";

export const Notes = () => {
  const project = useSelector((state) => state.project);

  return (
    <main className={styles.main}>
      {
        project.id ?
          <><h1>{project.title}</h1></>:
          <Projects/>
      }
    </main>
  );
};