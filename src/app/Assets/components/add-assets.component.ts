import { Component, OnInit, Input} from '@angular/core';
import { SessionService} from '../../services/SessionService';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ValidationService } from '../../Validators/ValidationService';
import { AssetsService } from "../services/assets.service";
import { UserService } from "../../Account/services/user.service";
import { DepreciationService } from "../../Depreciation/services/depreciation.service";

@Component({
    selector: 'as-add-assets',
    templateUrl: '../templates/add-assets.html',
    styleUrls: [
        '../styles/assets.css'
    ],
    providers: [FormBuilder]
})

export class AddAssetsComponent implements OnInit {
    public userDisplayDetails: any = '';
    public isAuthenticated: boolean = false;
    public loading: boolean = false;
    private assignee_list: any = [];
    private classes_list: any = [];

    constructor(
        private _sessionService: SessionService,
        private _assetsService: AssetsService,
        private _userService: UserService,
        private _depreciationService: DepreciationService,
        private fb: FormBuilder
    ) {
        this.getAssignee();
        this.getDepreciationClasses();
    }

    ngOnInit() {
      this.loading = true;
      this.isAuthenticated = this._sessionService.isLoggedIn();
        if (this.isAuthenticated) {
        }
      this.loading = false;
    }

    getAssignee() {
      this.loading = true;
      this._userService.get_Assignees().subscribe((res) => {
            this.assignee_list = res;
            this.loading = false;
      } , (error)=> {
            console.log(error);
            this.loading = false;
      });

    }
    getDepreciationClasses() {
      this.loading = true;
      this._depreciationService.getDepreciationClasses().subscribe((res) => {
          this.classes_list = res;
          this.loading = false;
      }, (error) => {
          console.log(error);
          this.loading = false;
      })
    }
    editAsset(id) {
      console.log(id);
    }


    deleteAsset(id) {
      console.log(id);
    }



}
