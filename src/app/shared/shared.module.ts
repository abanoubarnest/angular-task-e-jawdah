import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Material CDK
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import { ToastrModule } from 'ngx-toastr';
import { CardComponent } from './components/card/card.component';
import { CountToDirective } from './directives/count-to.directive';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// Translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CardRecordsComponent } from './components/card-records/card-records.component';
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
// Group material modules for headless injection
const materialModules = [
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatToolbarModule,
  MatSelectModule,
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatCardModule,
  MatIconModule,
  MatSortModule,
  MatListModule,
  MatMenuModule,
  MatTabsModule,
  MatTooltipModule,
  MatDialogModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatChipsModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatStepperModule,
  MatRadioModule,
  MatGridListModule

];


@NgModule({
  declarations: [CardComponent, CountToDirective, CardRecordsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    HttpClientModule,
    RouterModule,
    ToastrModule.forRoot(),
    TranslateModule.forChild({
      defaultLanguage: 'en',
      isolate: false,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),


  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    CardRecordsComponent,
    ...materialModules,
    CountToDirective,
    TranslateModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
