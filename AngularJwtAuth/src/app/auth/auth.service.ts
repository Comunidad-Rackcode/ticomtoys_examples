import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';

import { APIResponse } from './api-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:3000/api/v1/auth/signin';
  private signupUrl = 'http://localhost:3000/api/v1/auth/signup';
  private resfreshTokenUrl = 'http://localhost:3000/api/v1/auth/refreshtoken';


  constructor(private http: HttpClient, private token: TokenStorageService) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<APIResponse> {
    return this.http.post<APIResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  refresh (): Observable<APIResponse> {
    const headers = new HttpHeaders().set('authorization', this.token.getRefreshToken());

    const refreshObservable = this.http.get<APIResponse>(this.resfreshTokenUrl, { headers });

    console.log(headers);

    const refreshSubject = new ReplaySubject<APIResponse>(1);
    refreshSubject.subscribe((r: APIResponse) => {
      this.token.saveToken(r.data.accessToken);
      this.token.saveRefreshToken(r.data.refreshToken);
    }, (err) => {
      this.token.handleAuthenticationError(err);
    });

    refreshObservable.subscribe(refreshSubject);
    return refreshSubject;
  }

}
