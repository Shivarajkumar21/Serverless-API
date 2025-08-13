# Serverless Email API

A serverless API for sending emails using AWS Lambda and Node.js.

## Features
- Send emails using SMTP (Gmail supported)
- Built with Serverless Framework
- Easy deployment to AWS Lambda
- Local development support with serverless-offline

## Prerequisites

- Node.js 18.x
- Serverless Framework (`npm install -g serverless`)
- AWS account with appropriate permissions
- Gmail account (or other SMTP service credentials)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Shivarajkumar21/serverless.git
   cd serverless/email-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the project root with your SMTP credentials:

```env
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
```

> **Note**: For Gmail, you'll need to use an [App Password](https://support.google.com/accounts/answer/185833) if you have 2FA enabled.

## Local Development

Start the local server:
```bash
serverless offline
```

The API will be available at `http://localhost:3000`

## Deployment

Deploy to AWS:
```bash
serverless deploy
```

## API Endpoint

### Send Email

**URL**: `POST /send-email`

**Request Body**:
```json
{
  "to": "recipient@example.com",
  "subject": "Test Email",
  "text": "This is a test email",
  "html": "<p>This is a test email</p>"
}
```

**Response**:
```json
{
  "message": "Email sent successfully"
}
```

## License

MIT
