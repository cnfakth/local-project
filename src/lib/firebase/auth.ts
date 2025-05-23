import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged as _onAuthStateChanged,
    onIdTokenChanged as _onIdTokenChanged,
} from "firebase/auth";

import { auth } from "@/lib/firebase/clientApp";
import { User } from "firebase/auth";

export function onAuthStateChanged(cb: (user: User | null) => void) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb: (user: User | null) => void) {
  return _onIdTokenChanged(auth, cb);
}


export async function signInWithGoogle() {
const provider = new GoogleAuthProvider();

try {
    await signInWithPopup(auth, provider);
} catch (error) {
    console.error("Error signing in with Google", error);
}
}

export async function signOut() {
try {
    return auth.signOut();
} catch (error) {
    console.error("Error signing out with Google", error);
}
}