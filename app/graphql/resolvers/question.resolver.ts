import { IAnswer, IQuestion } from '../../common/Dto/IQuestion';
import di from '../../config/di';
import { QuestionService } from '../../services/question.service';

const questionService: QuestionService = di.get('question');

const questionResolver = {
  Query: {
    getQuestions(_, __) {
      return questionService.getQuestions();
    },
    getPatientAnswers(_, {patientEmail}) {
      return questionService.getPatientAnswers(patientEmail);
    },
  },
  Mutation: {
    createQuestion(_, { questionInput: args }) {
      const body: IQuestion = {
        ...args,
      };
      return questionService.createQuestion(body);
    },

    answerQuestion(_, { answerInput:args }) {
      const body: IAnswer = {
        ...args,
      };
      return questionService.answerQuestion(body);
    },

    editQuestion(_, { editQuestionInput:args }) {
      const body = {
        ...args,
      };
      return questionService.editQuestions(body);
    },
  },
};

export default questionResolver;
