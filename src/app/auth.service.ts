import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuth: boolean = false;
  private login: string | null = null;
  private password: string | null = null;

  constructor() { 
    this.isAuth = this.checkLocalStorage();

    if (this.isAuth) {
      this.login = localStorage.getItem("login");
      this.password = localStorage.getItem("password");
    }
  }

  private checkLocalStorage() {
    let login = localStorage.getItem("login");
    let password = localStorage.getItem("password");

    return login !== null && password !== null
  }

  public async logIn(login: string, password: string): Promise<boolean> {
    this.logOut();
    let auth_string: string = `${login}:${password}`;

    let response: Response = await fetch("http://localhost:8000/data/me", {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": `Basic ${btoa(auth_string)}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      return false;
    }

    this.login = login;
    this.password = password;
    this.isAuth = true;

    localStorage.setItem("login", login);
    localStorage.setItem("password", password);

    return true;
  }

  public async signUp(login: string, password: string): Promise<boolean> {
    this.logOut();

    let body = {
      login: login,
      password: password
    }

    let response: Response = await fetch("http://localhost:8000/data/user", {
      method: "POST",
      mode: "cors",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    return response.ok;
  }

  public getToken(): string | null {
    if (!this.isAuth) {
      return null
    }

    let auth_string: string = `${this.login}:${this.password}`;
    return btoa(auth_string);
  }

  public logOut() {
    this.isAuth = false;

    localStorage.removeItem("login");
    localStorage.removeItem("password");
  }
}
