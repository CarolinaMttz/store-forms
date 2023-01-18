import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {
   /* Ejemplo de uso de FormGroup */
  form: FormGroup
  /* Ejemplo de uso de FormControl */
  /*
  nameField  = new FormControl('', [ Validators.required, Validators.maxLength(10) ]);
  emailField = new FormControl('', [ Validators.required, Validators.email ]);
  phoneField = new FormControl('');
  colorField = new FormControl('#000000');
  dateField  = new FormControl('');
  ageField   = new FormControl('18');
  descriptionField   = new FormControl('');

  categoryField = new FormControl('null');
  tagField      = new FormControl('null');

  agreeField  = new FormControl(false);
  genderField = new FormControl('');
  zoneField = new FormControl('');
  */

  tagsList       = ['Tag 1','Tag 1','Tag 1'];
  categoriesList = ['Categoría 1', 'Categoría 3', 'Categoría 3'];

  constructor(
    private  formBuilder: FormBuilder
  ) {
    this.buidForm();
  }

  ngOnInit(): void {
    //valueChanges es un Observable muestra los cambios que se estan dando en esos momentos
    //escuchar  un solo campo
    /*
    this.nameField.valueChanges
    .subscribe( value => {
      console.log("nameField: ",value);
    });
    */

    //FormBuilder tambien tiene la ventaja de escuchar los cambios de todos los campos
    // this.form.valueChanges
    // .subscribe( value => {
    //   console.log("form: ",value);
    // });
  }

  getNameValue(){
      console.log(this.nameField.value);
  }

  get nameField(){
    return this.form.get('fullName.name');
  }

  get lastNameField(){
    return this.form.get('fullName.lastName');
  }

  //el nombre de la función get no importa, pero para que sea más facil le agregamos el nombre del elemrnto
  get emailField(){
    return this.form.get('email');
  }

  get phoneField(){
    return this.form.get('phone');
  }

  get colorField(){
    return this.form.get('color');
  }

  get dateField(){
    return this.form.get('date');
  }

  get ageField(){
    return this.form.get('age');
  }

  get descriptionField(){
    return this.form.get('description');
  }

  get categoryField(){
    return this.form.get('category');
  }

  get tagField(){
    return this.form.get('tag');
  }

  get agreeField(){
    return this.form.get('agree');
  }

  get genderField(){
    return this.form.get('gender');
  }

  get zoneField(){
    return this.form.get('zone');
    zone:        new FormControl('')
  }


  get isNameFieldValid(){
    return this.nameField.touched && this.nameField.valid;
  }

  get isNameFieldInvalid(){
    return this.nameField.touched && this.nameField.invalid;
  }

  get isEmailFieldValid(){
    return this.emailField.touched && this.emailField.valid;
  }

  get isEmailFieldInvalid(){
    return this.emailField.touched && this.emailField.invalid;
  }

  save(){
    if( this.form.valid ){
      console.log(this.form.value);
    }else{
      this.form.markAllAsTouched();
    }
  }

  private buidForm(){
    /* Ejemplo de uso de FormBuilder */
    this.form = this.formBuilder.group({
      fullName: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]],
        lastName: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]]
      }),
      email:       ['', [ Validators.required, Validators.email ]],
      phone:       ['', Validators.required],
      color:       ['#000000'],
      date:        [''],
      age:         ['18', [ Validators.required, Validators.min(18), Validators.max(100) ]],
      description: [''],
      category:    [''],
      tag:         [''],
      agree:       [false, [ Validators.requiredTrue ]],
      gender:      [''],
      zone:        ['']
    });

  }

}
