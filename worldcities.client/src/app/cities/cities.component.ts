import { Component, OnInit } from '@angular/core';
import { City } from './city';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss'
})
export class CitiesComponent implements OnInit {
  public displayedColumns: string[] = [ 'id', 'name', 'lon', 'lat' ];
  public cities?: City[] = [];

  constructor(private httpClient: HttpClient){}

  ngOnInit() {
    this.httpClient.get<City[]>(environment.baseURL + "api/cities").subscribe({
      next: (result => {
        this.cities = result;
      }),
      error: (error => {
        console.log(error);
      })
    });
  }
}
