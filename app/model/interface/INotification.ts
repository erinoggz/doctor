import { Document, Types } from 'mongoose';

export interface INotification extends Document {
  _id: Types.ObjectId;
  recipient: string;
  question: Types.ObjectId;
  body: string;
  title: string;
  readAt: Date;
  read: boolean;
}
