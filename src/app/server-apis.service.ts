import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { OppAndSkills, Opportunity, Team, Location, Status, User, Position, Skillset, Trend } from './models';

@Injectable({
  providedIn: 'root'
})
export class ServerApisService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getOpportunities(): Observable<OppAndSkills[]> {
    return this.http.get<OppAndSkills[]>('http://localhost:8080/oppmang/opportunities');
  }

  getTeams(): Observable<any>{
    return this.http.get<any[]>('http://localhost:8080/oppmang/teams');  
  }
  
  getLocation(): Observable<any>{
    return this.http.get<any[]>('http://localhost:8080/oppmang/locations');
  }

  getPosition(): Observable<any>{
    return this.http.get<any[]>('http://localhost:8080/oppmang/positions');
  }


  getStatus(): Observable<any>{
    return this.http.get<any[]>('http://localhost:8080/oppmang/statuses');
  }

  getUsers(): Observable<any>{
    return this.http.get<any[]>('http://localhost:8080/oppmang/users');
  }

  getSkills(): Observable<any>{
    return this.http.get<any[]>('http://localhost:8080/oppmang//skillsets');
  }

  getSkillsobj(): Observable<Skillset[]>{
    return this.http.get<Skillset[]>('http://localhost:8080/oppmang//skillsetsobj');
  }

  getTeam(id: number): Observable<any>{
    return this.http.get<Team>('http://localhost:8080/oppmang/teams/'+id);
  }

  getUser(email: string): Observable<User>{
    return this.http.get<User>('http://localhost:8080/oppmang/users/'+email);
  }

  deleteOpp(id: number): Observable<any>{
    return this.http.delete('http://localhost:8080/oppmang/opportunities/'+id);
  }

  getOpp(id: number): Observable<any>{
    return this.http.get<Opportunity>('http://localhost:8080/oppmang/opportunities/'+id);
  }

  updateOpp(oppAndSkills: OppAndSkills): Observable<any> {
    return this.http.put('http://localhost:8080/oppmang/opportunities/'+oppAndSkills.opportunity.idOpportunity, oppAndSkills, this.httpOptions);
  }

  addOpp(oppAndSkills: OppAndSkills): Observable<any> {
    return this.http.post('http://localhost:8080/oppmang/opportunities/', oppAndSkills, this.httpOptions);
  }

  getTrend(type : string): Observable<Trend> {
    return this.http.get<Trend>('http://localhost:8080/oppmang/trends/'+type);
  }

}
