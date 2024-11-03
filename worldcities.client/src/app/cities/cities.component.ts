import { Component, OnInit, ViewChild } from '@angular/core';
import { City } from './city';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss'
})
export class CitiesComponent implements OnInit {
  public displayedColumns: string[] = [ 'id', 'name', 'lon', 'lat' ];
  public cities?: MatTableDataSource<City>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private httpClient: HttpClient){}

  ngOnInit() {
    this.httpClient.get<City[]>(environment.baseURL + "api/cities").subscribe({
      next: (result => {
        this.cities = new MatTableDataSource<City>(result);
        this.cities.paginator = this.paginator;
      }),
      error: (error => {
        console.log(error);
      })
    });
  }
}
