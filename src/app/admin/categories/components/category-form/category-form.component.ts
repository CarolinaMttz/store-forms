import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService } from './../../../../core/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  //form: UntypedFormGroup;
  form: FormGroup;

  constructor(
    //private formBuilder: UntypedFormBuilder,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name:  ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  get nameField(){
    return this.form.get('name');
  }

  get imageField(){
    return this.form.get('image');
  }

  save(){
    if( this.form.valid ){
      this.createCategory();
    }else{
      this.form.markAllAsTouched();
    }
  }

  private createCategory(){
    const data = this.form.value;
    this.categoriesService.createCategory(data)
    .subscribe( rta => {
      console.log("crear categoria: ", rta);
        this.router.navigate(['./admin/categories']);
    })
  }

}
