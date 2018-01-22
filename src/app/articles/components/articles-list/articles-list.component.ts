import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../../services/articles.service';
import { isToday, isYesterday, format } from 'date-fns';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  public articles: Array<any>;
  constructor(private articlesServices: ArticlesService) {}

  ngOnInit() {
    this.articlesServices.getLatestArticles().then( ok_resp => {
      const art_resp = ok_resp.json();
      art_resp.forEach( article => {
        article.pretty_date = this.prettyDateFormat(article.created_at);
      });
      this.articles = art_resp;
    }).catch( err => console.log('something went wrong...'));
  }

  prettyDateFormat (date_in: string) {
    const date = new Date(date_in);
    if (isToday(date)) {
      return format(date, 'h:mm a');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM D');
    }
  }
}
