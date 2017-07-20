import { Component, OnInit, Input} from '@angular/core';
import { SessionService} from '../../services/SessionService';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { DepreciationService } from "../services/depreciation.service";

@Component({
    selector: 'as-assets',
    templateUrl: '../templates/depreciation-classes.html',
    styleUrls: [
        '../styles/depreciation.css'
    ],
    providers: [FormBuilder]
})

export class DepreciationClassesComponent implements OnInit {
  public userDisplayDetails: any = '';
    public isAuthenticated: boolean = false;
    public loading: boolean = false;
    private classes_list: any = [];
    constructor(
        private _sessionService: SessionService,
        private _depreciationService: DepreciationService,
        private fb: FormBuilder
    ) {

    }

    ngOnInit() {
      this.getClasses();
    }

    getClasses() {
        this.loading = true;
        this._depreciationService.getDepreciationClasses().subscribe((res) => {
           this.classes_list = JSON.parse(res._body);
           console.log(this.classes_list);
           this.loading = false;
        }, (error) => {
              this.loading = false;
              console.log(error);
        })
    }



}
