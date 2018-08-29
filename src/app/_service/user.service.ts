import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../_model/User';
import { Financial } from '../_model/Financial';
import { FinancialInsert } from '../_model/FinancialInsert';
import { HttpClient } from '@angular/common/http';
import { Visit } from '../_model/Visit';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
    baseUrl = environment.apiUrl;
    users: User[];
   userToReturn: User;
   imageUrl = environment.defaultImage;
constructor(private http: HttpClient  ) {

 }
GetPatients() {
  return this.http.post(this.baseUrl + 'Patient/', {} ).pipe(map((response: User[]) => {
    this.users = response;
    return this.users;
  }));
}
GetPatientByID(userId: string) {
  const user = new User();
  user.PatientID = Number(userId);
  return this.http.post(this.baseUrl + 'Patient/',  user ).pipe(map((response: User) => {
    this.userToReturn = response;
    return this.userToReturn;
  }));
}

GetPatientVisits(userID: string) {
  return this.http.get(this.baseUrl + 'Patient/GetPatientVisits/' + Number(userID))
  .pipe(map((response: Visit[]) => {
    this.userToReturn.visits = response;
    return this.userToReturn.visits;
  }));
}

GetPatientFinancialInfo(userID: string) {
  return this.http.get(this.baseUrl + 'Financial/GetPatientFinancial/' + Number(userID) + '/4')
  .pipe(map((response: Financial[]) => {
    this.userToReturn.financial = response;
    return this.userToReturn.financial ;
  }));
}

AddPatientFinancialInfo(financialInfo: FinancialInsert) {
  // tslint:disable-next-line:max-line-length
  return this.http.post('localhost:4820/api/Financial/InseartPatientFinancial', {}) .pipe(map((response: User) => {
    this.userToReturn = response;
    return this.userToReturn ;
  }));
}

/*getUser(id: number): Observable<User> {
  return this.authHttp.get(this.baseUrl + '/' + id)
  .map(response => <User>response.json())
  .catch(this.handelError);
}
 updateUser(id: number , user: User) {
  return this.authHttp.put(this.baseUrl + '/' + id , user).catch(this.handelError);
 }
 setMainPhoto(userId: number , id: number ) {
   return this.authHttp.post(this.baseUrl + '/' + userId + '/photos/' + id + '/SetMain' , {} ).catch(this.handelError);
 }
 deletePhoto(userId: number , id: number ) {
   return this.authHttp.delete(this.baseUrl + '/' + userId + '/photos/' + id).catch(this.handelError);
 }*/

}
