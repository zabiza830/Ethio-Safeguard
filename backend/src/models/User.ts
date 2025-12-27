import mongoose, { Schema, Document } from 'mongoose';

export interface IDriverDetails {
  licenseNumber?: string;
  truckPlate?: string;
  currentLocation?: { lat: number; lng: number } | null;
  available?: boolean;
}

export interface ISenderDetails {
  organization?: string;
  contactNumber?: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'driver' | 'sender' | 'user';
  registrationStatus: 'pending' | 'approved' | 'rejected';
  driverDetails?: IDriverDetails;
  senderDetails?: ISenderDetails;
}

const DriverSchema: Schema = new Schema({
  licenseNumber: { type: String },
  truckPlate: { type: String },
  currentLocation: { lat: Number, lng: Number },
  available: { type: Boolean, default: false }
});

const SenderSchema: Schema = new Schema({
  organization: { type: String },
  contactNumber: { type: String }
});

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'driver', 'sender', 'user'], default: 'user' },
  registrationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  driverDetails: { type: DriverSchema, default: {} },
  senderDetails: { type: SenderSchema, default: {} }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
