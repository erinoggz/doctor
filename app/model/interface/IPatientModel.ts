/** @format */

import { Document, Types } from "mongoose";

export interface IPatientModel extends Document {
  _id: Types.ObjectId;
  patientName: string;
  email: string;
  sicknessType: "malaria" | "cancer";
  answeredAllQuestions: boolean,
  answeredQuestions: Array<string>
}
