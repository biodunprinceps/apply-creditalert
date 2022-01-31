import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {

  constructor(private router: Router, private authservice:AuthService) { }

  ngOnInit(): void {
  }

  complete(){
    this.router.navigateByUrl('offer/completed');
  }

  loggedIn(){
    return this.authservice.token;
  }

}
