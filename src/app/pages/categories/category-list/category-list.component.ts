import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.interface';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert("Não foi possível carregar a lista de categorias")
    )
  }

  deleteCategory(category): void {
    const mustDelete = confirm(`Deseja remover a categoria ${category.name}?`);
    if (!mustDelete) return;

    this.categoryService.delete(category.id).subscribe(
      () => {
        this.categories = this.categories.filter(element => element != category);
        alert("Categoria removida!");
      }
    )
  }

}
