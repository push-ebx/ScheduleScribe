import {useSelector} from "react-redux";
import {Projects} from "@/components/ui/projects/index.jsx";

export const Calendars = () => {
  const project = useSelector((state) => state.project);

  return (
    <main>
      {
        project.id ?
          <>Календари</>:
          <Projects/>
      }
    </main>
  );
};