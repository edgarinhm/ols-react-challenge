import { ProjectModel } from "common/models/project-model";

interface ProjectGridRowProps {
  project: ProjectModel;
}

const ProjectGridRow = ({ project }: ProjectGridRowProps) => {
  return <div>{project.projectName}</div>;
};

export default ProjectGridRow;
