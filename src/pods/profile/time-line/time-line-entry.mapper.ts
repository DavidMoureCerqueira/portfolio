import { mapperTechnologyApiToSkillsVmArray } from "../technology/technology.mapper";
import { TimelineEntryApi } from "./api/api.model";
import { TimeLineEntryVm } from "./time-line-entry.vm";

export function mapperTimeLineEntryApiToTimeLineEntryVm(timeLineEntry:TimelineEntryApi):TimeLineEntryVm{
    return{
        id:timeLineEntry.id,
language:timeLineEntry.language,
title:timeLineEntry.title,
organization:timeLineEntry.organization,
type:timeLineEntry.type,
isTech:timeLineEntry.isTech,
startDate:timeLineEntry.startDate,
endDate:timeLineEntry.endDate,
location:timeLineEntry.location,
summary:timeLineEntry.summary,
technologies:mapperTechnologyApiToSkillsVmArray(timeLineEntry.technologies??[]),
content:timeLineEntry.content,
    }
    
}

export function mapperTimeLineEntriesApiToTimeLineEntriesVmArray(timeLineEntries:TimelineEntryApi[]):TimeLineEntryVm[]{
    return timeLineEntries.map(mapperTimeLineEntryApiToTimeLineEntryVm)
}