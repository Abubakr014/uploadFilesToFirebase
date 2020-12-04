/** @format */

const admin = require("./node_modules/firebase-admin");
const serviceAccount = require("./serviceKey.json");
//const serviceAccount = require("./serviceKey.json");
//const data = require("./Inventory.json");
const data = require("./Inventory");
const collectionKey = "inventory"; //name of the collection
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://peerdrop-dev-7aaf9.firebaseio.com",
});
const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
if (data && typeof data === "object") {
  Object.keys(data).forEach((docKey) => {
    firestore
      .collection(collectionKey)
      .doc()
      .set(data[docKey])
      .then((res) => {
        console.log("Document " + docKey + " successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  });
}
