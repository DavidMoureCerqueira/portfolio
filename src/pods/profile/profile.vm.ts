import { TechnologyVm } from "../../common-app/technology/technology.vm";

export interface SkillGroupVm {
  label: string;
  skills: TechnologyVm[];
}

export interface ProfileVm {
  name: string;
  role: string;
  headline: string;
  avatarUrl: string;
  location: string;
  availability?: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  cvUrl?: string;
  content: string;
  skillGroups: SkillGroupVm[];
  softSkills: string[];
  interest: string[];
  languages: string[];
}
