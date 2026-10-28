import { CarProjectPreviewVm } from "./personal-project-preview/personal-project-preview.vm";
import { PersonalProjectsComponent } from "./personal-project.component";

interface PersonalProjectContainerProps {
  carProjects: CarProjectPreviewVm[];
}

export function PersonalProjectContainer({
  carProjects,
}: PersonalProjectContainerProps) {
  console.log(carProjects);

  return <PersonalProjectsComponent />;
}
