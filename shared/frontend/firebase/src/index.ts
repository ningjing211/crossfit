import { initializeApp, type FirebaseApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore, type Firestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage, type FirebaseStorage } from 'firebase/storage';

export interface FirebaseWebConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export const firebaseWebConfig: FirebaseWebConfig = {
  apiKey: 'demo',
  authDomain: 'demo-crossfit.firebaseapp.com',
  projectId: 'demo-crossfit',
  storageBucket: 'demo-crossfit.appspot.com',
  messagingSenderId: '0',
  appId: 'demo',
};

export interface FirebaseServices {
  app: FirebaseApp;
  firestore: Firestore;
  storage: FirebaseStorage;
}

let services: FirebaseServices | null = null;

export function firebaseServices(): FirebaseServices {
  if (services) {
    return services;
  }
  const app = initializeApp(firebaseWebConfig);
  const firestore = getFirestore(app);
  const storage = getStorage(app);
  try {
    connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
  } catch {
    // Hot reload can connect twice.
  }
  try {
    connectStorageEmulator(storage, '127.0.0.1', 9199);
  } catch {
    // Hot reload can connect twice.
  }
  services = { app, firestore, storage };
  return services;
}
