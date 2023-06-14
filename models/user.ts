import {ObjectId} from "mongodb";

export default class User {
    constructor(
        public name: {
            familyName: string;
            givenName: string;
            middleName?: string;
        },
        public email: Array<string>,
        public googleId: string,
        public _id?
    ) {}
}