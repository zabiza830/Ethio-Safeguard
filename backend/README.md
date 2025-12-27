# Ethio-Safeguard Backend

This directory contains a simple TypeScript Node.js backend using Express, Mongoose and Socket.IO.

Quick start:

1. cd backend
2. cp .env.example .env and fill values
3. npm install
4. npm run dev

APIs:
- POST /api/auth/register { name, email, password, role }
- POST /api/auth/login { email, password }
- GET /api/users/registrations (admin) - requires Authorization: Bearer <token>
- PATCH /api/users/registrations/:id { status }
- POST /api/aid (sender) - create aid request
- GET /api/aid/sender - get sender requests
- GET /api/aid/available - list pending for drivers
- PATCH /api/aid/:id/status { status, driverId }

Socket.IO events:
- truck:register { id, lat, lng, available, plate }
- truck:location { id, lat, lng }
- truck:available { id, available }
- servers broadcast: trucks:list, trucks:locations

Frontend integration notes:
- Replace localStorage auth state with storing JWT in memory or a secure cookie. When logged in, store token and send in `Authorization: Bearer <token>` header.
- Use Socket.IO client to connect to backend and listen to `trucks:list` and `trucks:locations` events.
- Install Leaflet and react-leaflet in frontend and render map in the sender dashboard. Use `trucks:locations` updates to move markers.

Pre-commit / testing checklist:
- Run TypeScript compiler: `npm run build`
- Run lint/tests if any
- Manual smoke test: register/login, create aid, simulate driver location event


End of file
