import notificationResolver from "./notification.resolvers";
import patientResolver from "./patient.resolver";
import questionResolver from "./question.resolver";


const resolvers = {
  Query: {
    ...patientResolver.Query,
    ...questionResolver.Query,
    ...notificationResolver.Query,
  },
  Mutation: {
    ...patientResolver.Mutation,
    ...questionResolver.Mutation,
  },
};

export default resolvers;
