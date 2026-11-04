import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, onSnapshot, Unsubscribe, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Book, BookInput } from './books.models';

const booksCollection = collection(db, 'books');

@Injectable({ providedIn: 'root' })
export class BooksService {
  watchBooks(onBooks: (books: Book[]) => void, onError: (error: Error) => void): Unsubscribe {
    return onSnapshot(
      booksCollection,
      snapshot => onBooks(snapshot.docs.map(document => ({
        id: document.id,
        author: String(document.data()['author'] ?? ''),
        createdAt: String(document.data()['createdAt'] ?? ''),
        genre: String(document.data()['genre'] ?? ''),
        notes: String(document.data()['notes'] ?? ''),
        readDate: String(document.data()['readDate'] ?? ''),
        title: String(document.data()['title'] ?? ''),
      }))),
      onError
    );
  }

  async addBook(book: BookInput): Promise<void> {
    await addDoc(booksCollection, { ...book, createdAt: new Date().toISOString() });
  }

  async updateBook(bookId: string, book: BookInput): Promise<void> {
    await updateDoc(doc(db, 'books', bookId), book);
  }

  async deleteBook(bookId: string): Promise<void> {
    await deleteDoc(doc(db, 'books', bookId));
  }
}