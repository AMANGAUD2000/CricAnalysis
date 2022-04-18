import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { variable } from '@angular/compiler/src/output/output_ast';

import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  public shotsData: any={};
  public myPieChart:any;
  constructor(private http: HttpClient, private router: Router ) { }
  ngOnInit(): void {
    const email = localStorage.getItem("user");
    this.http.post<any>("http://localhost:5000/api/shotstatsdetails",{email:email})
        .subscribe(res=>{
          if(res){
            
            this.shotsData=res.ShotsStats; 
            console.log("I am Aman",this.shotsData) 
            this.myPieChart = new Chart("myPieChart", {
                type: 'pie',
                data: {   
                    labels: ["Leg Side", "Off Side"],
                    datasets: [{
                    label: 'Runs',
                    data: [this.shotsData?.LegSide*100/(this.shotsData?.LegSide+ this.shotsData?.OffSide), this.shotsData?.OffSide*100/(this.shotsData?.LegSide+ this.shotsData?.OffSide)],
                    backgroundColor: ['rgba(255, 99, 132, 1)','rgba(99, 255, 255, 0.3)' ],
                    // borderColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 1)'],
                  
                      borderWidth: 1
                    }]
                },
                options: {
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Shots Statistics'
                    }
                  }
                },
            });
            
          }else{
            console.log("Inside Stats err")
            alert(res.message);
          } })
  }

}
