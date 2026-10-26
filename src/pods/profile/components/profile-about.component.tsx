import { Markdown, Marker, SectionHeader } from "../../../common-app/components";
import type { ProfileVm } from "../profile.vm";

interface Props {
  profile: ProfileVm;
}

interface FactProps {
  label: string;
  items: string[];
}

// Bloque de la ficha: si no hay datos, no se pinta
function Fact({ label, items }: FactProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <dt className="text-label text-ink-muted">{label}</dt>
      <dd>
        <ul className="mt-2 flex flex-col gap-1 text-small text-ink">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </dd>
    </div>
  );
}

export function ProfileAbout({ profile }: Props) {
  const hasFacts = profile.languages.length > 0 || profile.interest.length > 0;

  return (
    <section className="mt-12 md:mt-20">
      <SectionHeader
        number={1}
        name="Sobre mí"
        title={
          <>
            Del taller al <Marker>código</Marker>
          </>
        }
      />
      <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
        <Markdown className="max-w-[65ch]">{profile.content}</Markdown>

        {hasFacts && (
          <aside className="h-fit rounded-md border border-line bg-base-200 p-6">
            <dl className="flex flex-col gap-6">
              <Fact label="Idiomas" items={profile.languages} />
              <Fact label="Fuera del código" items={profile.interest} />
            </dl>
          </aside>
        )}
      </div>
    </section>
  );
}
