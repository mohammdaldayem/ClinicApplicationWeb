import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {  MatPaginator, MatTableDataSource, MatSort, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../_service/user.service';
import { AlertifyService } from '../../../_service/alertify.service';
import { User } from '../../../_model/User';
import { Visit } from '../../../_model/Visit';
import { Financial } from '../../../_model/Financial';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ConfirmValidParentMatcher, errorMessages, CustomValidators } from '../../../_model/CustomValidators';
import { FinancialInsert } from '../../../_model/FinancialInsert';
import { HttpClient } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { PrescriptionParent } from '../../../_model/PrescriptionParent';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './Patient-Profile.component.html',
  styleUrls: ['./Patient-Profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  displayedColumns = ['position', 'date', 'doctor', 'diagnosis', 'treatment', 'prescription', 'financial'];
  displayedColumnsForVisit = ['select', 'visitID' , 'visitTime' , 'treatment' , 'diagnosis', 'visitDate'];
  // tslint:disable-next-line:max-line-length
  displayedColumnsForFinancial = ['financialID' , 'visitid' , 'employeeID' , 'note', 'doctorName', 'financialDate', 'treatmentCost', 'patientCredit' , 'patientDebit', 'isDoctor'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  visitsSource = new MatTableDataSource<Visit>();
  financialSource = new MatTableDataSource<Financial>();
  selection = new SelectionModel<Visit>(false, []);
  selectedIndex = 0;
  user: User;
  prescriptions: Observable<PrescriptionParent[]>;
  financialInsert: FinancialInsert;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private http: HttpClient, public dialog: MatDialog,  private userService: UserService , private alertify: AlertifyService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'][0];
      this.user.visits = data['visit'];
      this.user.financial = data['financial'];
      this.visitsSource.data = this.user.visits;
      this.financialSource.data = this.user.financial;
    });
    this.dataSource.sort = this.sort;
    this.visitsSource.sort = this.sort;
    this.financialSource.sort = this.sort;
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.visitsSource.paginator = this.paginator;
    this.visitsSource.sort = this.sort;
    this.financialSource.sort = this.sort;
    this.financialSource.paginator = this.paginator;
   this.applyFilter('');
   this.userService.LoadPrescriptions().subscribe(response => {
    this.prescriptions = Observable.create((observer: Observer<PrescriptionParent[]>) => {
      setTimeout(() => {
        observer.next(<PrescriptionParent[]>response);
      }, 10);
    });
  });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filter = filterValue;
    this.visitsSource.filter = filterValue;
    this.visitsSource.paginator = this.paginator;
    this.visitsSource.sort = this.sort;
    this.financialSource.filter = filterValue;
    this.financialSource.sort = this.sort;
    this.financialSource.paginator = this.paginator;
  }

  setPositionValue(element: Element, value: number) {
    return element.position = value;
  }
  setPositionForVisit(element: Visit, value: number) {
    return element.visitID = value;
  }
  setPositionForFinancial(element: Financial, value: number) {
    return element.financialID = value;
  }
  openAddDialog(): void {
    const dialogRef = this.dialog.open(PatientDialogFinancialComponent, {
      data: { financial: this.financialInsert },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {

      this.financialInsert = result;
      this.financialInsert.PatientID = this.user.patientID;
      this.financialInsert.CreationDate = new Date();
      this.financialInsert.EmployeeID = 4 ;
      this.financialInsert.PaymentTypeID = 1;
      this.financialInsert.isDoctor = true ;
      this.http.post('http://localhost:4820/api/Financial/InseartPatientFinancial', this.financialInsert );
     // this.userService.AddPatientFinancialInfo(this.financialInsert);
    });
  }
  ChekeisVisiteSelected(Index: Number) {
    if (this.selectedIndex !== 0) {
     if (this.selection.selected.length <= 0) {
       this.selectedIndex = 0;
     alert('Please Select Visite');
     }
     if (this.selectedIndex === 2) {

     }
    }
  }
  LoadVisiteData(row) {
    this.selection.isSelected(row);
  }
  Loadprescription() {
    // tslint:disable-next-line:no-unused-expression
    this.selection.selected[0];
  }
}
export interface Element {
  position: number;
  date: string;
  doctor: string;
  diagnosis: string;
  treatment: string;
  prescription: string;
  financial: string;
}

const ELEMENT_DATA: Element[] = [
  // tslint:disable-next-line:max-line-length
  { position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
  // tslint:disable-next-line:max-line-length
  {position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
  // tslint:disable-next-line:max-line-length
  {position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
   // tslint:disable-next-line:max-line-length
  { position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
  // tslint:disable-next-line:max-line-length
  { position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
  // tslint:disable-next-line:max-line-length
  {position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
  // tslint:disable-next-line:max-line-length
  {position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
  // tslint:disable-next-line:max-line-length
  {position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
  // tslint:disable-next-line:max-line-length
  {position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
  // tslint:disable-next-line:max-line-length
  {position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
  // tslint:disable-next-line:max-line-length
  {position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
  // tslint:disable-next-line:max-line-length
  {position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
  // tslint:disable-next-line:max-line-length
  {position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
  // tslint:disable-next-line:max-line-length
  {position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
   // tslint:disable-next-line:max-line-length
  {position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
  // tslint:disable-next-line:max-line-length
  {position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
  // tslint:disable-next-line:max-line-length
  {position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
   // tslint:disable-next-line:max-line-length
  {position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
  // tslint:disable-next-line:max-line-length
  {position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
   // tslint:disable-next-line:max-line-length
  {position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},
  // tslint:disable-next-line:max-line-length
  {position: 0, date: '18-6-2018' , doctor: 'Dr.Dr rami' , diagnosis: '' , treatment: 'upper lower fixed appliances debonding removable retainer' , prescription: '' , financial: 'Treatment Cost: 0 Payment Amount: 100 Due Amount: 100 '},

];

@Component({
  selector: 'app-patient-dialog-financial',
  templateUrl: './financial-dialog.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientDialogFinancialComponent {


  constructor(
    public dialogRef: MatDialogRef<PatientDialogFinancialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FinancialInsert) {
      dialogRef.disableClose = true;
     }

  onNoClick(): void {
    this.dialogRef.close();
  }


  }
