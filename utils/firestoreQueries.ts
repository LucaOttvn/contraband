// lib/firestoreQueries.js
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Player } from "@/app/context";

export async function getCollection(collectionName: string) {
    if (!collectionName) {
        throw new Error("Collection name must be provided.");
    }

    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
}

export async function addPlayer(playerData: Player) {
    console.log(playerData);
    try {
        const docRef = await addDoc(collection(db, 'players'), playerData);
        return { id: docRef.id, ...playerData }; // Return the added player data with the ID
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error("Failed to add player");
    }
}
