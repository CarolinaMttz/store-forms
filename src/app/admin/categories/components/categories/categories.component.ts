import { Component, OnInit } from '@angular/core';

import { CategoriesService } from './../../../../core/services/categories.service';
import { Router } from '@angular/router';
import { Category } from './../../../../core/models/category.model';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories= [];

  categorias: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'type', 'options'];

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoriesService.getAllCategories()
    .subscribe( data => {
      this.categorias = data;
      this.categories = data;
    });

  }

}
