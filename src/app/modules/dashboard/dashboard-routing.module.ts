import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'books',
        loadChildren: () => import('../books/books.module').then((m) => m.BooksModule),
     //    canActivate: [AuthGuard],
      },
      {
        path: 'categories',
        loadChildren: () => import('../categories/categories.module').then((m) => m.CategoriesModule),
       //  canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: 'dashboard'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
