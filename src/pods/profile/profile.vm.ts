import { TechnologyVm } from "./technology/technology.vm";

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
  skills: TechnologyVm[];
  softSkills: string[];
  interest: string[];
  languages: string[];
}
