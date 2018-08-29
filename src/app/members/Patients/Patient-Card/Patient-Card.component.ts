import { Component, OnInit, Input, Inject, HostListener } from '@angular/core';
import { User } from '../../../_model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConfirmValidParentMatcher, errorMessages, CustomValidators } from '../../../_model/CustomValidators';
import { AlertifyService } from '../../../_service/alertify.service';
import { UserService } from '../../../_service/user.service';

@Component({
  selector: 'app-patient-card',
  templateUrl: './Patient-Card.component.html',
  styleUrls: ['./Patient-Card.component.css']
})
export class PatientCardComponent implements OnInit {
  users: User[];
  loaded: boolean;
  user: User;
  imageUrl: string;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private userService: UserService , private alertify: AlertifyService,  private router: Router ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
    this.loaded = false;
    this.imageUrl = this.userService.imageUrl;
   // this.loadUsers();
  }

  openRegistrationDialog(): void {
    const dialogRef = this.dialog.open(PatientDialogRegistrationComponent, {
      data: { user: this.user },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      result.user = null;
      this.user = result;
      this.users.push(this.user);
    });
  }
  openEditDialog(): void {
    const dialogRef = this.dialog.open(PatientDialogEditComponent, {
      data: { user: this.user },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.user = result;
    });
  }
  navigateToPatientProfile(id: number) {
    this.router.navigate(['/patients', id]);
  }
  loadUsers() {
    this.userService.GetPatients().subscribe((res: User[]) => {
      this.users = res;

    }, error => {
      this.alertify.error(error);
    });
  }
}
@Component({
  selector: 'app-patient-dialog-registration',
  templateUrl: './registration-dialog.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientDialogRegistrationComponent implements OnInit {
  registerForm: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(
    public dialogRef: MatDialogRef<PatientDialogRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
      dialogRef.disableClose = true;
     }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      FirstName: ['', [
          Validators.required
      ]],
      LastName: ['', [
        Validators.required
    ]],
    Age: ['', [
      Validators.required
  ]],
      emailGroup: this.fb.group({
        Email: ['', [
              Validators.required,
              Validators.email
          ]]
      }, { validator: CustomValidators.childrenEqual}),

  });
    }

}

@Component({
  selector: 'app-patient-dialog-edit',
  templateUrl: './registration-dialog.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientDialogEditComponent implements OnInit {
  registerForm: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  constructor(
    public dialogRef: MatDialogRef<PatientDialogRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User, private fb: FormBuilder) {
      dialogRef.disableClose = true;
     }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      FirstName: ['', [
          Validators.required
      ]],
      LastName: ['', [
        Validators.required
    ]],
    Age: ['', [
      Validators.required
  ]],
      emailGroup: this.fb.group({
        Email: ['', [
              Validators.required,
              Validators.email
          ]]
      }, { validator: CustomValidators.childrenEqual}),

  });
    }

}
