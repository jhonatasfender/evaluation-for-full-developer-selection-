import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs/operators';
import { CEP } from '~app/models/cep';
import { Address, Client, Email, Phone, TyptePhone } from '~app/models/client';
import { CEPService } from '~app/services/cep.service';
import { ClientService } from '~services/client.service';

@Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
    public frm: FormGroup;
    private data: any;
    public typePhone = TyptePhone;
    public maskPhone = "(00) 0000-0000"
    public isLoading = true

    constructor(
        private cep: CEPService,
        private fb: FormBuilder,
        private clientService: ClientService,
        public snack: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.initializeForm();
    }

    private initializeForm() {
        const id = this.route.snapshot.paramMap.get('id')
        this.frm = this.fb.group({
            name: new FormControl(
                null,
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(100),
                    Validators.pattern('^[A-Za-z0-9 ]*[A-Za-z0-9][A-Za-z0-9 ]*$')
                ]
            ),
            cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
            id: new FormControl(null),
            address: this.fb.array(id ? [] : [this.address()]),
            emails: this.fb.array(id ? [] : [this.email()], [Validators.required]),
            phones: this.fb.array(id ? [] : [this.phone()], [Validators.required])
        });

        if (id) {
            this.clientService.getOne(parseInt(id))
                .pipe(tap((client: Client) => this.frm.patchValue({
                    id: client.id,
                    name: client.name,
                    cpf: client.cpf
                })))
                .subscribe((client: Client) => {
                    for (const address of client.address) this.addAddress(address)
                    for (const email of client.emails) this.addEmail(email)
                    for (const phone of client.phones) this.addPhone(phone)
                    this.isLoading = false
                });
        } else
            this.isLoading = false
    }

    private address(address: Address = null) {
        const form = this.fb.group({
            cep: new FormControl(address ? address.cep : ''),
            city: new FormControl(address ? address.city : ''),
            id: new FormControl(address ? address.id : null),
            neighborhood: new FormControl(address ? address.neighborhood : ''),
            street: new FormControl(address ? address.street : ''),
            state: new FormControl(address ? address.state : ''),
        })
        form.get('cep').valueChanges
            .pipe(
                filter((v: string) => v && v.toString().length === 8),
                switchMap((v: string) => {
                    this.isLoading = true
                    return this.cep.search(v)
                }),
            )
            .subscribe((v: CEP) => {
                this.isLoading = false
                form.patchValue({
                    id: null,
                    city: v.localidade,
                    neighborhood: v.logradouro,
                    street: v.bairro,
                    state: v.uf
                })
            })
        return form;
    }

    private email(email: Email = null) {
        return this.fb.group({
            email: new FormControl(email ? email.email : '', [Validators.required, Validators.email]),
            id: new FormControl(email ? email.id : null),
        })
    }

    private phone(phone: Phone = null) {
        const form = this.fb.group({
            phone: new FormControl(phone ? phone.phone : '', [Validators.required]),
            typePhone: new FormControl(phone ? phone.typePhone : '', [Validators.required]),
            id: new FormControl(phone ? phone.id : null),
        })
        form.get('typePhone').valueChanges
            .pipe(filter(v => v))
            .subscribe(v => {
                if (v == TyptePhone.CELLULAR)
                    this.maskPhone = "(00) 0 0000-0000"
                else
                    this.maskPhone = "(00) 0000-0000"
            })
        return form
    }

    public save(form: FormGroup) {
        if (this.frm.valid)
            this.clientService.save(form.value).subscribe((data: Client) => {
                if (data) {
                    this.router.navigate(['/client']);
                }
            });
    }

    public getNameErrorMessage() {
        return this.frm.controls.name.hasError('required') ? 'Por favor preencha esse campo, esse campo é obrigatório!' :
            this.frm.controls.name.hasError('minlength') ? 'O mínimo de caractere permitido são três, por favor preencha a quantidade exigida!' :
                this.frm.controls.name.hasError('pattern') ? 'É permitido somente letras, espaços e números, por favor solicito que cumpra a regra estabelecida!' : '';
    }

    public getCPFErrorMessage() {
        return this.frm.controls.cpf.hasError('required') ? 'Por favor preencha esse campo, esse campo é obrigatório!' : '';
    }

    public addAddress(address: Address = null) {
        this.getAddressControlsFormArray.push(this.address(address));
    }

    public addEmail(email: Email = null) {
        this.getEmailControlsFormArray.push(this.email(email));
    }

    public addPhone(phone: Phone = null) {
        this.getPhoneControlsFormArray.push(this.phone(phone));
    }

    public removeAddress(key: number) {
        this.getAddressControlsFormArray.controls.length > 1 && this.getAddressControlsFormArray.removeAt(key);
    }

    public removePhone(key: number) {
        this.getPhoneControlsFormArray.controls.length > 1 && this.getPhoneControlsFormArray.removeAt(key);
    }

    public removeEmail(key: number) {
        this.getEmailControlsFormArray.controls.length > 1 && this.getEmailControlsFormArray.removeAt(key);
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
