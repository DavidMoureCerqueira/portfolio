import { ProfileApi } from "./api/api.model";
import { ProfileVm } from "./profile.vm";
import { mapperTechnologyApiToTechnologyVmArray } from "./technology/technology.mapper";

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
    skills: mapperTechnologyApiToTechnologyVmArray(profile.skills),
  };
}
