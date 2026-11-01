import { ProfileApi } from "./api/api.model";
import { ProfileVm, SkillGroupVm } from "./profile.vm";
import { mapperTechnologyApiToTechnologyVmArray } from "../../common-app/technology/technology.mapper";
import { TechnologyVm } from "../../common-app/technology/technology.vm";

// Grupos del bloque Stack y categorías de Technology que entran en cada uno
const skillGroups: { label: string; categories: string[] }[] = [
  { label: "Frontend", categories: ["frontend"] },
  { label: "Backend", categories: ["backend"] },
  { label: "Datos y despliegue", categories: ["database", "devops"] },
  { label: "Herramientas e IA", categories: ["testing", "tooling"] },
];

function groupSkills(skills: TechnologyVm[]): SkillGroupVm[] {
  return skillGroups
    .map(({ label, categories }) => ({
      label,
      skills: skills.filter((skill) => categories.includes(skill.category)),
    }))
    .filter((group) => group.skills.length > 0);
}

export function mapperProfileApiToProfileVm(profile: ProfileApi): ProfileVm {
  return {
    name: profile.name,
    availability: profile.availability,
    avatarUrl: profile.avatar.url,
    content: profile.content,
    email: profile.email,
    headline: profile.headline,
    interest: profile.interests,
    languages: profile.languages,
    location: profile.location,
    role: profile.role,
    softSkills: profile.softSkills,
    cvUrl: profile.cv?.url,
    githubUrl: profile.githubUrl,
    linkedinUrl: profile.linkedinUrl,
    skillGroups: groupSkills(
      mapperTechnologyApiToTechnologyVmArray(profile.skills),
    ),
  };
}
