import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from '../service/auth.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'angularoauth';

  constructor(protected apiService : ApiService, protected authService: AuthService) {}
  ngOnInit(): void {
  }

  getDataProtected(){
    this.apiService.getDataProtected()?.subscribe(response=>{
      console.log(response);
    })
  }

  getDataPublic(){
    this.apiService.getDataPublic()?.subscribe(response=>{
      console.log(response);
    })
  }
}
