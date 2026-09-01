import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  getDocFromServer,
  onSnapshot,
} from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { EventItem, NoticeItem } from '../types';

export const ADMIN_EMAILS = ['blanknava205@gmail.com', 'phikiswayop@gmail.com'] as const;
export const ADMIN_EMAIL = ADMIN_EMAILS[0];

export function isAdminEmail(email?: string | null): boolean {
  return Boolean(email && ADMIN_EMAILS.some((adminEmail) => adminEmail.toLowerCase() === email.toLowerCase()));
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

// Initialize Firebase App singleton
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on boot as required by Firebase skill
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase Firestore test connection: offline mode or database warming up.');
    }
    return false;
  }
}

// Trigger connection check on initialization
testConnection();

// Auth Helpers
export async function signInAdminWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signOutAdmin(): Promise<void> {
  await signOut(auth);
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Notice Data Helpers
export async function fetchFirebaseNotices(isAdmin = false): Promise<NoticeItem[]> {
  const path = 'notices';
  try {
    const noticesRef = collection(db, path);
    let q;
    if (isAdmin) {
      q = query(noticesRef, orderBy('pinned', 'desc'), orderBy('published_at', 'desc'));
    } else {
      q = query(
        noticesRef,
        where('published', '==', true),
        orderBy('pinned', 'desc'),
        orderBy('published_at', 'desc')
      );
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data() as Record<string, any>;
      return {
        id: docSnap.id,
        title: data.title || '',
        date: data.published_at || '',
        category: data.category || 'general',
        summary: data.summary || '',
        audience: data.audience || 'School Community',
        pinned: Boolean(data.pinned),
        published: Boolean(data.published),
      } as NoticeItem & { published?: boolean };
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function saveFirebaseNotice(
  notice: {
    title: string;
    published_at: string;
    category: NoticeItem['category'];
    summary: string;
    audience: string;
    pinned: boolean;
    published: boolean;
  },
  id?: string
): Promise<string> {
  const path = id ? `notices/${id}` : 'notices';
  try {
    const payload = {
      title: notice.title.trim(),
      published_at: notice.published_at,
      category: notice.category,
      summary: notice.summary.trim(),
      audience: notice.audience.trim(),
      pinned: Boolean(notice.pinned),
      published: Boolean(notice.published),
      authorEmail: auth.currentUser?.email || ADMIN_EMAIL,
    };

    if (id) {
      await setDoc(doc(db, 'notices', id), payload, { merge: true });
      return id;
    } else {
      const docRef = await addDoc(collection(db, 'notices'), payload);
      return docRef.id;
    }
  } catch (error) {
    handleFirestoreError(error, id ? OperationType.UPDATE : OperationType.CREATE, path);
  }
}

export async function deleteFirebaseNotice(id: string): Promise<void> {
  const path = `notices/${id}`;
  try {
    await deleteDoc(doc(db, 'notices', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// Event Data Helpers
export async function fetchFirebaseEvents(isAdmin = false): Promise<EventItem[]> {
  const path = 'events';
  try {
    const eventsRef = collection(db, path);
    let q;
    if (isAdmin) {
      q = query(eventsRef, orderBy('event_date', 'asc'));
    } else {
      q = query(
        eventsRef,
        where('published', '==', true),
        orderBy('event_date', 'asc')
      );
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data() as Record<string, any>;
      return {
        id: docSnap.id,
        title: data.title || '',
        category: data.category || 'academic',
        categoryLabel: data.category_label || 'Academic',
        date: data.event_date || '',
        time: data.event_time || '08:00',
        location: data.location || 'Phikiswayo Primary School',
        description: data.description || '',
        imageUrl: data.image_url || '',
        published: Boolean(data.published),
      } as EventItem & { published?: boolean };
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function saveFirebaseEvent(
  event: {
    title: string;
    category: EventItem['category'];
    category_label: string;
    event_date: string;
    event_time: string;
    location: string;
    description: string;
    image_url?: string;
    published: boolean;
  },
  id?: string
): Promise<string> {
  const path = id ? `events/${id}` : 'events';
  try {
    const payload = {
      title: event.title.trim(),
      category: event.category,
      category_label: event.category_label.trim(),
      event_date: event.event_date,
      event_time: event.event_time.trim(),
      location: event.location.trim(),
      description: event.description.trim(),
      image_url: event.image_url?.trim() || '',
      published: Boolean(event.published),
      authorEmail: auth.currentUser?.email || ADMIN_EMAIL,
    };

    if (id) {
      await setDoc(doc(db, 'events', id), payload, { merge: true });
      return id;
    } else {
      const docRef = await addDoc(collection(db, 'events'), payload);
      return docRef.id;
    }
  } catch (error) {
    handleFirestoreError(error, id ? OperationType.UPDATE : OperationType.CREATE, path);
  }
}

export async function deleteFirebaseEvent(id: string): Promise<void> {
  const path = `events/${id}`;
  try {
    await deleteDoc(doc(db, 'events', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
