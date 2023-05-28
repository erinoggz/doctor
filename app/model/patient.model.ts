/** @format */

import { model, Schema } from "mongoose";
import { IPatientModel } from "./interface/IPatientModel";

// Create the patient schema
const PatientSchema = new Schema<IPatientModel>(
  {
    patientName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    sicknessType: {
      type: String,
      enum: Object.values(["malaria", "cancer"]).concat([null]),
    },
    answeredAllQuestions: {
      type: Boolean,
      default: false,
    },
    answeredQuestions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create and export patient model
const Patient = model<IPatientModel>("Patient", PatientSchema);

export default Patient;
