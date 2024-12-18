import { Component, OnInit, ViewChild } from '@angular/core';
import { City } from './city';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
    var pageEvent = new PageEvent();
 pageEvent.pageIndex = 0;
 pageEvent.pageSize = 10;
this.getData(pageEvent);
  }

  getData(event: PageEvent) {
    var url = environment.baseURL + 'api/Cities';
    var params = new HttpParams()
     .set("pageIndex", event.pageIndex.toString())
     .set("pageSize", event.pageSize.toString());
    this.httpClient.get<any>(url, { params })
     .subscribe({
     next: (result) => {
     this.paginator.length = result.totalCount;
     this.paginator.pageIndex = result.pageIndex;
     this.paginator.pageSize = result.pageSize;
     this.cities = new MatTableDataSource<City>(result.data)
     },
     error: (error) => console.error(error)
     });
     }

}
