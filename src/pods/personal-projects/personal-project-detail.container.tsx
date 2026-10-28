import {
  Breadcrumb,
  Card,
  Cover,
  FactsBand,
  MarkdownContent,
  PrevNextNav,
  splitContentSections,
} from "../../common-app/components";
import { CarDetailHeader } from "./car-detail/car-detail-header";
import { CarGoals } from "./car-detail/car-goals";
import { ModificationsSection } from "./car-detail/modifications-section";
import { ModificationsProgress } from "./components/modifications-progress";
import type { CarProjectDetailVm } from "./personal-project.vm";

interface Props {
  car: CarProjectDetailVm;
}

export function CarDetailContainer({ car }: Props) {
  // Las modificaciones siguen la numeración de las secciones de la historia
  const { sections } = splitContentSections(car.content);

  return (
    <article className="flex flex-col gap-10 md:gap-14">
      <div className="flex flex-col gap-8">
        <Breadcrumb
          backTo="/personal-projects"
          backLabel="Proyectos personales"
          path={`personal-projects / ${car.slug}`}
        />
        <CarDetailHeader car={car} />
      </div>
      <FactsBand label="Ficha del coche" facts={car.facts} columns={5}>
        <div className="grid gap-8 md:grid-cols-2">
          <CarGoals goals={car.goals} />
          <div className="flex flex-col gap-3">
            <p className="text-label text-ink-muted">Estado del proyecto</p>
            <ModificationsProgress
              progress={car.progress}
              label={car.progressLabel}
            />
          </div>
        </div>
      </FactsBand>
      <Card tone="accent" className="p-3">
        <Cover
          cover={car.cover}
          loading="eager"
          className="h-[220px] rounded-md md:h-[480px]"
        />
      </Card>
      <MarkdownContent content={car.content} tone="accent" />
      <ModificationsSection
        number={sections.length + 1}
        modifications={car.modifications}
        progress={car.progress}
      />
      <PrevNextNav
        label="Otros coches"
        to="/personal-projects/$slug"
        prev={car.prev}
        next={car.next}
        tone="accent"
      />
    </article>
  );
}
