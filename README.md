# Serverless Email API

A serverless API for sending emails using AWS Lambda and Python.

## Features
- Send emails using SMTP (Gmail supported)
- Built with Serverless Framework and Python
- Easy deployment to AWS Lambda
- Local development support with serverless-offline
- RESTful API endpoint for sending emails

## Prerequisites

- Python 3.9+
- Node.js 16.x (for Serverless Framework)
- Serverless Framework (`npm install -g serverless`)
- AWS account with appropriate permissions (for deployment)
- Gmail account (for SMTP)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Shivarajkumar21/Serverless-API.git
   cd Serverless-API
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Install serverless-offline:
   ```bash
   npm install serverless-offline --save-dev
   ```

## Configuration

1. Create a `.env` file in the project root with your SMTP credentials:
   ```env
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-specific-password
   ```

2. Update `handler.py` with your Gmail credentials:
   ```python
   sender_email = "your-email@gmail.com"
   sender_password = "your-app-password"
   ```

> **Note**: For Gmail, you'll need to use an [App Password](https://support.google.com/accounts/answer/185833) if you have 2FA enabled.

## Local Development

1. Start the local server:
   ```bash
   serverless offline
   ```
   The API will be available at `http://localhost:4000`

2. Test the API using the following PowerShell command:
   ```powershell
   $body = @{ receiver_email = "recipient@example.com"; subject = "Test from Serverless"; body_text = "This is a test email from the serverless function." } | ConvertTo-Json; try { $response = Invoke-RestMethod -Uri "http://localhost:4000/dev/send-email" -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop; $statusCode = 200; $statusColor = "Green" } catch { $statusCode = $_.Exception.Response.StatusCode.value__; $statusColor = if ($statusCode -ge 400 -and $statusCode -lt 500) { "Yellow" } else { "Red" }; $response = $_.ErrorDetails.Message | ConvertFrom-Json -ErrorAction SilentlyContinue }; Write-Host "Status Code: " -NoNewline; Write-Host $statusCode -ForegroundColor $statusColor; if ($response) { Write-Host "Response: " -NoNewline; Write-Host ($response | ConvertTo-Json -Depth 10) -ForegroundColor "Cyan" }
   ```

## API Endpoint

### Send Email
- **URL**: `POST /send-email`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "receiver_email": "recipient@example.com",
    "subject": "Test Email",
    "body_text": "This is a test email"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Email sent successfully!"
  }
  ```

## Deployment

1. Deploy to AWS:
   ```bash
   serverless deploy
   ```

2. The deployed API endpoint will be displayed in the output.

## Project Structure

- `handler.py` - Contains the Lambda function code
- `serverless.yml` - Serverless framework configuration
- `requirements.txt` - Python dependencies
- `.gitignore` - Git ignore file
- `README.md` - This documentation file

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
