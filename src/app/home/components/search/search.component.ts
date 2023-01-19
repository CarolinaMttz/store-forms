import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchField= new FormControl();
  results: any[] = [];

  /*
    KEY: KwC7mlIT1VCYOjYROr9l8otiVjLAoc2L
    https://api.giphy.com/v1/gifs/search?q=a&api_key=KwC7mlIT1VCYOjYROr9l8otiVjLAoc2L&limit=12
  */
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.searchField.valueChanges
    .subscribe( value => {
      this.getData(value);
    })
  }

  private getData(query: string){
    const API_KEY = 'KwC7mlIT1VCYOjYROr9l8otiVjLAoc2L';
    this.http.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API_KEY}&limit=12`)
    .pipe(
      map( (response: any) => {
        return response.data.map(item => item.images.downsized)
      })
    )
    .subscribe( (data => {
      console.log(data);
    }));
  }

}
