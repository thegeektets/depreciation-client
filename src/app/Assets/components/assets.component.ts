import { Component, OnInit, Input} from '@angular/core';
import { SessionService} from '../../services/SessionService';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ValidationService } from '../../Validators/ValidationService';
import { AssetsService } from "../services/assets.service";

@Component({
    selector: 'as-assets',
    templateUrl: '../templates/assets.html',
    styleUrls: [
        '../styles/assets.css'
    ],
    providers: [FormBuilder]
})

export class AssetsComponent implements OnInit {
    public userDisplayDetails: any = '';
    public isAuthenticated: boolean = false;
    public loading: boolean = false;
    private assetslist: any = {};

    constructor(
        private _sessionService: SessionService,
        private _assetsService: AssetsService,
        private fb: FormBuilder
    ) {

    }

    ngOnInit() {
      this.loading = true;
      this.isAuthenticated = this._sessionService.isLoggedIn();
        if (this.isAuthenticated) {
          this.getAssets();
        }
      this.loading = false;
    }

    getAssets() {
      this._assetsService.getList().subscribe((res)=>{
        this.assetslist = res;
        console.log(this.assetslist);
      },(error) => {
          console.log(error);
      });
    }

    editAsset(id) { 
      console.log(id); 
    } 
    deleteAsset(id) { 
      console.log(id); 
    } 



}
