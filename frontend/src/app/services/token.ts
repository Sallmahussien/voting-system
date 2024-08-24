import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  storeToken(token: string) {
    document.cookie = `auth_token=${token}; path=/; secure; samesite=strict`;
  }
  
}
