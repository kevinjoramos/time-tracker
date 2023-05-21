import { ObjectId } from "mongodb";

export default class Timer {
    constructor(
        public user_id: ObjectId,
        public categoryName: string,
        public color: string,
        public hoursLogged: number,
        public minutesLogged: number,
        public isRunning: boolean,
        public timeToggled: Date,
        public _id?: ObjectId,
    ) {}
}