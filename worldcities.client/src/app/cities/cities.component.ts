import { Component, OnInit, ViewChild } from '@angular/core';
import { City } from './city';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss'
})
export class CitiesComponent implements OnInit {
  public displayedColumns: string[] = [ 'id', 'name', 'lon', 'lat' ];
  public cities?: MatTableDataSource<City>;
  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "name";
  public defaultSortOrder: "asc" | "desc" = "asc";
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private httpClient: HttpClient){}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    var pageEvent = new PageEvent();
     pageEvent.pageIndex = this.defaultPageIndex;
     pageEvent.pageSize = this.defaultPageSize;
    this.getData(pageEvent);
     }

  getData(event: PageEvent) {
    var url = environment.baseURL + 'api/Cities';
    var params = new HttpParams()
     .set("pageIndex", event.pageIndex.toString())
     .set("pageSize", event.pageSize.toString())
     .set("sortColumn", (this.sort) ? this.sort.active : this.defaultSortColumn)
     .set("sortOrder", (this.sort) ? this.sort.direction : this.defaultSortOrder);

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
