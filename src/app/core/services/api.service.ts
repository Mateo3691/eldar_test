import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Item } from '../models/item.model';

const baseService = 'https://jsonplaceholder.typicode.com/posts'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected readonly http = inject(HttpClient);

  getData() {
    return this.http.get(`${baseService}`);
  }

  updateItem(item: Item) {
    return this.http.put(`${baseService}/${item.id}`,item);
  }

  createItem(item: Item) {
    const {title, body, userId} = item;
    return this.http.post(`${baseService}`, {title, body, userId});
  }
}
