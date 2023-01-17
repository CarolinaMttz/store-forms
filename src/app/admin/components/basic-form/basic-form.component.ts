import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';


@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  nameField = new FormControl('Soy un control');

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

}
