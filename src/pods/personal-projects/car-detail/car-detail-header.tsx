import { AccentStripe, StatusBadge } from "../../../common-app/components";
import { CarSpec } from "../components/car-spec";
import type { CarProjectDetailVm } from "../personal-project.vm";

interface Props {
  car: CarProjectDetailVm;
}

export function CarDetailHeader({ car }: Props) {
  return (
    <header className="flex max-w-205 flex-col">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <StatusBadge status={car.status} />
        <CarSpec spec={car.spec} />
      </div>
      <h1 className="mt-4 text-display-l text-ink md:text-[52px]">
        {car.title}
      </h1>
      <AccentStripe size="lg" className="mt-4" />
      <p className="mt-4 text-lead text-ink-muted">{car.summary}</p>
    </header>
  );
}
