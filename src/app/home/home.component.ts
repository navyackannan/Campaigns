import { Component, OnInit,ViewChild } from '@angular/core';
declare var $:any;
import {MatPaginator, MatSort, MatTableDataSource,MatSelectModule} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginServicesService } from '../Services/login-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  
  locations =["Maharashtra","Delhi","Kerala"];
  campaignDates =["Last Month","Feb",'March'];
  sortOptions = ['Completed First','Pending','onGoing','Published','Archieved'];
  displayedColumns = ['image','Name', 'Duration', 'Status','deadline','settings'];
  customers;length;campList;
  dataSource = new MatTableDataSource
  //dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  constructor(private http:HttpClient,private logService:LoginServicesService,
    private route:Router) { 
  }
  ngOnInit(): void {
    $(document).ready(function () {
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
          // $('#closeTogg').toggleClass('active');
           //$('#content').toggleClass('active');
        });
    });
    this.getAllCamp();

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
 }
  getAllCamp(){
    this.logService.getAllCampains().subscribe((data)=>{
      console.log(data);
      this.campList = data;
      this.length = this.campList.length;
      console.log(this.length);
      this.dataSource.data = this.campList;
    })
  }
  logout(){
    this.route.navigate(['/login']);
    localStorage.clear();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  sortData(event:any) {
    console.log(event);
    const evt = event.active;
    const dir = event.direction;
    if(evt == "Name"){
     
    }
    else if(evt == "Email"){
      if(dir == 'desc'){
        //this.userList.sort(this.sService.sortByDes('email'));
      }
      else{
       // this.userList.sort(this.sService.sortByProperty('email'));
      } 
    }
    else if(evt == "ContactNo"){
      if(dir == 'desc'){
        //this.userList.sort(this.sortByDes('phoneMob'));
      }
      else{
        //this.userList.sort(this.sortByProperty('phoneMob'));
      } 
    }
   // this.dataSource.data = this.userList;
  }
  sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
   
       return 0;  
    }  
  }
  sortByDes(property){
    return function(a,b){  
      if(a[property] > b[property])  
        return -1;  
      else if(a[property] < b[property])  
        return 1;  
      return 0;  
    }  
  }
}

