import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {

  constructor( private router: Router ) {}
  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login'])
  }
}
