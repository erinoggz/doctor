const patient_schema = `#graphql
  type Query {
    getPatients: JSON
    getPendingPatientQuestions(email: String!): JSON
    getPatientAnswers(patientEmail: String!) : JSON
  }

  type Mutation {
    createPatient(patientInput: PatientInput!): Response
  }

  input PatientInput {
    patientName: String!
    sicknessType: SicknessType!
    email: String!
  }

  type Response {
    status: String
    message: String
  }
`;

export default patient_schema;
