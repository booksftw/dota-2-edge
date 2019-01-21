import {Component, Input, OnInit} from '@angular/core';
import {GameHeroManagerService} from "../../shared/game-hero-manager.service";
import {forEach} from "@angular/router/src/utils/collection";
import {UpdateDataService} from '../../shared/updateData.service';

@Component({
  selector: 'app-hero-selected-table',
  templateUrl: './hero-selected-table.component.html',
  styleUrls: ['./hero-selected-table.component.css']
})
export class HeroSelectedTableComponent implements OnInit {

  // Need to limit this to 5 heroes
  radiantHeroSpots = [];
  direHeroSpots = [];
  userIsSelectingSide = false;
  userHeroSelectionObject: any;

  heroesSelectedInTableForStateCheck = [];

  showMaxHeroLimitErrorMsg = false;
  showDuplicationErrorMsg = false;

  private heroSelectionTableValid = true;

  constructor(
    private stateManage: GameHeroManagerService,
    private update: UpdateDataService
  ) { }

  ngOnInit() {
    this.stateManage.userSelectedHero.subscribe(
      (res) => {
        const userSelectedHero = res;
        // Validate if they can add this hero
        // FIXME Maybe this is causing some of the weird behavior
        if (this.heroDuplicationValidation(userSelectedHero) ) {
          this.userIsSelectingSide = true;
          this.userHeroSelectionObject = userSelectedHero;
          this.heroesSelectedInTableForStateCheck.push(userSelectedHero);
          this.stateManage.userPickedSide.next();
        }

      }
    );
  }

  heroDuplicationValidation(latestHero) {
    // Validate no Duplicate Heroes
      // Match Against the latest hero url
    let isValid = true;

    this.radiantHeroSpots.forEach((e) => {
      if (e.id === latestHero.id) {
        isValid = false;
        this.showDuplicationErrorMsg = true;
      }
    });

    this.direHeroSpots.forEach((e) => {
      if (e.id === latestHero.id) {
        isValid = false;
        this.showDuplicationErrorMsg = true;
      }
    });

    // Handle the duplication
    if (!isValid) {
      this.userIsSelectingSide = false;
    }

  return isValid;
  }

  onSideClick(side) {
    // HERO LIMIT VALIDATION
    //
    if (side === 'radiant') {
      // Validate the maximum number of heroes: 5
      if (this.radiantHeroSpots.length === 5) {
        console.log('radiant max');
        this.showMaxHeroLimitErrorMsg = true;
        this.userIsSelectingSide = false;

        this.stateManage.userPickedSide.next();
        return false;
      }

    }
    if (side === 'dire') {
      // Validate the maximum number of heroes: 5
      if (this.direHeroSpots.length === 5) {
        console.log('dire max');
        this.showMaxHeroLimitErrorMsg = true;
        this.userIsSelectingSide = false;

        this.stateManage.userPickedSide.next();
        return false;
      }
    }

    // EXECUTION IF PASS VALIDATION
    //
      switch (side) {
        case 'radiant':
          if (this.heroSelectionTableValid) {

            this.userIsSelectingSide = false;
            this.stateManage.userPickedSide.next();
            this.radiantHeroSpots.push(this.userHeroSelectionObject);

            // @ts-ignore
            this.stateManage.userRadiantSelectionAdd.next(this.radiantHeroSpots);

          }
          break;
        case 'dire':
          if (this.heroSelectionTableValid ) {
            this.userIsSelectingSide = false;
            this.stateManage.userPickedSide.next();
            this.direHeroSpots.push(this.userHeroSelectionObject);

            // @ts-ignore
            this.stateManage.userDireSelectionAdd.next(this.direHeroSpots);
          }
          break;
        default:
          console.log('error');
      }
  }



  onHeroDeleteClick(side, heroIndex, hero) {

    if (side === 'radiant') {
      this.radiantHeroSpots.splice(heroIndex, 1);
      console.log(heroIndex);
      this.stateManage.userRadiantSelectionRemove.next(heroIndex);
    }

    if (side === 'dire') {
      this.direHeroSpots.splice(heroIndex, 1);

      this.stateManage.userDireSelectionRemove.next(heroIndex);
    }
    hero.inHeroSelectedTable = false;
  }
}

