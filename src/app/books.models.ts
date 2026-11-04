export interface Book {
  id: string;
  author: string;
  createdAt: string;
  genre: string;
  notes: string;
  readDate: string;
  title: string;
}

export type BookInput = Omit<Book, 'id' | 'createdAt'>;