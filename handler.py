import json
import smtplib
from email.mime.text import MIMEText

def send_email(event, context):
    try:
        body = json.loads(event["body"])
        receiver_email = body.get("receiver_email")
        subject = body.get("subject")
        body_text = body.get("body_text")

        if not receiver_email or not subject or not body_text:
            return {
                "statusCode": 400,
                "body": json.dumps({"success": False, "error": "Missing required fields"})
            }

        # Gmail SMTP setup - Replace with your Gmail and App Password
        sender_email = "shivarajkumarbm21@gmail.com"
        sender_password = "ujza llyz zgoy cgud"  # Use Gmail App Password, not your regular password

        msg = MIMEText(body_text)
        msg["Subject"] = subject
        msg["From"] = f"Serverless API"
        msg["To"] = receiver_email

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.send_message(msg)

        return {
            "statusCode": 200,
            "body": json.dumps({"success": True, "message": "Email sent successfully!"})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"success": False, "error": str(e)})
        }
