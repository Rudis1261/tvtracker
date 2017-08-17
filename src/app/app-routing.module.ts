import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SeriesComponent } from './series/series.component';
import { BugreportComponent } from './shared/bugreport/bugreport.component';
import { ContactComponent } from './shared/contact/contact.component';
import { NotFoundComponent} from './not-found/not-found.component';

import { ActivationComponent } from './shared/activation/activation.component';
import { ResetPasswordComponent } from './shared/reset-password/reset-password.component';
import { TestComponent } from './shared/test/test.component';
//import { AuthGuard } from './services/auth.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'activate/:email/:code',  component: ActivationComponent },
  { path: 'reset-password/:code',  component: ResetPasswordComponent },
  { path: 'series',  component: SeriesComponent },
  { path: 'report-bug',  component: BugreportComponent },
  { path: 'contact',  component: ContactComponent },
  { path: 'test',  component: TestComponent },
  //{ path: 'style',  component: StyleguideComponent, canActivate: [AuthGuard] },
  { path: '404',  component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
