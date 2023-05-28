import { Schema, model } from 'mongoose';
import { INotification } from './interface/INotification';

// Create the notification schema
const NotificationSchema = new Schema<INotification>(
  {
    recipient: {
      type: String
    },
    body: String,
    title: String,
    question: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    readAt: Date,
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export notification model
export const NotificationModel = model<INotification>(
  'Notification',
  NotificationSchema
);
