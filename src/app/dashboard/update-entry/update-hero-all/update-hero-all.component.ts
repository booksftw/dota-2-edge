import { Component, OnInit } from '@angular/core';
import {UpdateDataService} from "../../../shared/updateData.service";
import {GetDataService} from "../../../shared/getData.service";

@Component({
  selector: 'app-update-hero-all',
  templateUrl: './update-hero-all.component.html',
  styleUrls: ['./update-hero-all.component.css']
})
export class UpdateHeroAllComponent implements OnInit {
  private heroId;
  private entireHeroCollectionId: [{}];

  constructor(
    private upFirebase: UpdateDataService,
    private getFirebase: GetDataService
  ) { }

  ngOnInit() {
    //
    // let jess = this.getFirebase.heroCollectionByName('Jessica');
    //
    // jess.subscribe(res => {
    //   this.heroId = res;
    // });

    
    // 3 Edit the entire hero collection
    this.getFirebase.heroCollectionObservable(true)
      .subscribe(res => {
        this.entireHeroCollectionId = res;

        for (const aHeroId of this.entireHeroCollectionId) {
          // this.upFirebase.update(aHeroId, 'meta', false);
          // this.upFirebase.deleteProperty(aHeroId, 'meta');

          // ENTER YOUR NEW PROPERTY HERE and VISIT ALL UNDER UPDATE PAGE TO RUN THIS COMPONENT
          // this.upFirebase.update(aHeroId, 'direCounterGoldHeroPick', false);

        }
      });






  }


}
