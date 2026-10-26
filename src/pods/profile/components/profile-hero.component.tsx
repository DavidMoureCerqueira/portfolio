import { Download, Mail } from "lucide-react";
import { Button } from "../../../common-app/components";
import type { ProfileVm } from "../profile.vm";
import { ProfileImage } from "./profile-image.component";

interface Props {
  profile: ProfileVm;
}

export function ProfileHero({ profile }: Props) {
  return (
    <section className="bg-plano-grid rounded-lg border border-line p-6 md:p-12">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_auto]">
        <div className="animate-reveal">
          {profile.availability && (
            <p className="inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-1 text-cota text-success">
              <span className="size-2 animate-pulse-soft rounded-full bg-success" aria-hidden="true" />
              {profile.availability}
            </p>
          )}

          <p className="mt-6 text-cota text-cota-text">
            {profile.role}
            {profile.location && ` · ${profile.location}`}
          </p>
          <h1 className="mt-3 text-display-xl text-ink">{profile.name}</h1>
          <p className="mt-4 max-w-[40ch] text-lead text-ink-muted">{profile.headline}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {/* La única pieza amarilla de Home */}
            {profile.cvUrl && (
              <Button variant="destacado" href={profile.cvUrl} external icon={<Download />}>
                Descargar CV
              </Button>
            )}
            <Button variant="secundario" href={`mailto:${profile.email}`} icon={<Mail />}>
              Escríbeme
            </Button>
            <Button variant="secundario" href={profile.githubUrl} external arrow>
              GitHub
            </Button>
            <Button variant="secundario" href={profile.linkedinUrl} external arrow>
              LinkedIn
            </Button>
          </div>
        </div>

        <div className="mx-auto animate-reveal [animation-delay:60ms]">
          <ProfileImage src={profile.avatarUrl} alt={profile.name} />
        </div>
      </div>
    </section>
  );
}
