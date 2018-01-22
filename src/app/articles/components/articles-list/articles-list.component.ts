import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../../services/articles.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  public articles: Array<any>;
  constructor(private articlesServices: ArticlesService) {}

  ngOnInit() {
    this.articlesServices.getLatestArticles().then( ok_resp => {
      console.log(ok_resp.json());
      this.articles = ok_resp.json();
    }).catch( err => console.log('something went wrong...'));
  }

}
