import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, FirestoreError, onSnapshot, Unsubscribe, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { User, UserInput } from './users.models';
import { environment } from '../environments/environment';

const usersCollection = collection(db, 'users');

@Injectable({ providedIn: 'root' })
export class UsersService {
  watchUsers(onUsers: (users: User[]) => void, onError: (error: FirestoreError) => void): Unsubscribe {
    return onSnapshot(
      usersCollection,
      snapshot => onUsers(snapshot.docs.map(document => ({
        id: document.id,
        name: String(document.data()['name'] ?? ''),
        email: String(document.data()['email'] ?? ''),
        phone: String(document.data()['phone'] ?? ''),
        createdAt: String(document.data()['createdAt'] ?? ''),
      }))),
      onError
    );
  }

  async addUser(user: UserInput): Promise<void> {
    await addDoc(usersCollection, { ...user, createdAt: new Date().toISOString() });
  }

  async updateUser(userId: string, user: UserInput): Promise<void> {
    await updateDoc(doc(db, 'users', userId), user);
  }

  async deleteUser(userId: string): Promise<void> {
    await deleteDoc(doc(db, 'users', userId));
  }
}

export function getUsersLoadErrorMessage(error: FirestoreError): string {
  switch (error.code) {
    case 'permission-denied':
      return `Access denied (permission-denied). I-publish ang firestore.rules sa Firebase project ${environment.firebaseConfig.projectId}.`;
    case 'failed-precondition':
      return `Hindi pa handa ang Firestore database (failed-precondition). Tiyaking na-enable ang Cloud Firestore sa project ${environment.firebaseConfig.projectId}.`;
    case 'unavailable':
      return 'Hindi maabot ang Firestore (unavailable). Suriin ang internet connection at subukan ulit.';
    default:
      return `Hindi ma-load ang mga user (${error.code}). Tingnan ang Firebase Console at subukan ulit.`;
  }
}
