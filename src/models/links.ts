import { ObjectId } from "mongodb";

export default class Links {
  constructor(public url: string, public id: string) {}
}
