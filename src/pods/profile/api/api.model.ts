import type { Media } from "@content-island/api-client";
import { TechnologyApi } from "../../../common-app/technology/technology.api-model";

export interface ProfileApi {
  id: string;
  language: "es";
  lastUpdate: string;
  name: string;
  role: string;
  headline: string;
  avatar: Media;
  location: string;
  availability?: string;
  skills: TechnologyApi[];
  softSkills: string[];
  languages: string[];
  interests: string[];
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  cv?: Media;
  content: string;
}
