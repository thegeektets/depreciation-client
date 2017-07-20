import { Component, OnInit, Input} from '@angular/core';
import { SessionService} from '../../services/SessionService';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
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
    private assetForm: FormGroup;
    private errorMsg: any;
    private sucsMsg: string;

    constructor(
        private _sessionService: SessionService,
        private _assetsService: AssetsService,
        private _userService: UserService,
        private _depreciationService: DepreciationService,

    ) {

    }

    ngOnInit() {
      this.loading = true;
      this.isAuthenticated = this._sessionService.isLoggedIn();
        if (this.isAuthenticated) {
          this.getAssignee();
          this.getDepreciationClasses();
          this.buildAssetForm();
        }
      this.loading = false;
    }

    buildAssetForm() {
      this.assetForm = new FormGroup({
        title: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        doa: new FormControl('', Validators.required),
        serialnumber: new FormControl('', Validators.required),
        assignee_id: new FormControl('', Validators.required),
        depreciation_id: new FormControl('', Validators.required),
      });
    }
    getAssignee() {
      this.loading = true;
      this._userService.get_Assignees().subscribe((res) => {
            this.assignee_list = res;
            this.loading = false;
      } , (error) => {
            console.log(error);
            this.loading = false;
      });

    }
    getDepreciationClasses() {
      this.loading = true;
      this._depreciationService.getDepreciationClasses().subscribe((res) => {
          this.classes_list = JSON.parse(res._body);
          this.loading = false;
      }, (error) => {
          console.log(error);
          this.loading = false;
      })
    }

    addNewAsset() {
      let asset_data = this.assetForm.getRawValue();
      this._assetsService.post(JSON.stringify(asset_data)).subscribe((res) => {
         console.log(res);
         this.sucsMsg = 'successfully added new asset';
         this.assetForm.reset()
      }, (error) => {
         console.log(error);
         this.errorMsg = error;
      })

    }



}
