# Chatbot Test Guide

The chatbot uses keyword-based intent matching and predefined responses. Its
sessions and messages are stored in MongoDB.

## Prerequisites

1. Configure and start the backend using [`backend/README.md`](backend/README.md).
2. Start the frontend in a second terminal:

   ```powershell
   cd frontend
   npm start
   ```

## API checks

Send a message with both required fields:

```bash
curl -X POST http://localhost:5000/api/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","sessionId":"manual-test-001"}'
```

The response should include `success`, `response`, `suggestions`, `intent`,
`confidence`, and `sessionId`. Reusing the same `sessionId` should continue
that session.

Retrieve the saved conversation:

```bash
curl http://localhost:5000/api/chatbot/history/manual-test-001
```

List saved sessions:

```bash
curl http://localhost:5000/api/chatbot/sessions
```

The chat endpoint returns HTTP 400 if `message` or `sessionId` is missing.

## Browser checks

Open the app at `http://localhost:3000`, open the floating chatbot button, and
try messages such as:

- `Hello` (greeting)
- `What services do you offer?` (services)
- `When is my collection day?` (collection)
- `I need technical support` (technical)
- `What products do you sell?` (products)

Check that a response and suggested follow-up options appear, and that
reopening a session retains its history.
