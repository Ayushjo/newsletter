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

    console.log(`✅ Confirmation Email sent: ${data?.id}`);
    return { success: true, emailId: data?.id };
  } catch (error: any) {
    console.error("❌ Failed to send confirmation email:", error);
    throw new Error(`Failed to send confirmation email: ${error.message}`);
  }
}

export async function sendWelcomeEmail(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Your Newsletter <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Our Newsletter! 🚀",
      html: generateWelcomeEmailHTML(email),
    });

    if (error) {
      console.error("❌ Resend Error:", error);
      throw new Error(error.message);
    }

    console.log(`✅ Welcome Email sent: ${data?.id}`);
    return { success: true, emailId: data?.id };
  } catch (error: any) {
    console.error("❌ Failed to send welcome email:", error);
    throw new Error(`Failed to send welcome email: ${error.message}`);
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style="margin: 0; padding: 0;">
        <div style="background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; padding: 40px 0;">
          <div style="background-color: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); padding: 40px 0; text-align: center;">
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 800; margin: 0; letter-spacing: -0.025em;">Almost There! 📬</h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px;">
              <h2 style="color: #111827; font-size: 24px; font-weight: 700; margin-bottom: 24px; line-height: 1.3;">Confirm Your Subscription</h2>
              
              <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">Hi there,</p>
              
              <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                Thanks for signing up for our newsletter with <strong>${email}</strong>. 
                We're excited to have you on board!
              </p>
              
              <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                Please verify your email address to complete your subscription and start receiving updates.
              </p>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="${confirmationUrl}" style="background-color: #4F46E5; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
                  Verify Email Address
                </a>
              </div>
              
              <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                Or copy and paste this link into your browser:
                <br>
                <a href="${confirmationUrl}" style="color: #4F46E5; text-decoration: underline;">${confirmationUrl}</a>
              </p>
              
              <hr style="border-top: 1px solid #E5E7EB; margin: 32px 0;">
              
              <p style="color: #9CA3AF; font-size: 14px; margin: 0;">
                If you didn't request this, you can safely ignore this email.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #F9FAFB; padding: 24px; text-align: center; border-top: 1px solid #E5E7EB;">
              <p style="color: #6B7280; font-size: 12px; line-height: 1.5; margin: 0;">
                &copy; ${new Date().getFullYear()} Newsletter. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateWelcomeEmailHTML(email: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style="margin: 0; padding: 0;">
        <div style="background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; padding: 40px 0;">
          <div style="background-color: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); padding: 40px 0; text-align: center;">
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 800; margin: 0; letter-spacing: -0.025em;">Welcome Aboard! 🚀</h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px;">
              <h2 style="color: #111827; font-size: 24px; font-weight: 700; margin-bottom: 24px; line-height: 1.3;">You're In!</h2>
              
              <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">Hi there,</p>
              
              <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                Thank you for confirming your subscription. We're thrilled to have you join our community of readers.
              </p>
              
              <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                From now on, you'll be the first to know about our latest news, updates, and exclusive content delivered right to <strong>${email}</strong>.
              </p>
              
              <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                Stay tuned for our next issue!
              </p>
              
              <hr style="border-top: 1px solid #E5E7EB; margin: 32px 0;">
              
              <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                In the meantime, feel free to reply to this email if you have any questions or just want to say hi.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #F9FAFB; padding: 24px; text-align: center; border-top: 1px solid #E5E7EB;">
              <p style="color: #6B7280; font-size: 12px; line-height: 1.5; margin: 0;">
                You received this email because you subscribed to our newsletter.
                <br>
                <a href="#" style="color: #4F46E5; text-decoration: underline;">Unsubscribe</a>
              </p>
              <br>
              <p style="color: #6B7280; font-size: 12px; line-height: 1.5; margin: 0;">
                &copy; ${new Date().getFullYear()} Newsletter. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}
