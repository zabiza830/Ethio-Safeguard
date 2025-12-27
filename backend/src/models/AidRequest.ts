import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IAidRequest extends Document {
  sender: Types.ObjectId;
  driver?: Types.ObjectId | null;
  aidType: string;
  quantity: number;
  destination: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'assigned' | 'enroute' | 'delivered' | 'cancelled';
}

const AidRequestSchema: Schema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  driver: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  aidType: { type: String, required: true },
  quantity: { type: Number, required: true },
  destination: { type: String, required: true },
  urgency: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['pending', 'assigned', 'enroute', 'delivered', 'cancelled'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model<IAidRequest>('AidRequest', AidRequestSchema);
