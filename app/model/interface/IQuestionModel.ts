/** @format */

import { Document, Types } from "mongoose";

export interface IQuestionModel extends Document {
  _id: Types.ObjectId;
  question: string;
  figure: string;
  unit: string;
  sicknessType: "malaria" | "cancer";
  timeInterval: string;
  type: "text" | "multipleChoice";
  choices: Array<object>;
}
