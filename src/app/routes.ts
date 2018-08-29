import { Routes } from '@angular/router';
import {PatientCardComponent} from './members/Patients/Patient-Card/Patient-Card.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import { LoginComponent } from './login/login.component';
import { PatientProfileComponent } from './members/Patients/Patient-Profile/Patient-Profile.component';
import { PatientRegistrationComponent } from './members/Patients/patient-registration/patient-registration.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberVisitsResolver } from './_resolvers/member-visits.resolver';
import { MemberFinancialResolver } from './_resolvers/member-Financial.resolver';
import { TeethComponent } from './teeth/teeth.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'sidenav', component: SidenavComponent },
  {
    path: '',
    children: [
    { path: 'home', component: PatientCardComponent  , resolve: {users: MemberListResolver} },
    // tslint:disable-next-line:max-line-length
    { path: 'patients/:id', component: PatientProfileComponent ,  resolve: {user: MemberDetailResolver, visit: MemberVisitsResolver, financial: MemberFinancialResolver}}

    ]
  },

  {path: 'patient-registration', component: PatientRegistrationComponent},
  { path: 'login', component: LoginComponent },
  { path: 'teeth', component: TeethComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
