import { IPatient } from '../../common/Dto/IPatient';
import di from '../../config/di';
import { PatientService } from '../../services/patient.service';

const patientService: PatientService = di.get('patient');

const patientResolver = {
  Query: {
    getPatients(_, __) {
      return patientService.getPatients();
    },
    getPendingPatientQuestions(_, {email}) {
      return patientService.getPendingPatientQuestions(email);
    },
  },
  Mutation: {
    createPatient(_, { patientInput: args }) {
      const body: IPatient = {
        ...args,
      };
      return patientService.createPatient(body);
    },
  },
};

export default patientResolver;
