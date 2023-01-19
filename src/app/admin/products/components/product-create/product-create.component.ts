import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { Observable } from 'rxjs';
import { CategoriesService } from './../../../../core/services/categories.service';
import { Category } from './../../../../core/models/category.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  form: UntypedFormGroup;
  image$: Observable<any>;
  categories: Category[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private storage: AngularFireStorage,
    private categoriesService: CategoriesService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.getCategories();
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      console.log("product ", product);
      this.productsService.createProduct(product)
      .subscribe((newProduct) => {
        console.log(newProduct);
        this.router.navigate(['./admin/products']);
      });
    }
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const name = 'image.png';
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          console.log(url);
          //this.form.get('image').setValue(url);
          this.imageField.setValue(url);
        });
      })
    )
    .subscribe();
  }


  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      images: ['', Validators.required],
      category_id: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      stock: [ 100, Validators.required]
    });

    this.form.get('stock').valueChanges
    .subscribe( value => {
      console.log(value);
    })
  }

  get titleField() {
    return this.form.get('title');
  }

  get priceField() {
    return this.form.get('price');
  }

  get imageField() {
    return this.form.get('images');
  }

  get descriptionField() {
    return this.form.get('description');
  }

  get category_idField() {
    return this.form.get('category_id');
  }

  private getCategories(){
    this.categoriesService.getAllCategories()
    .subscribe( (data) =>{
        this.categories = data;
    });
  }

}
