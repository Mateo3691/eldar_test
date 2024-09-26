import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { map, Observable, take } from "rxjs";
import { selectIsAuthenticated } from "./auth.selectors";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    router = inject(Router);
    store = inject(Store);

    canActivate(): Observable<boolean> {
        return this.store.select(selectIsAuthenticated).pipe(
            take(1),
            map((authorized: boolean) => {
                if(authorized) {
                    return true;
                } else{
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        )
    }
}