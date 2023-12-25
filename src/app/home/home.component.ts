import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { MatGridListModule } from '@angular/material/grid-list';
import { UaparserService } from '../uaparser.service';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private uaparserService: UaparserService, private locationService: LocationService) {}

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
    console.log(result);
  }
}
