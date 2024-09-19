// lib/firestoreQueries.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function fetchCollection(collectionName) {
    if (!collectionName) {
        throw new Error("Collection name must be provided.");
    }

    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
}
