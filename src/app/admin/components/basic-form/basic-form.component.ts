import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {
   /* Ejemplo de uso de FormGroup */
  form = new FormGroup({
    name:        new FormControl('', [ Validators.required, Validators.maxLength(10) ]),
    email:       new FormControl('', [ Validators.required, Validators.email ]),
    phone:       new FormControl(''),
    color:       new FormControl('#000000'),
    date:        new FormControl(''),
    age:         new FormControl('18'),
    description: new FormControl(''),
    category:    new FormControl('null'),
    tag:         new FormControl('null'),
    agree:       new FormControl(false),
    gender:      new FormControl(''),
    zone:        new FormControl('')
  });

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

  constructor() { }

  ngOnInit(): void {
    //valueChanges es un Observable muestra los cambios que se estan dando en esos momentos
    this.nameField.valueChanges
    .subscribe( value => {
      console.log(value);
    });
  }

  getNameValue(){
      console.log(this.nameField.value);
  }

  get nameField(){
    return this.form.get('name');
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
    console.log(this.form.value);
  }

}
