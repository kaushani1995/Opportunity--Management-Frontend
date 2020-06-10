import { Component, OnInit, ViewChild} from '@angular/core';
import { ServerApisService } from '../server-apis.service';
import {MatSort} from '@angular/material/sort';
import { Opportunity, Team, User, Status, Location, Position, OppAndSkills} from '../models'
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  users : Map<string, string>;
  opportunities : OppAndSkills[]=[];
  thisUser : User;
  skillset : Map<number, string>;
  teams : Map<number, string>;
  statuses : Map<number, string>;
  locations : Map<number, string>;
  positions : Map<number, string>;
  dataSource: MatTableDataSource<OppAndSkills>;
  displayedColumns: string[] = ['idOpportunity', 'createdBy', 'createdTS', "updatedBy", "updatedTS","idTeam", "idStatus", "idLocation", "jobDesc", "idPosition", "hiringManager","skills","edit","delete"];
  filterString = '';
  filterFormControl = new FormControl();
  oppsData: OppAndSkills[] = [];
  filteredOppsData: OppAndSkills[] = [];


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private serverApis: ServerApisService, private router: Router,
    private snackBar: MatSnackBar) { 
  }

  ngOnInit(): void { 
    this.serverApis.getUser(localStorage.getItem("EMAIL")).subscribe(usr => this.thisUser = usr);

    this.serverApis.getTeams().subscribe(tms => this.teams = tms);

    this.serverApis.getUsers().subscribe(usr => this.users = usr);
    
    this.serverApis.getStatus().subscribe(sts => this.statuses = sts);

    this.serverApis.getLocation().subscribe(lct => this.locations = lct);

    this.serverApis.getPosition().subscribe(pst => this.positions = pst);

    this.serverApis.getSkills().subscribe(skl => this.skillset = skl);
    
    this.serverApis.getOpportunities()
    .subscribe(opp => {
      this.opportunities = opp;
      this.oppsData = opp;
      this.dataSource = new MatTableDataSource(opp);
    }); 
  }


  skillsToString(opp) {
    return opp.skillset.map(x => this.skillset[x]).join(', ');
  }

  openSnackBar(message = 'Deleted') {
    this.snackBar.open(message, 'Dismiss', {
      duration: 2000,
    });
  }

  deleteOpp(id) {
    this.serverApis.deleteOpp(id).subscribe(res => console.log(res));
    this.openSnackBar();
    window.location.reload(); 
  }

  ifAdmin(): boolean{
    if(this.thisUser.role == "Admin"){ 
      return true;}
    return false;
  }

  editOpp(id) {
    this.router.navigate(['edit', id]);
  }

  addOpp(){
    this.router.navigate(['/add']);
  }

  trends(){
    this.router.navigate(['/trends']);
  }

  applyFilter(event) {
    const filterValue = event.target.value;
    console.log("apply filter");  
    this.filterString = filterValue;
    this.dataSource = new MatTableDataSource(this.oppsData.filter(x => this.testJob(x)));
  }

  testJob(opp: OppAndSkills) {

    console.log(this.getJobString(opp));

    const regex = new RegExp(this.filterString.toLowerCase());
    return regex.test(this.getJobString(opp).toLowerCase());

  }

  getJobString(opp: OppAndSkills): string{
    const location = this.locations[opp.opportunity.idLocation];
    const position = this.positions[opp.opportunity.idPosition];
    const hiringManager = this.users[opp.opportunity.hiringManager];
    const status = this.statuses[opp.opportunity.idStatus];
    const skills = this.skillsToString(opp);
    const team = this.teams[opp.opportunity.idTeam];
    const jobDesc = opp.opportunity.jobDesc;

    let resultString = '';
    resultString = resultString + location + position + hiringManager + status + skills + team + jobDesc;

    return resultString;

  }

}
