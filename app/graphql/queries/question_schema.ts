const question_schema = `#graphql
  type Query {
    getQuestions: GetQuestionResponse
  }

  enum SicknessType {
    malaria
    cancer
  }

  enum QusestionType {
    text
    multipleChoice
  }

  type Mutation {
    createQuestion(questionInput: QuestionInput!): Response
    answerQuestion(answerInput: AnswerInput!): Response
    editQuestion(editQuestionInput: EditQuestionInput!): Response
  }

  scalar JSON
  
  input AnswerInput {
    patientEmail: String!,
    questionId: String!,
    answer: String!,
    file: String
  }

  input QuestionInput {
    question: String!
    sicknessType: SicknessType!
    figure: String!
    unit: String!
    type: QusestionType!
    choices: JSON
  }

  input EditQuestionInput {
    id: String!
    question: String
    sicknessType: SicknessType
    figure: String
    unit: String
    type: QusestionType
    choices: JSON
  }

  type GetQuestionResponse {
    message: String
    data: [GetQuestionData]
    status: String
  }

  type GetQuestionData {
    _id: String
    question: String
    sicknessType: String
    figure: String!
    unit: String!
    type: String
    choices: JSON
    createdAt: String
    updatedAt: String
  }
`;

export default question_schema;
