import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Book } from 'src/app/models/book';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    public firestore: AngularFirestore
  ) { }

  public createBook(bookData: any): Promise<any> {
    const id = this.firestore.createId();
    return this.firestore
      .doc(`bookList/${id}`)
      .set({ id, ...bookData });
  }

  // public updateBook(bookId: string, newData: any): Promise<any> {
    
  // }

  public deleteBook(bookId: string): Promise<any> {
    return this.firestore
      .doc(`bookList/${bookId}`)
      .delete();
  }

  public getBook(bookId: string): AngularFirestoreDocument<Book> {
    return this.firestore
      .collection('bookList')
      .doc(bookId);
  }

  public getAllBooks(): AngularFirestoreCollection<Book> {
    return this.firestore.collection('bookList');
  }
}
