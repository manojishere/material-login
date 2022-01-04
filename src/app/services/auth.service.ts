import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable, throwError } from 'rxjs';
import {  map, tap, catchError, retry } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser : User = {
    id: '1',
    userName: 'manojishere',
    password: 'admin',
    firstName: 'Manoj',
    dateOfBirth:'2012-10-23',
    lastName: 'Singh',
    token: '',
    email: '',
    role: 'Admin'
  }
  
  private _loggedInUser : BehaviorSubject<User>;
  private _listOfUsers = new BehaviorSubject< User[]>([]);
  private users : User[] = [];

  // private userURL = 'assets/data/users.json';  // URL to web api
  private userURL = 'api/users';  // URL to web api
  private baseURL = 'api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*',
    'Authorization':'authkey' })
  };

  constructor(private http: HttpClient) { 
    this._loggedInUser = new BehaviorSubject<User> ( new User());
  }

  get user() : Observable<User>{
    return this._loggedInUser.asObservable();
  }

  logout(){
    // console.log("logging out user");
    // const _params = {} as any;
    let nulluser = <User>{};
    // let nulluser =  undefined | any;
    this._loggedInUser.next( nulluser );
  }  

  getSpecificUser( id : number ) : Observable< User > {
    const url = `${this.baseURL}/${id}`;
    console.log( 'Auth Service getSepecificUser : ' + url  );
    return this.http.get<User> ( url );
  }

  addUser( user: User ) : Observable< User >{
    return this.http.post < User > ( this.baseURL, user, this.httpOptions ).pipe(
      tap(( newUser : User ) => console.log(' Added User : ' + newUser.id ) )
    );
  }

  add( user: User ){
    console.log( 'before : ' + this.users.length);
    this.users.push ( user );
    console.log( this.users.length);
  }  
  

  get userList() : Observable<User[]>{
    this._listOfUsers.next( this.users );
    return this._listOfUsers.asObservable();
  }

  login( userName:string, password:string ){
    console.log('AuthService login total users : ' + this.users.length );
    this.users.forEach( (x:User)=> {
      if( x.userName === userName && x.password === password){
        this._loggedInUser.next( x );
      }
    })
  }

  /*
  get user( userName:string, password:string) : Observable<User>{
    console.log( ' getUser() : ' + this.users.length );
    this.users.find( x=> {
      if(x.userName === userName && x.password === password){
        this._loggedInUser = x;
      }
    });

    )
  }
  */

  getUsers() : Observable<User[]> {
    return this.http.get< User[]>( this.userURL )
    .pipe(
      map ( (data:User[])=> this.users=data ) ,
      retry(3),
      catchError( this.errorHandler )
      
    );
  }


  errorHandler( error: HttpErrorResponse ) {
    console.log( 'server errors : ' + error )
    return throwError( error.message || "Server Error" );
  }

}

