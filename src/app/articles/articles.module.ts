import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ArticlesListComponent} from './components/articles-list/articles-list.component';
import {ArticlesService} from './services/articles.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ArticlesListComponent
  ],
  providers: [
    ArticlesService
  ],
  exports: [
    ArticlesListComponent
  ]
})
export class ArticlesModule {}
