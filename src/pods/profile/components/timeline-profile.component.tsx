import { TimeLineEntryVm } from "../time-line/time-line-entry.vm";

interface TimeLineProps{
    timeLine:TimeLineEntryVm[]
}

export function TimeLineProfile({timeLine}:TimeLineProps){

console.log("Timeline:\n", timeLine)
    
    return(
        <ul>
            {timeLine.map((timeLineEntry)=>{
                return <li>{timeLineEntry.title}</li>}
                
            )}
        </ul>
    )

}