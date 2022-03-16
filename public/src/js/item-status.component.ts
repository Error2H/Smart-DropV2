import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Validators, FormGroups, FormBuilder } from '@angular/forms';

@Component({
selector: 'public/src/js',
templateUrl: './item-status.component.html',
styleUrls: ['./item-status.component.scss']
})
export class ItemStatusComponent implements OnInit {

numberForm: FormGroup;

constructor() { }
ngOnInit() { }
}