import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'DelasportTask';
  moviesArray;
  cResult : number;
  fResult : number;
  aCellValue : number;
  bCellValue : number;
  dCellValue : number;
  eCellValue : number;
  adbeMax : number;
  adbeMin : number;
  cfghAvg : number; 
  constructor(
    private apiService: ApiService,
  ) { 
  }
  ngOnInit() {
    this.getMovies();
  }
  //retrive all products from db 
  getMovies(){
    var rawData;
    this.apiService.getMovies().subscribe((data)=>{
      rawData = data;
      this.moviesArray = rawData.movies;
      console.log(this.moviesArray);
    })
  }
  calcCbox(){
    if(this.aCellValue && this.bCellValue){
      this.cResult = this.aCellValue + this.bCellValue; 
      this.grandCalc();
    }
  }
  calcFbox(){
    if(this.dCellValue && this.eCellValue){
      this.fResult = this.dCellValue * this.eCellValue;
      this.grandCalc();
    }
  }
  grandCalc(){
    var cellValuesArray = new Array();
    var sumCells = 0;
    if(this.aCellValue && this.bCellValue && this.dCellValue && this.eCellValue){
      cellValuesArray.push(this.aCellValue, this.bCellValue, this.dCellValue, this.eCellValue);
      this.adbeMax = Math.max(... cellValuesArray);
      this.adbeMin = Math.min(... cellValuesArray);
      sumCells += cellValuesArray.reduce(function(a, b) { return a + b; }, 0);;
      this.cfghAvg = (sumCells) / cellValuesArray.length;
    }
  }
}
