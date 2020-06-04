import { Component, OnInit, AfterViewInit} from '@angular/core';
import { ServerApisService } from '../server-apis.service';
import { Opportunity, Team, User, Status, Location, Position} from '../models'
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  teams : Team[];
  users : User[];
  thisUser : User;
  statuses : Status[];
  locations : Location[];
  positions : Position[];
  dataSource: MatTableDataSource<Opportunity>;
  displayedColumns: string[] = ['idOpportunity', 'createdBy', 'createdTS', "updatedTS","idTeam", "idStatus", "idLocation", "jobDesc", "idPosition", "hiringManager","skills","edit","delete"];

  constructor(private serverApis: ServerApisService) { 
    this.serverApis.getUser(localStorage.getItem("EMAIL")).subscribe(usr => this.thisUser = usr);

    this.serverApis.getTeams().subscribe(tms => this.teams = tms);

    this.serverApis.getUsers().subscribe(usr => this.users = usr);
    
    this.serverApis.getStatus().subscribe(sts => this.statuses = sts);

    this.serverApis.getLocation().subscribe(lct => this.locations = lct);

    this.serverApis.getPosition().subscribe(pst => this.positions = pst);
    
    this.serverApis.getOpportunities()
    .subscribe(opp => this.dataSource = new MatTableDataSource(opp)); 
  }

  ngOnInit(): void { 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findTeam(id: number): string{
    for(let i=0;i<this.teams.length;i++){
        if(this.teams[i].idTeam==id){
          return this.teams[i].name;
        }
    }
  }

  findUser(email: string): string{
    for(let i=0;i<this.users.length;i++){
        if(this.users[i].email==email){
          return this.users[i].name;
        }
    }
  }

  findStatus(id: number): string{
    for(let i=0;i<this.statuses.length;i++){
        if(this.statuses[i].idStatus==id){
          return this.statuses[i].currStatus;
        }
    }
  }

  findLocation(id: number): string{
    for(let i=0;i<this.locations.length;i++){
        if(this.locations[i].idLocation==id){
          return this.locations[i].name;
        }
    }
  }

  findPosition(id: number): string{
    for(let i=0;i<this.positions.length;i++){
        if(this.positions[i].idPosition==id){
          return this.positions[i].name;
        }
    }
  }

  ifAdmin(): boolean{
    if(this.thisUser.role == "Admin"){ 
      return true;}
    return false;
  }

}
