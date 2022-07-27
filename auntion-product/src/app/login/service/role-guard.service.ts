import {Injectable} from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';

import {TokenStorageService} from './token-storage.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RoleGuardService implements CanActivate {
  constructor(public auth: TokenStorageService, public router: Router,
              private tokenStorageService: TokenStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.tokenStorageService.getUser();
    if (currentUser !== null) {
      const role = currentUser.roles[0].idRole;
      if (role !== 1) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }
  }

  // }
}
