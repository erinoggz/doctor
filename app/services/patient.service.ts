/** @format */

import { GraphQLError } from "graphql";
import { Types } from "mongoose";
import config from "../config/config";
import { IError, ISuccess } from "../common/IResponse";
import Helpers from "../lib/helpers";
import Patient from "../model/patient.model";
import { IPatient } from "../common/Dto/IPatient";
import Question from "../model/question.model";

export class PatientService {
  constructor() {}

  public createPatient = async (body: IPatient): Promise<ISuccess | IError> => {
    try {
      await Patient.findOneAndUpdate(
        { email: body.email },
        { ...body },
        { upsert: true, new: true }
      );
      return Helpers.success(null, "Form submitted successfully!");
    } catch (error) {
      return Helpers.error(
        error?.message ||
          "Unable to Submit form. An Error Occured While Trying to Submit form"
      );
    }
  };

  public getPendingPatientQuestions = async (
    email: string
  ): Promise<ISuccess | IError> => {
    try {
      const patient = await Patient.findOne({ email });

      const questions = await Question.find({
        sicknessType: patient.sicknessType,
        _id: { $nin: patient.answeredQuestions },
      });

      return Helpers.success(questions, "Questions retrieved successfully!");
    } catch (error) {
      return Helpers.error(
        error?.message ||
          "Unable to fetch. An Error Occured While Trying to Retrieve Questions"
      );
    }
  };

  public getPatients = async () => {
    try {
      const patients = await Patient.find().sort({updatedAt: 'desc'});

      return Helpers.success(patients, "Patients retrieved successfully!");
    } catch (error) {
      return Helpers.error(
        error?.message ||
          "Unable to fetch. An Error Occured While Trying to Retrieve Questions"
      );
    }
  };
}
