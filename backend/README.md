# Circulora Backend

## Requirements

- Node.js and npm
- A MongoDB connection string

## Setup

From the repository root, run:

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Set `MONGODB_URI` and `JWT_SECRET` in `backend/.env`. `PORT` is optional and
defaults to `5000`.

Start the API with:

```powershell
npm start
```

The API starts after connecting to MongoDB. Check that it is available at
`http://localhost:5000/api/health`.

## Chatbot API

The chatbot endpoints are mounted under `/api/chatbot`. See the repository's
[`test-chatbot.md`](../test-chatbot.md) for request examples and manual checks.
