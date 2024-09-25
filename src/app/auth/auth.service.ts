import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(username: string, password: string) {
    const role = username.startsWith('admin') ? 'admin' : 'user';
    const token = 'estoesuntokenquesepodriahaberhechoconjwtoken';

    // No retorno la password porque esos datos no se deberían guardar en un gestor de estados
    return of({ username, role, token });
  }
}