import styles from "./style.module.scss";
import {useEffect, useState} from "react";
import {getProjects} from "@/api/projects.js";
import {Loader} from "@/components/ui/loader/index.jsx";
import {ProjectCard} from "@/components/ui/projects/project-card.jsx";
import {CreateProject} from "@/components/modals/create-project/index.jsx";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const fetchProjects = async () => {
    const res = await getProjects();
    setProjects(res.data)
    setIsFetching(false);
  }

  useEffect(() => {
    fetchProjects()
  }, []);

  const handleCreate = ({id, title, description}) => {
   setProjects(prev => [...prev, {id, title, description}])
  }

  return (
    <section>
      {
        projects.length ?
          <div className={styles.projects}>
            {
              projects.map(project => (
                <ProjectCard id={project.id} title={project.title} description={project.description}/>
              ))
            }
            <CreateProject onCreate={handleCreate}/>
          </div>
          :
          isFetching ?
            <Loader/> :
            "проекты не найдены"
      }
    </section>
  );
};