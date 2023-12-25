import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public geolocation?: Geolocation

  constructor() {
    if ("geolocation" in navigator) {
      this.geolocation = navigator.geolocation;
    }
  }

  public async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      this.geolocation?.getCurrentPosition((position: any) => {
        resolve(position)
      })
    })
  }
}
