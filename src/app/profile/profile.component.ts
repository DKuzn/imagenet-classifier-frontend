import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthorizationComponent } from '../authorization/authorization.component';
import { PredictionComponent } from '../prediction/prediction.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    AuthorizationComponent,
    PredictionComponent,
    MatButtonModule,
    MatInputModule,
    RouterModule,
    RouterOutlet,
    MatListModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  predictions: Prediction[] = [];

  constructor(private auth: AuthService) {
    
  }

  isAuth = () => {
    return this.auth.isAuth;
  }

  isNotAuth = () => {
    return !this.auth.isAuth;
  }

  logOut = () => {
    this.auth.logOut();
  }

  getPredictions = async () => {
    this.predictions = [];

    let response: Response = await fetch("http://localhost:8000/data/prediction", {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": `Basic ${this.auth.getToken()}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });

    let predictionsResponse: PredictionResponse = await response.json();
    this.predictions = predictionsResponse.predictions;
  }
}

interface PredictionResponse {
  predictions: Prediction[]
}

interface Prediction {
  _id: string
  image: string
  datetime: string
  device: any
  location: {
    latitude: number
    longitude: number
  }
  predictions: [{
    class_name: string
    class_id: number
  }]
  login: string
}
