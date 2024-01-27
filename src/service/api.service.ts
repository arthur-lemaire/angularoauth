import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://localhost:44312/api/home';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getDataProtected() {
    const token = this.authService.getToken();

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(this.apiUrl + '/protected', { headers });
    } else {
      // Gérer le cas où le token n'est pas disponible
      console.error('Token not available.');
      return this.http.get(this.apiUrl + '/protected');
    }
  }

  getDataPublic() {
    return this.http.get(this.apiUrl + '/public');
  }
}
