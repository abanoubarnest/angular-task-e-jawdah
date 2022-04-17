
import { Component, OnInit, OnDestroy, ChangeDetectorRef, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { dashboardRoutes, RouteInfo } from '../../dashboard.routes';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { LocalStorageUtilsService } from 'src/app/core/services/util/local-storage-utils.service';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';
import { MatRadioChange } from '@angular/material/radio';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  menuList: RouteInfo[] = dashboardRoutes;
  user: any = null;
  nav_position: 'start' | 'end' = "start";
  public systemLanguage: any = "en";
  public languages = [
    { label: "English", name: 'en', dir: 'ltr' },
    { label: "Arabic", name: 'ar', dir: 'rtl' }];

  constructor(private auth: AuthenticationService, private renderer: Renderer2, private cd: ChangeDetectorRef,
    private localStorageUtilsService: LocalStorageUtilsService, private translate: TranslateService,
    private dateAdapter: DateAdapter<Date>) {
    this.loadLoggedInUserProfile();
    this.initialSettings();
    this.localStorageUtilsService.localStorageSubscriber().subscribe((systemLanguage: any) => {
      // debugger
      if (localStorage.getItem("lang")) {
        this.initialSettings();
      }

    });
  }

  ngOnInit(): void {
  }
  loadLoggedInUserProfile() {
    if (this.auth.getCurrentUser()) {
      this.user = this.auth.getCurrentUser();
    }
  }
  logout() {
    this.auth.logout();
  }
  changeLang(e?: MatRadioChange) {
    debugger
    localStorage.setItem("lang", e.value ? e.value : this.systemLanguage);
    if (localStorage.getItem('lang') === 'ar') {
      this.localStorageUtilsService.setItem("dir", "rtl");
      this.localStorageUtilsService.setItem("lang", "ar");
      this.dateAdapter.setLocale('ar');
    } else {
      this.localStorageUtilsService.setItem("dir", "ltr");
      this.localStorageUtilsService.setItem("lang", "en");
      this.dateAdapter.setLocale('an');
    }
    this.setLang();

  }
  initialSettings() {
    if (localStorage.getItem("lang") === null) {
      this.localStorageUtilsService.setItem("dir", "ltr");
      this.localStorageUtilsService.setItem("lang", "en");
      this.translate.setDefaultLang('en');
    }
    else {
      this.setLang();
    }

  }
  setLang() {
    this.systemLanguage = (localStorage.getItem('lang') === 'ar') ? "ar" : "en";
    const dir = localStorage.getItem("dir");
    const lang = localStorage.getItem("lang");
    this.nav_position = 'start';
    if (lang == 'ar') {

      this.nav_position = 'end';
    }

    this.renderer.setAttribute(document.querySelector('body'), 'dir', dir);
    //  this.renderer.setAttribute(document.querySelector('body'), 'dir', 'ar');
    this.renderer.setAttribute(document.querySelector('html'), 'lang', lang);
    this.translate.use(lang)
   // this.cd.detectChanges();
  }

}

