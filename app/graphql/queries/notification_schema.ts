const notification_schema = `#graphql
  type Query {
    getNotifications(email: String!): NotificationsResponse
  }

  type NotificationsResponse {
    status: String
    data: [NotificationsData]
    message: String
  }

  type NotificationsData {
    _id: String
    recipient: String
    body: String
    title: String
    read: Boolean
    question: GetQuestionData
  }
`;

export default notification_schema;
