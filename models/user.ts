import {ObjectId} from "mongodb";

export default class User {
    constructor(
        public username: string,
        public email: Array<string>,
        public googleId: string,
        public _id?
    ) {}
}