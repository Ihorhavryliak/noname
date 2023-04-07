import { collection } from "firebase/firestore";
import { db } from "./firebase-config";

export const usersCollectionRef = collection(db, "user");
export const tripsCollectionRef = collection(db, "trips");