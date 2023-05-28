/** @format */

import { IError, ISuccess } from "../common/IResponse";
import Helpers from "../lib/helpers";
import Question from "../model/question.model";
import { IAnswer, IQuestion } from "../common/Dto/IQuestion";
import Answer from "../model/answer.model";
import Patient from "../model/patient.model";
import { Types } from "mongoose";
import { IQuestionModel } from "app/model/interface/IQuestionModel";

export class QuestionService {
  constructor() {}

  public createQuestion = async (
    body: IQuestion
  ): Promise<ISuccess | IError> => {
    try {
      await Question.create({
        ...body,
      });

      return Helpers.success(null, "Question added successfully!");
    } catch (error) {
      return Helpers.error(
        error?.message ||
          "Unable to Add Question. An Error Occured While Trying to Add Question"
      );
    }
  };

  public answerQuestion = async (body: IAnswer): Promise<ISuccess | IError> => {
    try {
      await Answer.findOneAndUpdate(
        { patient: body.patientEmail, question: body.questionId },
        { ...body },
        { upsert: true, new: true }
      );

      await Patient.findOneAndUpdate(
        { email: body.patientEmail },
        {
          $addToSet: { answeredQuestions: new Types.ObjectId(body.questionId) },
        },
        { upsert: true, new: true }
      );

      return Helpers.success(null, "Question answered successfully!");
    } catch (error) {
      return Helpers.error(
        error?.message ||
          "Unable to Answer Question. An Error Occured While Trying to Answer Question"
      );
    }
  };

  public getPatientAnswers = async (patientEmail: string) => {
    try {
      const patients = await Answer.find({ patient: patientEmail })
        .populate("question")
        .sort({ updatedAt: "desc" });

      return Helpers.success(
        patients,
        "Patient answer retrieved successfully!"
      );
    } catch (error) {
      return Helpers.error(
        error?.message ||
          "Unable to fetch. An Error Occured While Trying to Retrieve Answers"
      );
    }
  };

  public getQuestions = async () => {
    try {
      const questions = await Question.find().sort({ updatedAt: "desc" });
      return Helpers.success(questions, "Questions retrieved successfully!");
    } catch (error) {
      return Helpers.error(
        error?.message ||
          "Unable to fetch. An Error Occured While Trying to Retrieve Questions"
      );
    }
  };

  public editQuestions = async (body: IQuestionModel) => {
    try {
      const questionData = {};
      const validateData = [
        "question",
        "sicknessType",
        "unit",
        "figure",
        "type",
        "choices",
      ];

      // Makes only data in validateData that can be updated
      Object.entries(body).forEach(([key, value]) => {
        if (validateData.includes(key)) questionData[key] = value;
      });

      await Question.findByIdAndUpdate(body.id, { $set: questionData });
      return Helpers.success(null, "Questions edited successfully!");
    } catch (error) {
      return Helpers.error(
        error?.message ||
          "Unable to Edit. An Error Occured While Trying to Edit Questions"
      );
    }
  };
  
}
