import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// Sendgrid Config
import * as sgMail from "@sendgrid/mail";

const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;
sgMail.setApiKey(API_KEY);

// Emails the buyer when a new order is placed
export const newOrder = functions.firestore.document('orders/{ordersId}/').onCreate( async (change, context) => {

    // Read the post document
    const userSnap = await db.collection('user').doc(context.params.userId).get();

    // Raw Data
    const user = userSnap.data();
    const order = change.data();

    // Email
    const msg = {
        to: [user.email, order.email],
        from: 'exchange4students@gmail.com',
        templateId: TEMPLATE_ID,
        dynamicTemplateData: {
            subject: `Order Confirmation for ${order.listingTitle}`,
            name: user.displayName,
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
