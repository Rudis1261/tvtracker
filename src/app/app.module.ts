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
import { ResetPasswordComponent } from './shared/reset-password/reset-password.component';
import { MsgBoxComponent } from './shared/msg-box/msg-box.component';
import { DesktopComponent } from './shared/desktop/desktop.component';
import { MobileComponent } from './shared/mobile/mobile.component';
import { BoxComponent } from './shared/box/box.component';

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
import { AuthGuardService } from './services/auth-guard.service';
import { LoadscriptService } from './services/loadscript.service';
import { DeviceService } from './services/device.service';
import { TokenRingService } from './services/token-ring.service';
import { ContactService } from './services/contact.service';
import { FcmService } from './services/fcm.service';
import { LoadedService } from './services/loaded.service';

// Directives
import { EqualValidator } from './equal-validator.directive';
import { ContactComponent } from './shared/contact/contact.component';
import { BugreportComponent } from './shared/bugreport/bugreport.component';
import { TestComponent } from './shared/test/test.component';
import { ShowComponent } from './shared/show/show.component';
import { KeysPipe } from './pipes/keys.pipe';
import { AutofocusDirective } from './directives/autofocus.directive';
import { AlertsComponent } from './shared/alerts/alerts.component';
import { TypeaheadComponent } from './shared/typeahead/typeahead.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { ReadMorePipe } from './pipes/read-more.pipe';
import { SwiperPlaceholderComponent } from './shared/swiper-placeholder/swiper-placeholder.component';
import { AdminComponent } from './shared/admin/admin.component';
import { UcfirstPipe } from './pipes/ucfirst.pipe';

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
    ActivationComponent,
    ResetPasswordComponent,
    MsgBoxComponent,
    DesktopComponent,
    MobileComponent,
    BoxComponent,
    ContactComponent,
    BugreportComponent,
    TestComponent,
    ShowComponent,
    KeysPipe,
    AutofocusDirective,
    AlertsComponent,
    TypeaheadComponent,
    HighlightPipe,
    ReadMorePipe,
    SwiperPlaceholderComponent,
    AdminComponent,
    UcfirstPipe
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
    AuthGuardService,
    ModalComponent,
    LoadscriptService,
    DeviceService,
    TokenRingService,
    ContactService,
    FcmService,
    LoadedService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
