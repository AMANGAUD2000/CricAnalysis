import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  data: any;
  public BowlingData: any={};
  public tourData: any=[];
  public careerData: any={};
  public shotsData: any={};
  constructor(private http: HttpClient, private router: Router ) { }

  ngOnInit(): void {
    const email = localStorage.getItem("user");
    if(email==null){
      this.router.navigate(['login'])
    }
    this.http.post<any>("http://localhost:5000/users/profile",{email:email})
        .subscribe(res=>{
          if(res){
            console.log("Inside profile ")
            console.log(res.User[0].email);  
            this.data=res.User[0];  
            console.log(this.data);        
            this.router.navigate(['dashboard'])
            console.log("Inside profile 2")
          }else{
            console.log("Inside profile err")
            alert(res.message);
          } })

    this.http.post<any>("http://localhost:5000/api/bowlingdetails",{email:email})
        .subscribe(res=>{
          if(res){
            console.log("Inside Bowling start ")
            
            this.BowlingData=res.Bowling;  
            console.log(this.BowlingData);        
            this.router.navigate(['dashboard'])
            console.log("Inside Bowling")
          }else{
            console.log("Inside Bowling err")
            alert(res.message);
          } })
          
    this.http.get<any>("http://localhost:5000/api/tour")
          .subscribe(res=>{
            if(res){
              console.log("Inside Tour start ")
              
              this.tourData=res.Tours;
              this.tourData.sort((val1: any, val2: any)=> 
              {return new Date(val2.Date).valueOf() - new Date(val1.Date).valueOf()})
              this.tourData=this.tourData.slice(0, 5);
              console.log(this.tourData);        
                      
              this.router.navigate(['dashboard'])
              console.log("Inside Tour end")
            }else{
              console.log("Inside Tour err")
              alert(res.message);
            } })

    this.http.post<any>("http://localhost:5000/api/career",{email:email})
            .subscribe(res=>{
              if(res){
                console.log("Inside Career start ")
                
                this.careerData=res.Career;  
                console.log(this.careerData);        
                this.router.navigate(['dashboard'])
                console.log("Inside Career end")
              }else{
                console.log("Inside Career err")
                alert(res.message);
              } })
    
    this.http.post<any>("http://localhost:5000/api/shotstatsdetails",{email:email})
              .subscribe(res=>{
                if(res){
                  console.log("Inside Shots start ")
                  
                  this.shotsData=res.ShotsStats;  
                  console.log(this.shotsData);        
                  this.router.navigate(['dashboard'])
                  console.log("Inside Shots end")
                }else{
                  console.log("Inside Shots err")
                  alert(res.message);
                } })
  }
  logout(){ 
    localStorage.clear();
  }
  func(d: Date) {
    var obj = new Date(d);
    var y = obj.getUTCMonth() + 1;
    var x = obj.getUTCDate() + "-" + y + "-" + obj.getFullYear();
    return x;
  };
}
