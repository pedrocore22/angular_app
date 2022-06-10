import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private articlesEndpoint = 'http://localhost:8080/api/articulos';

  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get(this.articlesEndpoint)
                    .pipe(
                      map((resp: any) => {
                        return resp;
                      })
                    )
  }

  getArticlesByModel(modelTerm: string) {
    return this.http.get(this.articlesEndpoint +
                             '/search/modelo/' + 
                             modelTerm)
                    .pipe(
                      map((resp: any) => {
                        return resp;
                      })
                    )
  }

  getArticleById(id: string) {
    return this.http.get(this.articlesEndpoint + '/' + id)
                    .pipe(
                      map((resp: any) => {
                        return resp;
                      })
                    )
  }

  postArticle(article: any) {
    return this.http.post(this.articlesEndpoint, article)
                    .pipe(
                      map((resp: any) => {
                        return resp;
                      })
                    )
  }

  putArticle(id: string, article: any) {
    return this.http.put(this.articlesEndpoint + '/' + id, article)
                    .pipe(
                      map((resp: any) => {
                        return resp;
                      })
                    )        
  }

  deleteArticle(id: string) {
    return this.http.delete(this.articlesEndpoint + '/' + id)
                    .pipe(
                      map((resp: any) => {
                        return resp;
                      })
                    )        
  }

}
