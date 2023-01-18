import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService } from './../../../../core/services/categories.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { MyValidators } from './../../../../utils/validators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  //form: UntypedFormGroup;
  form: FormGroup;
  categoryId: string;
  constructor(
    //private formBuilder: UntypedFormBuilder,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {
        this.categoryId = params.id
        if(this.categoryId){
          this.getCategory();
        }
    })
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name:  ['', [Validators.required, Validators.minLength(4), MyValidators.validateCategory(this.categoriesService) ]],
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
      if( this.categoryId){
        this.updateCategory();
      }else{
        this.createCategory();
      }
    }else{
      this.form.markAllAsTouched();
    }
  }

  private createCategory(){
    const data = this.form.value;
    this.categoriesService.createCategory(data)
    .subscribe(rta => {
      this.router.navigate(['/admin/categories']);
    });
  }

  uploadFile(event) {
    const image = event.target.files[0];
    //const name = 'category.png';
    const name = image.name;
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        const urlImage$ = ref.getDownloadURL();
        urlImage$.subscribe(url => {
          console.log(url);
          this.imageField.setValue(url);
        });
      })
    )
    .subscribe();
  }

  private getCategory(){
    this.categoriesService.getCategory(this.categoryId)
    .subscribe(data => {
      //this.router.navigate(['/admin/categories']);
      console.log(data);
      this.form.patchValue(data);
    });
  }

  private updateCategory(){
    const data = this.form.value;
    this.categoriesService.updateCategory(this.categoryId, data)
    .subscribe(rta => {
      this.router.navigate(['/admin/categories']);
    });
  }

}
