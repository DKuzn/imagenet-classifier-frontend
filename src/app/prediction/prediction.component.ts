import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prediction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.css'
})
export class PredictionComponent {
  @Input() image!: string;
  @Input() datetime!: string;
  @Input() prediction!: string;
  @Input() location!: any;
}
