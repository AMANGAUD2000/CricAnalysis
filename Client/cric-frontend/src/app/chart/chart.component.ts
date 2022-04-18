import { HttpClient } from '@angular/common/http';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

    constructor(private http: HttpClient, private router: Router ) { }
    // odiData: any
    public odiData: any={};
    public testData: any={};
    public t20Data: any={};
    public myChart:any;
    public text:any;
  ngOnInit(): void {
    this.text="Odi Performance"
    const email = localStorage.getItem("user");
    this.http.post<any>("http://localhost:5000/api/odi",{email:email})
        .subscribe(res=>{
          if(res){
            
            this.odiData=res.ODI; 
            console.log(this.odiData) 
            this.myChart = new Chart("myChart", {
                type: 'line',
                data: {   
                    labels: [this.odiData?.year5, this.odiData?.year4,this.odiData?.year3,this.odiData?.year2,this.odiData?.year1],
                    datasets: [{
                    label: 'Runs',
                    data: [this.odiData?.run5, this.odiData?.run4,this.odiData?.run3,this.odiData?.run2,this.odiData?.run1],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                  
                      borderWidth: 1
                    }]
                },
                options: {
                  responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            
          }else{
            console.log("Inside Odi err")
            alert(res.message);
          } })
    
    
  }
  OneDay(){
    this.text="Odi Performance"
    this.myChart.destroy();
    const email = localStorage.getItem("user");
    this.http.post<any>("http://localhost:5000/api/odi",{email:email})
        .subscribe(res=>{
          if(res){
            
            this.odiData=res.ODI; 
            console.log(this.odiData) 
            this.myChart = new Chart("myChart", {
                type: 'line',
                data: {   
                    labels: [this.odiData?.year5, this.odiData?.year4,this.odiData?.year3,this.odiData?.year2,this.odiData?.year1],
                    datasets: [{
                    label: 'Runs',
                    data: [this.odiData?.run5, this.odiData?.run4,this.odiData?.run3,this.odiData?.run2,this.odiData?.run1],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                  
                      borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            
          }else{
            console.log("Inside OneDay err")
            alert(res.message);
          } })
    
  }
  Test(){
    this.text="Test Performance"
    this.myChart.destroy();
    const email = localStorage.getItem("user");
    this.http.post<any>("http://localhost:5000/api/test",{email:email})
        .subscribe(res=>{
          if(res){
            
            this.testData=res.TEST; 
            console.log(this.testData) 
            
            this.myChart = new Chart("myChart", {
                type: 'line',
                data: {   
                    labels: [this.testData?.year5, this.testData?.year4,this.testData?.year3,this.testData?.year2,this.testData?.year1],
                    datasets: [{
                    label: 'Runs',
                    data: [this.testData?.run5, this.testData?.run4,this.testData?.run3,this.testData?.run2,this.testData?.run1],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                  
                      borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            
          }else{
            console.log("Inside Test err")
            alert(res.message);
          } })
    
  }
  T20(){
    this.text="T20 Performance"
    this.myChart.destroy();
    const email = localStorage.getItem("user");
    this.http.post<any>("http://localhost:5000/api/t20",{email:email})
        .subscribe(res=>{
          if(res){
            
            this.t20Data=res.T20; 
            console.log(this.t20Data) 
            this.myChart = new Chart("myChart", {
                type: 'line',
                data: {   
                    labels: [this.t20Data?.year5, this.t20Data?.year4,this.t20Data?.year3,this.t20Data?.year2,this.t20Data?.year1],
                    datasets: [{
                    label: 'Runs',
                    data: [this.t20Data?.run5, this.t20Data?.run4,this.t20Data?.run3,this.t20Data?.run2,this.t20Data?.run1],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                  
                      borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            
          }else{
            console.log("Inside T20 err")
            alert(res.message);
          } })
    
  }
}
