import { PubSub } from "@google-cloud/pubsub";

// Initialize PubSub client
const pubsub = new PubSub({
  projectId: process.env.GCP_PROJECT_ID,
  // If running locally, provide credentials
  keyFilename: process.env.GCP_KEY_FILE_PATH, // path to your service account JSON
});

const TOPIC_NAME =
  "projects/newsletter-486411/topics/newsletter-signup-development"; // Your topic name

/**
 * Publish a message to send confirmation email
 */
export async function publishConfirmationEmail(email: string, token: string) {
  try {
    const topic = pubsub.topic(TOPIC_NAME);

    const messageData = {
      email,
      token,
      timestamp: new Date().toISOString(),
    };

    // Convert to Buffer
    const dataBuffer = Buffer.from(JSON.stringify(messageData));

    // Publish message
    const messageId = await topic.publishMessage({
      data: dataBuffer,
    });

    console.log(`Message ${messageId} published to topic ${TOPIC_NAME}`);
    return { success: true, messageId };
  } catch (error: any) {
    console.error("Error publishing to Pub/Sub:", error);
    throw new Error(`Failed to publish message: ${error.message}`);
  }
}
