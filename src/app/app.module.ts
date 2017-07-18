import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
//import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database'
import { environment } from '../environments/environment';

// Layout Components
import { NavHeaderComponent } from './nav-header.component';
import { NavFooterComponent } from './nav-footer.component';
import { Loading } from './loading.component';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModalComponent } from './modal/modal.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LazyComponent } from './lazy.component';
import { SeriesComponent } from './series/series.component';
import { ActivationComponent } from './shared/activation/activation.component';

// Pipes
import { TitleCasePipe } from './pipes/title-case.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { LengthPipe } from './pipes/length.pipe';
import { LimitToPipe } from './pipes/limit-to.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { SlugifyPipe } from './pipes/slugify.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';

// Services
import { AuthService } from './services/auth.service';
import { LoadscriptService } from './services/loadscript.service';
import { DeviceService } from './services/device.service';

// Directives
import { EqualValidator } from './equal-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavHeaderComponent,
    NavFooterComponent,
    Loading,
    LoginComponent,
    TitleCasePipe,
    ModalComponent,
    FilterPipe,
    LengthPipe,
    NotFoundComponent,
    LazyComponent,
    LimitToPipe,
    SafePipe,
    SearchPipe,
    SlugifyPipe,
    OrderByPipe,
    SeriesComponent,
    EqualValidator,
    ActivationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AngularFireDatabase,
    AuthService,
    ModalComponent,
    LoadscriptService,
    DeviceService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
