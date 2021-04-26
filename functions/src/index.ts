import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// Sendgrid Config
import * as sgMail from "@sendgrid/mail";

const API_KEY = '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';
const TEMPLATE_ID = 'd-ce28c69241a04666886c56f0ac374f9d';
sgMail.setApiKey(API_KEY);

// Emails the buyer when a new order is placed
export const orderEmail = functions.firestore.document(`orders/{ordersId}`).onCreate( async (snap, context) => {

    // Read the post document
    const userSnap = await db.collection('user').doc(context.params.userId).get();

    // Raw Data
    const user = userSnap.data();
    const orders = snap.data();

    console.log('Running function correctly')

    // Email
    const msg = {
        to: [user.email, orders.email],
        from: 'exchange4students@gmail.com',
        templateId: TEMPLATE_ID,
        dynamicTemplateData: {
            subject: `Order Confirmation for ${orders.listingTitle}`,
            buyer: user.displayName,
            seller: orders.displayName
        },
    };

    // Send it
    return sgMail.send(msg);

});





// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
