import styles from "./style.module.scss";
import {useEffect, useState} from "react";
import {getProjects} from "@/api/project.js";
import {Loader} from "@/components/ui/loader/index.jsx";
import {ProjectCard} from "@/components/ui/projects/project-card.jsx";
import {CreateProject} from "@/components/modals/create-project/index.jsx";
import {Space} from "antd";
import clsx from "clsx";
import {useDispatch} from "react-redux";
import {init} from "@/lib/slices/projectSlice.js";
import {useNavigate, useLocation} from "react-router-dom";
import {ProjectOutlined} from "@ant-design/icons";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location= useLocation();

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
    navigate(`${location.pathname}?project_id=${id}`)
  }

  return (
    <section className={styles.main}>
      <h1>Проекты <ProjectOutlined /></h1>
      <Space wrap className={clsx(styles.projects, styles.space)}>
        {
          projects.length ? projects.map(project => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                onDelete={handleDelete}
                onSelect={handleSelect}
              />
            )) :
            isFetching ?
              <Loader/> :
              "Проекты не найдены"
        }
        <CreateProject onCreate={handleCreate}/>
      </Space>
    </section>
  );
};