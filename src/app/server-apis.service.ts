import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { OppAndSkills, Opportunity, Team, Location, Status, User, Position } from './models';

@Injectable({
  providedIn: 'root'
})
export class ServerApisService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getOpportunities(): Observable<Opportunity[]> {
    return this.http.get<Opportunity[]>('http://localhost:8080/oppmang/opportunities');
  }

  getTeams(): Observable<Team[]>{
    return this.http.get<Team[]>('http://localhost:8080/oppmang/teams');  
  }

  getLocation(): Observable<Location[]>{
    return this.http.get<Location[]>('http://localhost:8080/oppmang/locations');
  }

  getPosition(): Observable<Position[]>{
    return this.http.get<Position[]>('http://localhost:8080/oppmang/positions');
  }

  getStatus(): Observable<Status[]>{
    return this.http.get<Status[]>('http://localhost:8080/oppmang/statuses');
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:8080/oppmang/users');
  }

  getTeam(id: number): Observable<Team>{
    return this.http.get<Team>('http://localhost:8080/oppmang/teams/'+id);
  }

  getUser(email: string): Observable<User>{
    return this.http.get<User>('http://localhost:8080/oppmang/users/'+email);
  }


}
