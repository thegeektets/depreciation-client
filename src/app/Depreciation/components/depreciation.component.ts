import { Component, OnInit, Input} from '@angular/core';
import { SessionService} from '../../services/SessionService';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { DepreciationService } from "../services/depreciation.service";
import * as jsPDF from 'jspdf';
import * as autotable from 'jspdf-autotable';


@Component({
    selector: 'as-assets',
    templateUrl: '../templates/depreciation.html',
    styleUrls: [
        '../styles/depreciation.css'
    ],
    providers: [FormBuilder]
})

export class DepreciationComponent implements OnInit {

    public userDisplayDetails: any = '';
    public isAuthenticated: boolean = false;
    public loading: boolean = false;
    private depreciationlist: any = {};
    private start_date: string = '';
    private end_date: string = '';
    private year: string ='';
    private total_depreciation_value: number = 0;
    private total_assets_value: number = 0;
    private total_assets_cost: number = 0;
    constructor(
        private _sessionService: SessionService,
        private _depreciationService: DepreciationService,
        private fb: FormBuilder
    ) {

    }

    ngOnInit() {
      this.calculateDepreciation();
    }

    exporttoPdf() {

      let columns = ["Asset", "Date of Acquisition" , "Serial Number", "Cost of Acquisition", "Depreciation Rate" ,
        "Monthly Depreciation", "Total Depreciation", "Value of Asset"];
      let rows = [];
      for(let i = 0;  i < this.depreciationlist.length; i++){
        rows[i] = [this.depreciationlist[i].title , this.depreciationlist[i].doa ,
          this.depreciationlist[i].serialnumber ,  this.depreciationlist[i].price ,
          this.depreciationlist[i].depreciation.rate ,
          this.depreciationlist[i].depreciation_results[this.depreciationlist[i].depreciation_results.length - 1].depriciation ,
          this.depreciationlist[i].price - this.depreciationlist[i].depreciation_results[this.depreciationlist[i].depreciation_results.length - 1].value ,
          this.depreciationlist[i].depreciation_results[this.depreciationlist[i].depreciation_results.length - 1].value
        ]
      }

      rows[rows.length] = ['TOTAL','','',this.total_assets_cost,'','',this.total_depreciation_value, this.total_assets_value];
      let doc = new jsPDF('l', 'pt' );    autotable;
      doc.autoTable(columns, rows);
      doc.save('depreciation.pdf');

    }
    depreciationCalc() {
      let today = new Date();
      let mm = today.getMonth()+1; //January is 0!
      let yy = today.getFullYear();

      this.depreciationlist = this.depreciationlist.results;
      /*
      * monthly rate
      * cost = 20000
      * 3 months
      * 1st month depreciation value = cost * rate
      * 1st month value = cost * 1 - rate
      * 2nd month depreciation value = cost * rate
      * everything below 15days is not accounted for as a month
      *
      * 0*/
      for(let i = 0 ; i < this.depreciationlist.length; i++) {
          let start = new Date(this.depreciationlist[i].doa);
          let cost = this.depreciationlist[i].price;
          let value = cost;
          let rate = this.depreciationlist[i].depreciation.rate;
          let sm = start.getMonth()+1;
          let sy = start.getFullYear();

          if(sy === yy){
             if(mm === sm) {
               console.log('same month same year');
               if(typeof (this.depreciationlist[i].depreciation_results) !== 'undefined') {
                 this.depreciationlist[i].depreciation_results.push({'month':sm +'-'+sy , 'value':cost, 'depriciation': 0});
               } else {
                  this.depreciationlist[i].depreciation_results = [];
                  this.depreciationlist[i].depreciation_results[0] = {'month':sm +'-'+sy , 'value':cost, 'depriciation': 0};
               }
             } else {
               console.log('different month same year');
               let k = mm - sm;
               for(let m =1 ; m <= k; m++ ) {
                  let depreciation = cost * rate;
                  value = cost - (depreciation * m);
                  if(value < 0){
                      value  = 0;
                    }
                  if(typeof (this.depreciationlist[i].depreciation_results) !== 'undefined') {
                      this.depreciationlist[i].depreciation_results.push({'month':(sm+m)+'-'+sy , 'value':value , 'depriciation': depreciation});
                  } else {
                      this.depreciationlist[i].depreciation_results = [];
                      this.depreciationlist[i].depreciation_results[0] = {'month':sm+'-'+sy , 'value':value  , 'depriciation': depreciation};
                  }
               }
             }
          }
          else {
              let end_month = 12;
              let start_month = sm;
              let start_year = sy;
              let dy = yy-sy;
              console.log(dy);

              for(let y = 0; y <= dy; y++ ) {
                 console.log(sy);
                 console.log(yy);
                 if(y==dy){
                      end_month = mm;
                 }
                 let k = end_month - start_month;

                 for(let m =0 ; m <= k; m++ ) {
                    let depreciation = cost * rate;
                    value -= depreciation;
                    if(value < 0){
                      value  = 0;
                    }
                    if(typeof (this.depreciationlist[i].depreciation_results) !== 'undefined') {
                        this.depreciationlist[i].depreciation_results.push({'month':(start_month+m)+'-'+start_year , 'value':value , 'depriciation': depreciation});
                    } else {
                        this.depreciationlist[i].depreciation_results = [];
                        this.depreciationlist[i].depreciation_results[0] = {'month':start_month+'-'+start_year , 'value':value  , 'depriciation': depreciation};
                    }
                 }
                start_month = 1;
                start_year++;
              }

          }

      }
    }
    calculateDepreciation() {
        let start_date = this.start_date;
        let end_date = this.end_date;
        this._depreciationService.getDepreciation(start_date, end_date)
          .subscribe((res) => {
              this.depreciationlist = JSON.parse(res._body);;
              this.depreciationCalc();
              this.calculateDepSummary();
              console.log(this.depreciationlist);

          } ,(error)=>{
            console.log (error);
          })
    }

    getAssetsCost(assets) {
      for(let i = 0; i < assets.length; i++) {
          this.total_assets_cost += parseInt(assets[i]['price']);
          console.log(assets[i]['price']);
          console.log(this.total_assets_cost);
      }

    }

    getAssetsValue(assets) {
      for(let i = 0; i < assets.length; i++) {
        this.total_assets_value += assets[i].depreciation_results[assets[i].depreciation_results.length - 1].value;
      }
    }

    getDepreciationValue() {
      this.total_depreciation_value = this.total_assets_cost - this.total_assets_value;

    }
     calculateDepSummary() {
        let start_date = this.start_date;
        let end_date = this.end_date;
        this._depreciationService.getDepreciation(start_date, end_date)
          .subscribe((res) => {
              this.depreciationlist = JSON.parse(res._body);;
              this.depreciationCalc();
              this.getAssetsCost(this.depreciationlist);
              this.getAssetsValue(this.depreciationlist);
              this.getDepreciationValue();
              console.log(this.depreciationlist);

          } , (error) => {
            console.log (error);
          })
    }

}
