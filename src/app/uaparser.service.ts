import { Injectable } from '@angular/core';
import { UAParser } from 'ua-parser-js';

@Injectable({
  providedIn: 'root'
})
export class UaparserService {
  public parser: UAParser = new UAParser();

  constructor() {

  }

  public getDeviceData() {
    return this.parser.getDevice();
  }

  public getAllData() {
    return this.parser.getResult();
  }
}
