import { ProfileImage } from "./components/profile-image.component";
import type { ProfileVm } from "./profile.vm";

interface Props {
  profile: ProfileVm;
}

 export function ProfileComponent({ profile }: Props) {
   return (
    <div >
      <ProfileImage src={profile.avatarUrl} alt={profile.name} />
      <h1>{profile.name}</h1>
      <p>{profile.role}</p>
      <p>{profile.headline}</p>
    </div>
   ); }
