import mongoose, { Schema, Document, Types } from 'mongoose';

export interface INotification extends Document {
  user: Types.ObjectId;
  title: string;
  message: string;
  read: boolean;
}

const NotificationSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<INotification>('Notification', NotificationSchema);
