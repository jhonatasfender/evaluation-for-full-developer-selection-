import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

import { ClientService } from '~services/client.service';
import { SnackbarComponent } from '~components/snackbar/snackbar.component';

@Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
    public frm: FormGroup;
    private data: any;

    constructor(
        // public dialogRef: MatDialogRef<FormsComponent>,
        private fb: FormBuilder,
        private clientService: ClientService,
        public snack: MatSnackBar
    ) { }

    onNoClick(): void {
        // this.dialogRef.close();
    }

    ngOnInit() {
        this.initializeForm();
    }

    openSnack(data: any) {
        this.snack.openFromComponent(SnackbarComponent, {
            data: { data: data },
            duration: 3000
        });
    }

    private initializeForm() {
        const IS_EDITING = this.data === 'edit';
        const data = this.data;

        this.frm = this.fb.group({
            name: new FormControl(IS_EDITING ? data.name : null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
            cpf: new FormControl(IS_EDITING ? data.cpf : null, [Validators.required, Validators.minLength(11)]),
            id: new FormControl(IS_EDITING ? data.id : null),
            address: this.fb.array([this.address()]),
            emails: this.fb.array([this.email()], [Validators.required]),
            phones: this.fb.array([this.phone()], [Validators.required])
        });
    }

    private address() {
        return this.fb.group({
            cep: new FormControl(0),
            city: new FormControl(''),
            id: new FormControl(0),
            neighborhood: new FormControl(''),
            street: new FormControl(''),
            state: new FormControl(''),
        })
    }

    private email() {
        return this.fb.group({
            email: new FormControl('', [Validators.email]),
            id: new FormControl(0),
        })
    }

    private phone() {
        return this.fb.group({
            phone: new FormControl(0),
            typePhone: new FormControl('CELLULAR'),
            id: new FormControl(0),
        })
    }

    public save(form: FormGroup) {
        this.clientService.save(form.value).subscribe((data: any) => {
            debugger
            this.openSnack(data);

            if (data.success) {
                // this.dialogRef.close(true);
            }
        });
    }

    public getNameErrorMessage() {
        return this.frm.controls.name.hasError('required') ? 'First name is required' :
            this.frm.controls.name.hasError('minlength') ? 'Al menos 2 caracteres' : '';
    }

    public getCPFErrorMessage() {
        return this.frm.controls.cpf.hasError('required') ? 'Last name is required' :
            this.frm.controls.cpf.hasError('minlength') ? 'Al menos 2 caracteres' : '';
    }

    public addAddress() {
        this.getAddressControlsFormArray.push(this.address());
    }

    public addEmail() {
        this.getEmailControlsFormArray.push(this.email());
    }

    public addPhone() {
        this.getPhoneControlsFormArray.push(this.phone());
    }

    public removeAddress(key: number) {
        this.getAddressControlsFormArray.removeAt(key);
    }

    get getAddressControlsFormArray() {
        return (this.frm.get('address') as FormArray)
    }

    get getEmailControlsFormArray() {
        return (this.frm.get('emails') as FormArray)
    }

    get getPhoneControlsFormArray() {
        return (this.frm.get('phones') as FormArray)
    }

    public getAddressControls(address: FormGroup, key: string) {
        return address.get(key)
    }

    public getEmailControls(email: FormGroup, key: string) {
        return email.get(key)
    }

    public getPhoneControls(phone: FormGroup, key: string) {
        return phone.get(key)
    }

}
