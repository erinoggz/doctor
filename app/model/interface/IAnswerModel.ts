/** @format */

import { Document, Types } from "mongoose";

export interface IAnswerModel extends Document {
  _id: Types.ObjectId;
  question: Types.ObjectId;
  answer: string;
  patient: string;
  file: string;
}
