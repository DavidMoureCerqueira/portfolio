import { TechnologyApi } from "./api/api.model";
import { TechnologyVm } from "./technology.vm";

export function mapperTechnologyApiToTechnologyVm(
  skill: TechnologyApi,
): TechnologyVm {
  return {
    id: skill.id,
    name: skill.name,
    category: skill.category,
    icon: skill.icon,
    website: skill.website,
  };
}

export function mapperTechnologyApiToTechnologyVmArray(
  skills: TechnologyApi[],
): TechnologyVm[] {
  return skills.map(mapperTechnologyApiToTechnologyVm);
}
