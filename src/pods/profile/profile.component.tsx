import { ProfileAbout } from "./components/profile-about.component";
import { ProfileHero } from "./components/profile-hero.component";
import { ProfileSoftSkills } from "./components/profile-soft-skills.component";
import { ProfileStack } from "./components/profile-stack.component";
import type { ProfileVm } from "./profile.vm";

interface Props {
  profile: ProfileVm;
}

export function ProfileComponent({ profile }: Props) {
  return (
    <div>
      <ProfileHero profile={profile} />
      <ProfileAbout profile={profile} />
      <ProfileStack skills={profile.skills} />
      <ProfileSoftSkills softSkills={profile.softSkills} />
    </div>
  );
}
