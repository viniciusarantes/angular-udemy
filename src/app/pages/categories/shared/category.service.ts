import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from './category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiPath = "api/categories";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiPath).pipe(
      catchError(this.handleError)
    )
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(() => category)
    )
  }

  update(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiPath}/${category.id}`, category).pipe(
      catchError(this.handleError)
    )
  }

  delete(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError)
    )
  }


  private handleError(error: any) {
    console.log("Erro na Requisição => ", error);
    return throwError(error);
  }
}
