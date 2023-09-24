import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from '../shared.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const services = inject(SharedService);
  const res: any = await services.refreshLogin();
  if (res && localStorage.getItem('jwt')) {
    localStorage.setItem('jwt', res.new_token);
    return true;
  } else {
    router.navigate(['/login']);
    localStorage.removeItem('jwt');
    return false;
  }
};
