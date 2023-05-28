import di from './service-locator';

//Services
import { PatientService } from '../services/patient.service';
import { QuestionService } from '../services/question.service';
import { NotificationService } from '../services/notification.service';

//patient
di.register('patient', () => {
  return new PatientService();
});

//question
di.register('question', () => {
  return new QuestionService();
});

//notification
di.register('notification', () => {
  return new NotificationService();
});

export default di;
