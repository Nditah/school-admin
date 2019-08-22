import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Books {

  books: Book[] = [];

  constructor(private apiService: ApiService) {
    const books = []; // Initial Values
    for (const book of books) {
      this.books.push(new Book(book));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.books;
    }
    return this.books.filter((book) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = book[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return book;
            } else if (field === params[key]) {
              return book;
            }
          }
      }
      return null;
    });
  }

  add(book: Book) {
    this.books.push(book);
  }

  delete(book: Book) {
    const index = this.books.findIndex(Book => Book.id === book.id);
    this.books.splice(index, 1);
  }

  // CRUD Service
  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getBook(queryString).pipe(
    map((res: ApiResponse) => {
      console.log(res);
        if (res.success && res.payload.length > 0) {
          res.payload.forEach(element => {
            this.add(element);
          });
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordCreate(data): Promise<ApiResponse> {
    const proRes = this.apiService.postBook(data).pipe(
    map((res: ApiResponse) => {
        if (res.success && res.payload) {
          const book = res.payload;
          this.add(book);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordUpdate(book: Book, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateBook(book.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(book);
          const newBook = res.payload;
          this.add(newBook);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

}
