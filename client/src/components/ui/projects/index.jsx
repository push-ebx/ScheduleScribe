import styles from "./style.module.scss";
import {useEffect, useState} from "react";
import {getProjects} from "@/api/projects.js";
import {Loader} from "@/components/ui/loader/index.jsx";
import {ProjectCard} from "@/components/ui/projects/project-card.jsx";
import {CreateProject} from "@/components/modals/create-project/index.jsx";
import {Space} from "antd";
import clsx from "clsx";
import {useDispatch} from "react-redux";
import {init} from "@/lib/slices/projectSlice.js";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();

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

  const handleDelete = ({id}) => {
    setProjects(prev => prev.filter(project => project.id !== id))
  }

  const handleSelect = ({id, title, description}) => {
    dispatch(init({id, title, description}));
  }

  return (
    <section>
      <Space wrap className={clsx(styles.projects, styles.space)}>
        {
          projects.length ? projects.map(project => (
              <ProjectCard
                id={project.id}
                title={project.title}
                description={project.description}
                onDelete={handleDelete}
                onSelect={handleSelect}
              />
            )) :
            isFetching ?
              <Loader/> :
              "проекты не найдены"
        }
        <CreateProject onCreate={handleCreate}/>
      </Space>
    </section>
  );
};