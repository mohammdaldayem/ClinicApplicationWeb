import { Photo } from './Photo';
import { Visit } from './Visit';
import { Financial } from './Financial';
export class User {
    PatientNo: number;
    PatientID: number;
    patientID: number;
    patientNo: number;
    PatientName: string;
    gender: string;
    age: number;
    drName: string;
    creationDate: Date;
    FromDate: Date;
    ToDate: Date;
    mobilenumber2: string;
    mobileNumber: string;
    patientName: string;
    photos?: Photo[];
    visits: Visit[];
    financial: Financial[];
}
