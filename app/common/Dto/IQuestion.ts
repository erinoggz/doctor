/** @format */

export interface IQuestion {
  question: string;
  sicknessType: "malaria" | "cancer";
  figure: string;
  unit: string;
  type: "text" | "multipleChoice";
  choices: Array<object>;
}

export interface IAnswer {
  patientEmail: string;
  questionId: string;
  answer: string;
  file: string;
}
