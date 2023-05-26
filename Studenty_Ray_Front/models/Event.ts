import { Image } from "./Image";

export class Event {
  _id: any;
  titre: String;
  description: String;
  image: string;
  user: any;
  date: Date = new Date;
  like: number;
  commentaires: any[];
  nombreCommentaire: number;
  category: String;
  location: String;

  constructor() { }
}

