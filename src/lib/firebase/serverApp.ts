import "server-only";

import { cookies } from "next/headers";
import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  }),
};

function getFirebaseAdminApp() {
  return getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApp();
}

export async function getAuthenticatedAppForUser() {
  const authIdToken = (await cookies()).get("__session")?.value;

  const firebaseServerApp = getFirebaseAdminApp();
  const auth = getAuth(firebaseServerApp);

  let currentUser = null;
  if (authIdToken) {
    try {
      const decodedToken = await auth.verifyIdToken(authIdToken);
      currentUser = await auth.getUser(decodedToken.uid);
    } catch (error) {
      console.error("Failed to verify ID token:", error);
    }
  }

  return { firebaseServerApp, currentUser };
}
