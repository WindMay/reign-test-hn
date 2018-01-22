import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ArticlesService {

  constructor(private http: Http) { }

  getLatestArticles() {
    return this.http.get('/api/articles-latest').toPromise();
  }

}
