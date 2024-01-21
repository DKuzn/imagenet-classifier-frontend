import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../auth.service';
import { LocationService } from '../location.service';
import { UaparserService } from '../uaparser.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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
    let resultField: any = document.getElementById("result");
    resultField.innerHTML = '';

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

    let response: any = await fetch("http://localhost:8000/classify", {
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
    let classes = classificationResponse.classes;

    for (let cls = 0; cls < classes.length; cls++) {
      let className = document.createElement("mat-list-item");
      className.textContent = classes[cls].class_name;
      resultField.appendChild(className);
    }
  }
}

interface ClassificationResponse {
  classes: ImageClass[]
}

interface ImageClass {
  class_name: string
  class_id: number
}
