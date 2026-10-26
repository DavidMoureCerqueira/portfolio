import { SectionHeader } from "../../../common-app/components";
import { TimeLineEntryVm } from "../time-line/time-line-entry.vm";
import { TimeLineItem } from "./timeline-item.component";

interface TimeLineProps {
  timeLine: TimeLineEntryVm[];
}

export function TimeLineProfile({ timeLine }: TimeLineProps) {
  console.log("Timeline:\n", timeLine);

  return (
    <section className="mt-12 md:mt-20">
      <SectionHeader number={4} name="Trayectoria" title="Mi recorrido" />
      <ol>
        {timeLine.map((timeLineEntry, index) => (
          <TimeLineItem
            key={timeLineEntry.id}
            entry={timeLineEntry}
            index={index}
          />
        ))}
      </ol>
    </section>
  );
}
