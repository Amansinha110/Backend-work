import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  getDocFromServer, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth & Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore with specific database ID if present
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId) 
  : getFirestore(app);

// Connection test on boot (from firebase-integration skill)
async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline. Please check your network/configuration.');
    }
  }
}
testFirestoreConnection();

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  company?: string;
  role?: string;
  createdAt?: string;
  lastLoginAt?: string;
}

// User Document Service
export async function syncUserProfile(user: FirebaseUser, additionalData?: { company?: string; role?: string }): Promise<UserProfile> {
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);

  const profile: UserProfile = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || user.email?.split('@')[0] || 'Enterprise User',
    photoURL: user.photoURL,
    company: additionalData?.company || (snap.exists() ? snap.data().company : 'Enterprise Corp'),
    role: additionalData?.role || (snap.exists() ? snap.data().role : 'analyst'),
    lastLoginAt: new Date().toISOString()
  };

  if (!snap.exists()) {
    profile.createdAt = new Date().toISOString();
  }

  await setDoc(userRef, {
    ...profile,
    updatedAt: serverTimestamp()
  }, { merge: true });

  return profile;
}

// Save Enterprise Inquiry / Lead to Firestore
export async function saveInquiryToFirestore(inquiry: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  category: string;
  message: string;
  userId?: string;
}) {
  const colRef = collection(db, 'inquiries');
  const docRef = await addDoc(colRef, {
    ...inquiry,
    status: 'new',
    createdAt: new Date().toISOString(),
    timestamp: serverTimestamp()
  });
  return docRef.id;
}

// Save ROI Calculation to Firestore
export async function saveRoiCalculationToFirestore(calc: {
  userId: string;
  companyName: string;
  employees: number;
  annualRevenue: number;
  estimatedAnnualSavings: number;
  projectedRoiPercent: number;
  paybackMonths: number;
}) {
  const colRef = collection(db, 'calculations');
  const docRef = await addDoc(colRef, {
    ...calc,
    createdAt: new Date().toISOString(),
    timestamp: serverTimestamp()
  });
  return docRef.id;
}

// Fetch user's saved calculations
export async function getUserRoiCalculations(userId: string) {
  try {
    const colRef = collection(db, 'calculations');
    const q = query(colRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Failed to load calculations from firestore', err);
    return [];
  }
}

// Sign-in with Google Popup
export async function signInWithGoogle(): Promise<UserProfile> {
  const credential = await signInWithPopup(auth, googleProvider);
  return await syncUserProfile(credential.user);
}

// Sign Out
export async function logOutFirebase(): Promise<void> {
  await fbSignOut(auth);
}
