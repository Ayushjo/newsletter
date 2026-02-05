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

// Shared styles for consistency
const styles = {
  container: `
    background-color: #f3f4f6;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    padding: 40px 0;
  `,
  wrapper: `
    background-color: #ffffff;
    max-width: 600px;
    margin: 0 auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  `,
  header: `
    background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
    padding: 40px 0;
    text-align: center;
  `,
  headerTitle: `
    color: #ffffff;
    font-size: 28px;
    font-weight: 800;
    margin: 0;
    letter-spacing: -0.025em;
  `,
  content: `
    padding: 40px 40px;
  `,
  heading: `
    color: #111827;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 24px;
    line-height: 1.3;
  `,
  text: `
    color: #4B5563;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 24px;
  `,
  buttonContainer: `
    text-align: center;
    margin: 32px 0;
  `,
  button: `
    background-color: #4F46E5;
    color: #ffffff;
    padding: 16px 32px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    display: inline-block;
    transition: background-color 0.2s;
  `,
  divider: `
    border-top: 1px solid #E5E7EB;
    margin: 32px 0;
  `,
  footer: `
    background-color: #F9FAFB;
    padding: 24px;
    text-align: center;
    border-top: 1px solid #E5E7EB;
  `,
  footerText: `
    color: #6B7280;
    font-size: 12px;
    line-height: 1.5;
  `,
  link: `
    color: #4F46E5;
    text-decoration: underline;
  `
};

function generateConfirmationEmailHTML(email: string, confirmationUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style="margin: 0; padding: 0;">
        <div style="${styles.container}">
          <div style="${styles.wrapper}">
            <!-- Header -->
            <div style="${styles.header}">
              <h1 style="${styles.headerTitle}">Almost There! 📬</h1>
            </div>
            
            <!-- Content -->
            <div style="${styles.content}">
              <h2 style="${styles.heading}">Confirm Your Subscription</h2>
              
              <p style="${styles.text}">Hi there,</p>
              
              <p style="${styles.text}">
                Thanks for signing up for our newsletter with <strong>${email}</strong>. 
                We're excited to have you on board!
              </p>
              
              <p style="${styles.text}">
                Please verify your email address to complete your subscription and start receiving updates.
              </p>
              
              <div style="${styles.buttonContainer}">
                <a href="${confirmationUrl}" style="${styles.button}">
                  Verify Email Address
                </a>
              </div>
              
              <p style="${styles.text}">
                Or copy and paste this link into your browser:
                <br>
                <a href="${confirmationUrl}" style="${styles.link}">${confirmationUrl}</a>
              </p>
              
              <hr style="${styles.divider}">
              
              <p style="color: #9CA3AF; font-size: 14px; margin: 0;">
                If you didn't request this, you can safely ignore this email.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="${styles.footer}">
              <p style="${styles.footerText}">
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
        <div style="${styles.container}">
          <div style="${styles.wrapper}">
            <!-- Header -->
            <div style="${styles.header}">
              <h1 style="${styles.headerTitle}">Welcome Aboard! 🚀</h1>
            </div>
            
            <!-- Content -->
            <div style="${styles.content}">
              <h2 style="${styles.heading}">You're In!</h2>
              
              <p style="${styles.text}">Hi there,</p>
              
              <p style="${styles.text}">
                Thank you for confirming your subscription. We're thrilled to have you join our community of readers.
              </p>
              
              <p style="${styles.text}">
                From now on, you'll be the first to know about our latest news, updates, and exclusive content delivered right to <strong>${email}</strong>.
              </p>
              
              <p style="${styles.text}">
                Stay tuned for our next issue!
              </p>
              
              <hr style="${styles.divider}">
              
              <p style="${styles.text}">
                In the meantime, feel free to reply to this email if you have any questions or just want to say hi.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="${styles.footer}">
              <p style="${styles.footerText}">
                You received this email because you subscribed to our newsletter.
                <br>
                <a href="#" style="${styles.link}">Unsubscribe</a>
              </p>
              <br>
              <p style="${styles.footerText}">
                &copy; ${new Date().getFullYear()} Newsletter. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

