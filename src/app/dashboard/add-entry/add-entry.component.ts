// TODO Update the add form to include all the extra propertys even though their set to ''

import {Component,  OnInit} from '@angular/core';
import {AddDataService} from "../../shared/addData.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit {
  // @ViewChild('form') signupForm: NgForm;
  showError:boolean = false;
  showSuccess:boolean = false;

  lanes = ['safe', 'mid' , 'off'];
  positions = [1,2,3,4,5];
  heroName: string;
  heroNickname: string;
  heroImgUrl: string;
  heroLanes: [string];
  heroPosition: [number];
  private heroMeta: any;
  private heroStatType: any;

  constructor(
    private sData: AddDataService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  onSubmit(form){
    console.log(form.value);

    this.heroName = form.value.heroName;
    this.heroNickname = form.value.heroNickname;
    this.heroImgUrl = form.value.heroImgUrl;
    this.heroLanes = form.value.heroLanes;
    this.heroPosition = form.value.heroPositions;
    this.heroMeta   = form.value.isMeta;
    this.heroStatType = form.value.statType;

    console.log(this.heroName);
    console.log(this.heroNickname);
    console.log(this.heroImgUrl);
    console.log(this.heroLanes);
    console.log(this.heroPosition);

    // const heroes = arrayOfBudget.map((obj)=> {return Object.assign({}, obj)});

    if (form.valid){
      this.sData.addHero(this.heroName, this.heroNickname, this.heroImgUrl, this.heroLanes, this.heroPosition, this.heroMeta, this.heroStatType);
      form.reset();
      this.showSuccess = true;
      this.showError = false;
    } else {
      this.showSuccess = false;
      this.showError =true;
    }



    // this.sData.addHero(this.heroName, this.heroNickname, this.heroImgUrl, this.heroLanes, this.heroPosition);

    // return

  }

}
