import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'credit-alert-v2';
  isMobileResolution = false;

  constructor(){
    // if (window.innerWidth < 768) {
    //   this.isMobileResolution = true;
    // } else {
    //   this.isMobileResolution = false;
    // }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    let width = event.target.innerWidth;
    if(width < 768){
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  // public getIsMobileResolution(): boolean {
  //   return this.isMobileResolution;
  // }

}


