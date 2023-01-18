import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Category } from './../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

   private urlapi= 'https://damp-spire-59848.herokuapp.com/api';

  constructor(
    private http: HttpClient
  ) { }


  getAllCategories(){
    return this.http.get<Category[]>(`${environment.url_api}/categories/`);
  }

  createCategory(data: Partial<Category>){
      return this.http.post<Category>(`${this.urlapi}/categories/`, data);
  }

  updateCategory(id: string, data: Partial<Category>){
    return this.http.put<Category>(`${environment.url_api}/categories/${id}`, data);
  }



}
