import { Request, Response } from 'express';
import User from '../models/User';

export const listRegistrationRequests = async (req: Request, res: Response) => {
  const requests = await User.find({ registrationStatus: 'pending' }).select('-password');
  res.json(requests);
};

export const updateRegistrationStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body; // approved | rejected
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.registrationStatus = status;
  await user.save();
  res.json({ message: 'Status updated', user });
};
