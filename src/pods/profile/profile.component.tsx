import { ProfileImage } from "./components/profile-image.component";
import type { ProfileVm } from "./profile.vm";

interface Props {
  profile: ProfileVm;
}

 export function ProfileComponent({ profile }: Props) {
   return (
    <div >
      <ProfileImage src={profile.avatarUrl} alt={profile.name} />
      <h1 className="text-display-xl text-ink">{profile.name}</h1>
      <p className="text-cota text-cota-text">{profile.role}</p>
      <p className="text-lead text-ink-muted">{profile.headline}</p>
    </div>
   ); }
