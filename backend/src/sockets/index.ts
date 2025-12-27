import { Server as IOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';

interface TruckInfo { id: string; lat: number; lng: number; available: boolean; plate?: string }

const trucks = new Map<string, TruckInfo>();

export const initSockets = (server: HTTPServer) => {
  const io = new IOServer(server, {
    cors: { origin: process.env.CLIENT_URL || '*' }
  });

  io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on('truck:register', (payload: TruckInfo) => {
      trucks.set(payload.id, payload);
      io.emit('trucks:list', Array.from(trucks.values()));
    });

    socket.on('truck:location', (payload: TruckInfo) => {
      trucks.set(payload.id, payload);
      io.emit('trucks:locations', Array.from(trucks.values()));
    });

    socket.on('truck:available', (payload: { id: string; available: boolean }) => {
      const t = trucks.get(payload.id);
      if (t) {
        t.available = payload.available;
        trucks.set(payload.id, t);
      }
      io.emit('trucks:list', Array.from(trucks.values()));
    });

    socket.on('disconnect', () => {
      // optional: remove or mark unavailable
      console.log('socket disconnected', socket.id);
    });
  });

  return io;
};
