import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(email: string, token: string) {
  try {
    const confirmationUrl = `${
      process.env.FRONTEND_URL
    }/confirm?token=${token}&email=${encodeURIComponent(email)}`;

    const { data, error } = await resend.emails.send({
      from: "Your Newsletter <onboarding@resend.dev>",
      to: email,
      subject: "Confirm Your Newsletter Subscription",
      html: generateConfirmationEmailHTML(email, confirmationUrl),
    });

    if (error) {
      console.error("❌ Resend Error:", error);
      throw new Error(error.message);
    }

    console.log(`✅ Email sent: ${data?.id}`);
    return { success: true, emailId: data?.id };
  } catch (error: any) {
    console.error("❌ Failed to send email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

function generateConfirmationEmailHTML(
  email: string,
  confirmationUrl: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirm Your Subscription</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f9fc; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
                    Welcome! 🎉
                  </h1>
                </td>
              </tr>
              
              <!-- Body -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">
                    Confirm Your Newsletter Subscription
                  </h2>
                  
                  <p style="color: #4a5568; font-size: 16px; line-height: 24px; margin: 0 0 16px 0;">
                    Hi there! 👋
                  </p>
                  
                  <p style="color: #4a5568; font-size: 16px; line-height: 24px; margin: 0 0 16px 0;">
                    Thank you for subscribing to our newsletter with <strong>${email}</strong>.
                  </p>
                  
                  <p style="color: #4a5568; font-size: 16px; line-height: 24px; margin: 0 0 32px 0;">
                    Please confirm your subscription by clicking the button below:
                  </p>
                  
                  <!-- Button -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="padding: 0 0 32px 0;">
                        <a href="${confirmationUrl}" 
                           style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                  color: #ffffff;
                                  text-decoration: none;
                                  padding: 16px 40px;
                                  border-radius: 6px;
                                  font-size: 16px;
                                  font-weight: 600;
                                  display: inline-block;">
                          Confirm Subscription
                        </a>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="color: #718096; font-size: 14px; line-height: 20px; margin: 0 0 8px 0;">
                    If the button doesn't work, copy and paste this link into your browser:
                  </p>
                  
                  <p style="color: #667eea; font-size: 14px; line-height: 20px; margin: 0 0 32px 0; word-break: break-all;">
                    ${confirmationUrl}
                  </p>
                  
                  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
                  
                  <p style="color: #a0aec0; font-size: 13px; line-height: 20px; margin: 0;">
                    If you didn't subscribe to this newsletter, you can safely ignore this email.
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f7fafc; padding: 24px 30px; text-align: center;">
                  <p style="color: #a0aec0; font-size: 12px; margin: 0;">
                    © 2026 Your Newsletter. All rights reserved.
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
