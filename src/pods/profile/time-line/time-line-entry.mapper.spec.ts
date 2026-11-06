import type { TimelineEntryApi } from "./api/api.model";
import { mapperTimeLineEntriesApiToTimeLineEntriesVmArray } from "./time-line-entry.mapper";

const buildTimelineEntryApi = (
  overrides: Partial<TimelineEntryApi> = {},
): TimelineEntryApi => ({
  id: "entry",
  language: "es",
  lastUpdate: "2026-11-01T00:00:00.000Z",
  title: "Desarrollador Full Stack",
  organization: "DEUS",
  type: "practicas",
  isTech: true,
  startDate: "2026-03-01",
  summary: "Novus",
  ...overrides,
});

describe("mapperTimeLineEntriesApiToTimeLineEntriesVmArray", () => {
  it("should sort from the most recent stage to the oldest", () => {
    const entries = [
      buildTimelineEntryApi({ id: "automocion", startDate: "2016-09-01" }),
      buildTimelineEntryApi({ id: "deus", startDate: "2026-03-01" }),
      buildTimelineEntryApi({ id: "daw", startDate: "2024-09-01" }),
    ];

    const result = mapperTimeLineEntriesApiToTimeLineEntriesVmArray(entries);

    expect(result.map((entry) => entry.id)).toEqual([
      "deus",
      "daw",
      "automocion",
    ]);
  });

  it("should return an empty list of technologies when the entry has none", () => {
    const entries = [buildTimelineEntryApi({ technologies: undefined })];

    const [result] = mapperTimeLineEntriesApiToTimeLineEntriesVmArray(entries);

    expect(result.technologies).toEqual([]);
  });
});
