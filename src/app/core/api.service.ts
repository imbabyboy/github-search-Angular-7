import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://api.github.com';

  searchRepo(word: string) : Observable<any> {
    return this.http.get(`${this.baseUrl}/search/repositories?q=${word}+in:name&sort=stars&per_page=10`);
  }
}
