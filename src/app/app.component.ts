import { Component } from '@angular/core';
import { ApiService } from './api.service';
import $ from 'jquery';


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
  //load movies list on page load
  ngOnInit() {
    //this.getMovies(); <- This is my prefered method of calling API's 
    this.ajaxRequest(); //call Ajax request
    this.passDataFromAjax(); // Call and pass returned data to UI 
  
  }
  //retrive movie list from API 
  getMovies(){
    var rawData;
    this.apiService.getMovies().subscribe((data)=>{
      rawData = data;
      this.moviesArray = rawData.movies;
    })
  }
  //Assign data from Ajax request  
  passDataFromAjax(){
    this.moviesArray = this.ajaxRequest();
  }
  //ajax request to the API 
  ajaxRequest(){
    var movies = '';
    $.ajax({
      async: false,
      url: "https://reactnative.dev/movies.json",
      type: 'GET',
      dataType: 'json',
      success: function(res) {
        movies = res.movies;
      }
    });
    return movies
  }

  // used for calculating values from A & B cells
  calcCbox(){
    if(this.aCellValue && this.bCellValue){ // check if A & B cells have values and if they have we are calculating the final result
      this.cResult = this.aCellValue + this.bCellValue; 
      this.grandCalc();// Calc values from A,B,D,E  cells and displaying the results in G,H,I
    }
  }
   // used for calculating values from D & E cells
  calcFbox(){
    if(this.dCellValue && this.eCellValue){
      this.fResult = this.dCellValue * this.eCellValue;
      this.grandCalc();
    }
  }
  // Calculating values from A,B,D,E  cells and displaying the results in G,H,I
  grandCalc(){
    var cellValuesArray = new Array();
    var sumCells = 0;
    // check if we have values in A,B,D,E cells and if we have we display the results in G,H,I
    // G is displaying the following formula  -> Max value from [A,B,D,E]
    // H is displaying the following formula  -> Min value from [A,B,D,E]
    // I is displaying the following formula  -> Average value from [C,F,G,H]
    if(this.aCellValue && this.bCellValue && this.dCellValue && this.eCellValue){ 
      cellValuesArray.push(this.aCellValue, this.bCellValue, this.dCellValue, this.eCellValue); //pushing all cell values to array 
      this.adbeMax = Math.max(... cellValuesArray); //Get max value from array
      this.adbeMin = Math.min(... cellValuesArray); //Get min values from array 
      sumCells += (this.fResult + this.cResult + this.adbeMax + this.adbeMin); // Make the sum of pointed cells
      this.cfghAvg = (sumCells) / 4; // calc the average values of pointed cells
    }
  }
}
