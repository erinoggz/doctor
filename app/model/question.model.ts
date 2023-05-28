/** @format */

import { model, Schema } from "mongoose";
import { IQuestionModel } from "./interface/IQuestionModel";

// Create the question schema
const QuestionSchema = new Schema<IQuestionModel>(
  {
    question: {
      type: String,
      required: true,
    },
    figure: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    sicknessType: {
      type: String,
      enum: Object.values(["malaria", "cancer"]).concat([null]),
    },
    type: {
      type: String,
      enum: ["text", "multipleChoice"],
      required: true,
    },
    choices: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create and export question model
const Question = model<IQuestionModel>("Question", QuestionSchema);

export default Question;
