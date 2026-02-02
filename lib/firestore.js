import { adminDb } from './firebase-admin';

// Create or get user from Firestore
export async function createOrGetUser(uid, email, fullname) {
    if (!adminDb) {
        console.error('Firebase Admin not initialized');
        return { id: uid, email, fullname, createdAt: new Date() };
    }

    const userRef = adminDb.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
        const userData = userDoc.data();
        return {
            id: uid,
            email: userData.email,
            fullname: userData.fullname,
            createdAt: userData.createdAt?.toDate(),
        };
    }

    // Create new user
    const newUser = {
        email,
        fullname,
        logos: [],
        createdAt: new Date(),
    };

    await userRef.set(newUser);

    return {
        id: uid,
        email,
        fullname,
        createdAt: newUser.createdAt,
    };
}

export async function saveLogoToUser(uid, logoDataInput) {
    if (!adminDb) {
        console.error('Firebase Admin not initialized');
        return { ...logoDataInput, timestamp: new Date() };
    }

    const userRef = adminDb.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
        // Create user if not exists
        await userRef.set({
            logos: [],
            createdAt: new Date(),
        });
    }

    // Handle both string (legacy) and object inputs
    const logoEntry = typeof logoDataInput === 'string'
        ? { image: logoDataInput }
        : logoDataInput;

    const logoData = {
        ...logoEntry,
        timestamp: new Date(),
    };

    // Add logo to the user's logos array
    const userData = userDoc.exists ? userDoc.data() : { logos: [] };
    const currentLogos = userData.logos || [];
    currentLogos.push(logoData);

    await userRef.update({
        logos: currentLogos,
    });

    return logoData;
}

// Get all logos for a user
export async function getUserLogos(uid) {
    if (!adminDb) {
        console.error('Firebase Admin not initialized');
        return [];
    }

    const userRef = adminDb.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
        return [];
    }

    return userDoc.data().logos || [];
}

// Get user by email
export async function getUserByEmail(email) {
    if (!adminDb) {
        console.error('Firebase Admin not initialized');
        return null;
    }

    const usersRef = adminDb.collection('users');
    const snapshot = await usersRef.where('email', '==', email).limit(1).get();

    if (snapshot.empty) {
        return null;
    }

    const doc = snapshot.docs[0];
    return {
        id: doc.id,
        ...doc.data(),
    };
}
