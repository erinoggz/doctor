/** @format */

import { model, Schema } from "mongoose";
import { IAnswerModel } from "./interface/IAnswerModel";

// Create the answer schema
const AnswerSchema = new Schema<IAnswerModel>(
  {
    question: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    answer: {
      type: String,
      required: true,
    },
    patient: {
      type: String,
      required: true,
    },
    file: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

// Create and export answer model
const Answer = model<IAnswerModel>("Answer", AnswerSchema);

export default Answer;
