import { TechnologyVm } from "../technology/technology.vm";
import { TimelineType } from "./api/api.model";

export interface TimeLineEntryVm{
    id:string;
    language:string;
    title:string;
    organization:string;
    type:TimelineType
    isTech:boolean;
    startDate:string;
    endDate?:string;
    location?:string;
    summary:string;
    technologies: TechnologyVm[]; // Stores the ID of the related entity
    content?: string;
}