import { SectionHeader, TechIcon } from "../../../common-app/components";
import type { SkillGroupVm } from "../profile.vm";

interface Props {
  groups: SkillGroupVm[];
}

export function ProfileStack({ groups }: Props) {
  if (groups.length === 0) return null;

  return (
    <section className="mt-12 md:mt-20">
      <SectionHeader number={2} name="Stack" title="Con lo que trabajo" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group, index) => (
          <div
            key={group.label}
            className="animate-reveal"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <h3 className="text-label text-ink-muted">{group.label}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill.id}>
                  <a
                    href={skill.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-line bg-base-100 px-3 text-cota text-ink transition-colors duration-250 ease-plano hover:border-brand"
                  >
                    <TechIcon slug={skill.icon} />
                    {skill.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
