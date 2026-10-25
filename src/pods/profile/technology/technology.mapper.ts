import { TechnologyApi } from "./api/api.model";
import { TechnologyVm } from "./technology.vm";

export function mapperTechnologyApiToSkillsVm(skill:TechnologyApi):TechnologyVm{
return{
    id:skill.id,
    name:skill.name,
    category:skill.category,
    icon:skill.icon,
    website:skill.website
}
}

export function mapperTechnologyApiToSkillsVmArray(skills:TechnologyApi[]):TechnologyVm[]{
    return skills.map(mapperTechnologyApiToSkillsVm)
}