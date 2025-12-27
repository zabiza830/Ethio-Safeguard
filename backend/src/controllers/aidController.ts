import { Request, Response } from 'express';
import AidRequest from '../models/AidRequest';

export const createAidRequest = async (req: Request, res: Response) => {
  try {
    const { aidType, quantity, destination, urgency } = req.body;
    const sender = (req as any).userId;
    const aid = new AidRequest({ sender, aidType, quantity, destination, urgency });
    await aid.save();
    res.status(201).json(aid);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getSenderAidRequests = async (req: Request, res: Response) => {
  const sender = (req as any).userId;
  const list = await AidRequest.find({ sender }).populate('driver', 'name email driverDetails');
  res.json(list);
};

export const getAvailableForDriver = async (req: Request, res: Response) => {
  const list = await AidRequest.find({ status: 'pending' }).populate('sender', 'name email senderDetails');
  res.json(list);
};

export const updateAidStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, driverId } = req.body;
  const aid = await AidRequest.findById(id);
  if (!aid) return res.status(404).json({ message: 'Aid request not found' });
  if (driverId) aid.driver = driverId;
  aid.status = status;
  await aid.save();
  res.json(aid);
};
