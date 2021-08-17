import { contactInfo } from "./contactInfo";

export interface userPass
{
    firstNme:string;
    lastName:string;
    username:string;
    password:string;
    contactInfo:Array<contactInfo>;
}