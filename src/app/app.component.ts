import { Component, OnInit, ViewChild } from '@angular/core';
import { DataServiceService } from './data-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  id: number;
  firstName: string;
  lastName: number;
  avatar: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataServiceService) {}

  displayedColumns1: string[] = ['id', 'firstName', 'lastName', 'avatar'];
  displayedColumns2: string[] = ['id', 'userid', 'firstName', 'friend'];
  // displayedColumns3: string[] = ['id', 'userid', 'lastName', 'avatar'];
  dataSource1 = new MatTableDataSource<PeriodicElement>();
  dataSource2 = new MatTableDataSource<PeriodicElement>();
  // dataSource3 = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource1.paginator = this.paginator;
    this.dataService
      .getUsersData()
      .subscribe((res: MatTableDataSource<PeriodicElement>) => {
        this.dataSource1 = res;
        console.log(res);
      });
    this.dataSource2.paginator = this.paginator;
    this.dataService
      .getUsersFriendsData()
      .subscribe((res: MatTableDataSource<PeriodicElement>) => {
        this.dataSource2 = res;
        console.log(res);
      });
    /* this.dataSource3.paginator = this.paginator;
    this.dataService
      .getUsersFriendsOFfriendsData()
      .subscribe((res: MatTableDataSource<PeriodicElement>) => {
        this.dataSource3 = res;
        console.log(res);
      }); */
  }
}
