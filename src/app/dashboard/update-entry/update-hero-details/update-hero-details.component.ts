// TODO: INCLUDE CAN-DEACTIVATE GUARD TO CHECK IF YOU MODIFIED DATA AND STILL WANT TO LEAVE
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UpdateDataService} from '../../../shared/updateData.service';
import {GetDataService} from '../../../shared/getData.service';
import {isBoolean} from 'util';

export interface Item { name: string; }

@Component({
  selector: 'app-update-hero-details',
  templateUrl: './update-hero-details.component.html',
  styleUrls: ['./update-hero-details.component.css'],
})

export class UpdateHeroDetailsComponent implements OnInit {
  selectedHeroId: string;
  heroDoc;
  hero;

  lanes = ['safe', 'mid' , 'off'];
  positions = [1, 2, 3, 4, 5];
  private heroName: string;
  private heroNickName: any;
  private heroLanes: any;
  private heroPositions: any;
  private heroImgUrl: string;
  private heroMeta: string;
  private heroStatType: string;
  private heroIsFav: string;
  private heroCounterDescript: string;
  private heroSynergyDescript: string;
  private heroGoodAgainstDescript: string;

  showError = false;
  showSuccess = false;
  showCounterHeroOverlay = true;
  showStrongAgainstHeroOverlay = true;

  heroCollectionObservable = this.getData.heroCollectionObservable();
  heroCollectionDisplay;
  heroCollectionOriginal = [];


  selectedHeroCounterIds = []; // used for ngClass Display as well
  selectedHeroStrongAgainstIds = []; // used for ngClass Display as well

  constructor(
    private route: ActivatedRoute,
    private updateData: UpdateDataService,
    private getData: GetDataService,
    private router: Router,
    private currentRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params) => {
          this.selectedHeroId = params['heroId'];
        }
      );
    // console.log(this.selectedHeroId);

    this.heroDoc = this.getData.heroSingleDocObservable(this.selectedHeroId);
    this.hero = this.heroDoc.valueChanges();

    // Loading Hero Table for Counters
    this.heroCollectionObservable.subscribe( (res) => {
      this.heroCollectionDisplay = res;
      this.heroCollectionOriginal = this.heroCollectionDisplay.slice();

      this.heroCollectionDisplay.forEach(
        (hero) => {
          // Found the selected hero
          if (hero.id === this.selectedHeroId) {
            const selectedHero = hero;

            if ('counterHeroesId' in selectedHero) {
              // Loop through selected heroes counters.
              selectedHero.counterHeroesId.forEach(
                (countHeroId) => {
                  // For NgClass Display Green
                  if (!this.selectedHeroCounterIds.includes(countHeroId)) {
                    this.selectedHeroCounterIds.push(countHeroId);
                  }
                }
              );
            }

            if ('strongAgainstHeroesId' in selectedHero) {
              // Loop through selected heroes counters.
              selectedHero.strongAgainstHeroesId.forEach(
                (strongAgainstHeroId) => {
                  // For NgClass Display Green
                  if (!this.selectedHeroStrongAgainstIds.includes(strongAgainstHeroId)) {
                    this.selectedHeroStrongAgainstIds.push(strongAgainstHeroId);
                  }
                }
              );
            }

          }
        }
      );
    });
  }

  onCounterHeroBtnClick() {
    console.log('counter hero clicked');
    this.showCounterHeroOverlay = true;
    // TODO update this to use Viewchild
    document.getElementById('counterHeroOverlay').style.display = 'block';
  }

  onStrongAgainstHeroBtnClick() {
    console.log('strong against hero btn clicked');
    this.showStrongAgainstHeroOverlay = true;
    // TODO update this to use Viewchild
    document.getElementById('strongAgainstHeroOverlay').style.display = 'block';
  }

  onCounterHeroClick(hero) {
    if ( this.selectedHeroCounterIds.includes(hero.id) ) {
      const unClickedHero = this.selectedHeroCounterIds.indexOf(hero.id);
      this.selectedHeroCounterIds.splice(unClickedHero, 1);
    } else {
      // Duplication check
      if (!this.selectedHeroCounterIds.includes(hero.id) ) {
        this.selectedHeroCounterIds.push(hero.id);
      }
    }

  }

  // TODO UPDATE THIS TO WORK FOR STRONG AGAINST
  onStrongAgainstHeroClick(hero) {
    if ( this.selectedHeroStrongAgainstIds.includes(hero.id) ) {
      const unClickedHero = this.selectedHeroStrongAgainstIds.indexOf(hero.id);
      this.selectedHeroStrongAgainstIds.splice(unClickedHero, 1);
    } else {
      // Duplication check
      if (!this.selectedHeroStrongAgainstIds.includes(hero.id) ) {
        this.selectedHeroStrongAgainstIds.push(hero.id);
      }
    }
  }

  onCounterHeroConfirm() {
    // TODO update this to use Viewchild
    document.getElementById('counterHeroOverlay').style.display = 'none';
  }

  onCounterHeroCancel() {
    // TODO update this to use Viewchild
    document.getElementById('counterHeroOverlay').style.display = 'none';
  }

  onStrongAgainstHeroConfirm() {
    // TODO update this to use Viewchild
    document.getElementById('strongAgainstHeroOverlay').style.display = 'none';
  }

  onStrongAgainstHeroCancel() {
    // TODO update this to use Viewchild
    document.getElementById('strongAgainstHeroOverlay').style.display = 'none';
  }


  onSave (form) {
    this.heroName = form.value.heroName;
    this.heroNickName = form.value.heroNickName;
    this.heroLanes = form.value.heroLanes;
    this.heroPositions = form.value.heroPositions;
    this.heroImgUrl = form.value.heroImgUrl;
    this.heroMeta = form.value.isMeta;
    this.heroStatType = form.value.statType;
    this.heroIsFav  = form.value.isFav;
    this.heroGoodAgainstDescript = form.value.goodAgainstDescript;
    this.heroCounterDescript = form.value.counterDescript;
    this.heroSynergyDescript = form.value.synergyDescript;
    // const counterHeroIds = this.selectedHeroCounterIds; // NOT FORM VALUE;
    // this.strongAgainstHeroesSelected = this.strongAgainstHeroesId;

      // Form Validation
    //// Workaround for angular not picking up the asynchronous form values
    // Update by individual requests
    if (this.heroName.length > 0 ) {
      this.updateData.update(this.selectedHeroId, 'name', this.heroName);
    }
    if (this.heroNickName.length > 0 ) {
      this.updateData.update(this.selectedHeroId, 'nickName', this.heroNickName);
    }
    if (this.heroImgUrl.length > 0 ) {
      this.updateData.update(this.selectedHeroId, 'imgUrl', this.heroImgUrl);
    }
    if (this.heroPositions.length > 0 ) {
      this.updateData.update(this.selectedHeroId, 'position', this.heroPositions);
    }
    if (this.heroLanes.length > 0) {
      this.updateData.update(this.selectedHeroId, 'lanes', this.heroLanes);
    }
    if (this.heroMeta.length > 0) {
      this.updateData.update(this.selectedHeroId, 'meta', this.heroMeta);
    }
    if (this.heroStatType.length > 0) {
      this.updateData.update(this.selectedHeroId, 'statType', this.heroStatType);
    }
    if (this.heroIsFav.length > 0) {
      this.updateData.update(this.selectedHeroId, 'favorite', this.heroIsFav);
    }
    if (this.heroGoodAgainstDescript.length > 0 ) {
      console.log('sending ' + this.heroGoodAgainstDescript);
      this.updateData.update(this.selectedHeroId, 'heroGoodAgainstDescript', this.heroGoodAgainstDescript);
    }
    if (this.heroCounterDescript.length > 0 ) {
      console.log('sending ' + this.heroCounterDescript);
      this.updateData.update(this.selectedHeroId, 'counterDescript', this.heroCounterDescript);
    }
    if (this.heroSynergyDescript.length > 0 ) {
      console.log('sending ' + this.heroSynergyDescript);
      this.updateData.update(this.selectedHeroId, 'synergyDescript', this.heroSynergyDescript);
    }

    if (this.selectedHeroCounterIds.length > 0) {
      this.updateData.counterHeroesId(this.selectedHeroId, this.selectedHeroCounterIds); //
    } else {
      // All deselect counters
      this.updateData.counterHeroesId(this.selectedHeroId, []);
    }

    if (this.selectedHeroStrongAgainstIds.length > 0) {
      this.updateData.strongAgainstHeroesId(this.selectedHeroId, this.selectedHeroStrongAgainstIds); //
    } else {
      // All deselect counters
      this.updateData.strongAgainstHeroesId(this.selectedHeroId, []);
    }



    this.router.navigate(['../'], {relativeTo: this.currentRoute});
  }

  onDeleteAreYouSure() {
    // TODO update this to use Viewchild
    document.getElementById('overlay').style.display = 'block';
  }

  onCancelDelete() {
    // TODO update this to use Viewchild
    document.getElementById('overlay').style.display = 'none';
  }

  onDeleteConfirmed() {
    console.log('Jarvis Deleting Hero');
    this.updateData.deleteHero(this.selectedHeroId);
  }
}



