import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-prediction',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.css'
})
export class PredictionComponent {
  @Input() image!: string;
  @Input() datetime!: string;
  @Input() prediction!: string;
  @Input() location!: any;

  public formatLocation() {
    let latitude = String(this.location.latitude);
    let longitude = String(this.location.longitude);

    return latitude + " " + longitude;
  }
}
