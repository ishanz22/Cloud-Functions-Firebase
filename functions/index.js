/* eslint-disable */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(
  "sk_test_51NX0FJCpIfsOZ2tJI1Sro2n5PRR21d7paK5BfQKZtnLVKz9jnsdr95QQ3ux7Yvr5P1lzAiEQc2v2eQTyxCzyv1xY00YgDASOqw"
);
const serviceAccount = require("./qfixs-db82f-firebase-adminsdk-g4okb-5b71a56000.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated
  console.log(data);
  console.log(context.auth);

  const amount = data.amount; // Amount in cents
  const currency = "usd"; // Change to your desired currency

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred while creating the payment intent.",
      error
    );
  }
});

exports.HelOTest = functions.https.onCall(async (data, context) => {
  try {
    return "hi this is danyal";
  } catch (error) {
    return "hi this is danyal catch";
  }
});
