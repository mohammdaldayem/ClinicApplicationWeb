import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { SidenavService } from './_service/sidenav/sidenav.service';
import { SidenavComponent } from './sidenav/sidenav.component';
// tslint:disable-next-line:max-line-length
import {PatientCardComponent, PatientDialogRegistrationComponent, PatientDialogEditComponent} from './members/Patients/Patient-Card/Patient-Card.component';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatGridListModule} from '@angular/material/grid-list';
import { LoginComponent } from './login/login.component';
import { PatientProfileComponent, PatientDialogFinancialComponent } from './members/Patients/Patient-Profile/Patient-Profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PatientRegistrationComponent } from './members/Patients/patient-registration/patient-registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { AlertifyService } from './_service/alertify.service';
import { UserService } from './_service/user.service';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
 import { HttpModule } from '@angular/http';
import { MemberVisitsResolver } from './_resolvers/member-visits.resolver';
import { MemberFinancialResolver } from './_resolvers/member-Financial.resolver';
import { TeethComponent } from './teeth/teeth.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
@NgModule({
  declarations: [AppComponent,
    SidenavComponent, PatientCardComponent ,
    LoginComponent, PatientProfileComponent,
    PatientRegistrationComponent,
    PatientDialogRegistrationComponent,
    PatientDialogEditComponent,
    PatientDialogFinancialComponent,
    TeethComponent
],
imports: [
  BrowserModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  RouterModule.forRoot(appRoutes),
  BrowserAnimationsModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatCardModule,
  MatTabsModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatGridListModule,
  FlexLayoutModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  AngularSvgIconModule
],
exports: [
  BrowserModule,
  FormsModule,
  BrowserAnimationsModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatCardModule,
  MatTabsModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatInputModule,
  MatListModule,
  MatGridListModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
],



  providers: [SidenavService, MediaMatcher,
    AlertifyService,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberVisitsResolver,
    MemberFinancialResolver
    ],
  bootstrap: [AppComponent],
  entryComponents: [
    PatientDialogRegistrationComponent,
    PatientDialogEditComponent,
    PatientDialogFinancialComponent
  ]
})
export class AppModule {}
