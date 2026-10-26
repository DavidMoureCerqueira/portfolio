import { TimeLineProfile } from "./components/timeline-profile.component";
import { ProfileComponent } from "./profile.component";
import { ProfileVm } from "./profile.vm";
import { TimeLineEntryVm } from "./time-line/time-line-entry.vm";

interface ProfileContainerProps {
  profile: ProfileVm;
  timeLine: TimeLineEntryVm[];
}

export function ProfileContainer({ profile, timeLine }: ProfileContainerProps) {
  return (
    <>
      <ProfileComponent profile={profile} />
      <TimeLineProfile timeLine={timeLine} />
    </>
  );
}
