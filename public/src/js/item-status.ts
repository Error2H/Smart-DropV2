
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';


@Component({
    selector: 'public',
    templateUrl: './parcel-status.component.html',
    styleUrls: ['./css/index.scss']
})
export class ParcelStatusComponent implements OnInit {

    phoneNumber: FormGroup;
    receiver: any;

    constructor(private db: AngularFireDatabase, private fb: FormBuilder) { }

    ngOnInit() {
        this.buildFrom();
        this.receiver = this.db.object('/users');
    }

    validateMinMax(min, max) {
        return ['', [
            Validators.required,
            Validators.minLength(min),
            Validators.maxLength(max),
            Validators.pattern('[0-9]+') // validates input us digit #TH+66
        ]];
    }

    buildFrom() {
        this.phoneNumber = this.fb.group({
            country: this.validateMinMax(1, 2),
            area: this.validateMinMax(3, 3),
            prefix: this.validateMinMax(3, 3),
            line: this.validateMinMax(4, 4)
        });
    }

    get e164() {
        const form = this.phoneNumber.value;
        const num = form.country + form.area + form.prefix + form.line;
        return `+${num}`;
    }

    updatePhoneNumber() {
        this.receiver.update({ phoneNumber: this.e164 });
    }

}
