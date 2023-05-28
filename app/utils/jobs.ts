/** @format */

import Question from "../model/question.model";
import cron from "node-cron";
import Patient from "../model/patient.model";
import { NotificationModel } from "../model/notification.model";
import { convertToCronExpression } from "./cronExpression";

(async () => {
  const questions = await Question.find().lean();
  for (let i = 0; i < questions.length; i++) {
    const cronExpression = convertToCronExpression(
      `${questions[i]?.figure} ${questions[i]?.unit}`
    );
    cron.schedule(cronExpression, async () => {
      console.log("cron is running", cronExpression);
      const patients = await Patient.find({
        sicknessType: questions[i].sicknessType,
        answeredQuestions: { $not: { $elemMatch: { $in: questions[i]._id } } },
      });

       for (let j = 0; j < patients.length; j++) {
        await NotificationModel.create([
          {
            recipient: patients[j].email,
            body: "Please answer your question immediately",
            title: "Important!!!",
            question: questions[i]._id,
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ]);
      }
    });
  }
})();
