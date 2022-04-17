import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, takeUntil, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {
  @Output() toggleSideBar: EventEmitter<boolean> = new EventEmitter(false);

  compLifeCycle: Subject<any> = new Subject();
  isSideBarClosed: boolean = false;
  user: any = null;
  constructor(private auth: AuthenticationService) {
    this.loadLoggedInUserProfile();
  }

  ngOnInit(): void {
  }
  onToggleSideBar() {
    this.isSideBarClosed = !this.isSideBarClosed;
    this.toggleSideBar.emit(this.isSideBarClosed);
  }
  loadLoggedInUserProfile() {
    if (this.auth.getCurrentUser()) {
      this.user = this.auth.getCurrentUser();
    }
  }
  logout() {
    this.auth.logout();
  }
}
