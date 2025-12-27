import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let adminAuth = null;
let adminDb = null;

try {
    // Import service account from JSON file
    const serviceAccount = require('./firebase-service-account.json');

    // Initialize Firebase Admin only if not already initialized
    const app = getApps().length === 0
        ? initializeApp({
            credential: cert(serviceAccount),
        })
        : getApps()[0];

    adminAuth = getAuth(app);
    adminDb = getFirestore(app);
} catch (error) {
    console.warn('Firebase Admin SDK not initialized:', error.message);
}

export { adminAuth, adminDb };
