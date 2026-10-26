import { SectionHeader } from "../../../common-app/components";

interface Props {
  softSkills: string[];
}

export function ProfileSoftSkills({ softSkills }: Props) {
  if (softSkills.length === 0) return null;

  return (
    <section className="mt-12 md:mt-20">
      <SectionHeader number={3} name="Aptitudes" title="Cómo trabajo" />
      <ul className="flex flex-wrap gap-2">
        {softSkills.map((softSkill) => (
          <li
            key={softSkill}
            className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-small text-ink"
          >
            {softSkill}
          </li>
        ))}
      </ul>
    </section>
  );
}
