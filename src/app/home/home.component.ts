import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';
import { LocationService } from '../location.service';
import { PredictionComponent } from '../prediction/prediction.component';
import { UaparserService } from '../uaparser.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    PredictionComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public result: ImageClass[] = [];

  constructor(private uaparserService: UaparserService, private locationService: LocationService, private auth: AuthService) { }

  isNotAuth = () => {
    return !this.auth.isAuth;
  }

  onFileChange = (event: any) => {
    const file: File = event.target.files[0];
    let reader: FileReader = new FileReader();
    let imgPreview: any = document.getElementById("imageFile");
    reader.readAsDataURL(file);
    reader.onload = function () {
      imgPreview.src = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  onButtonChooseFileClick = () => {
    let fileChooser: any = document.getElementById("fileChooser");
    fileChooser.click();
  }

  onButtonSendImageClick = async () => {
    let sourceFrame: any = document.getElementById("imageFile");

    let data = this.uaparserService.getAllData();
    let loc: any = await this.locationService.getCurrentLocation();

    let result = {
      image: sourceFrame.src,
      location: {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude
      },
      device: data
    }

    let body = JSON.stringify(result);

    let response: any = await fetch(`${environment.apiUrl}/classify`, {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Authorization": `Basic ${this.auth.getToken()}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: body
    });

    let classificationResponse: ClassificationResponse = await response.json();
    this.result = classificationResponse.classes;
  }
}

interface ClassificationResponse {
  classes: ImageClass[]
}

interface ImageClass {
  class_name: string
  class_id: number
}
