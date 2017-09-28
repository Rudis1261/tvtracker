import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SeriesComponent } from './series/series.component';
import { BugreportComponent } from './shared/bugreport/bugreport.component';
import { ContactComponent } from './shared/contact/contact.component';
import { ShowComponent } from './shared/show/show.component';
import { NotFoundComponent} from './not-found/not-found.component';

import { ActivationComponent } from './shared/activation/activation.component';
import { ResetPasswordComponent } from './shared/reset-password/reset-password.component';
import { TestComponent } from './shared/test/test.component';
import { AdminComponent } from './shared/admin/admin.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'activate/:email/:code',  component: ActivationComponent },
  { path: 'reset-password/:code',  component: ResetPasswordComponent },
  { path: 'show/:slug',  component: ShowComponent },
  { path: 'series',  component: SeriesComponent, canActivate: [ AuthGuardService ] },
  { path: 'report-bug',  component: BugreportComponent },
  { path: 'contact',  component: ContactComponent },
  { path: 'admin',  component: AdminComponent, canActivate: [ AuthGuardService ], data: { roles: 'admin' } },
  { path: 'admin/:type',  component: AdminComponent, canActivate: [ AuthGuardService ], data: { roles: 'admin' } },
  { path: 'test',  component: TestComponent, canActivate: [ AuthGuardService ], data: { roles: 'admin' } },
  { path: '404',  component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ ]
})
export class AppRoutingModule { }
