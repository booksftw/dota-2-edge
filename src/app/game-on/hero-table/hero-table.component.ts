// TODO: Hero Selection Validation Can't Select Same Hero Twice

import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';


import {AngularFirestore } from 'angularfire2/firestore';

import {AddDataService} from '../../shared/addData.service';
import {GetDataService} from '../../shared/getData.service';
import {GameHeroManagerService} from '../../shared/game-hero-manager.service';


@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.css']
})
export class HeroTableComponent implements OnInit, OnDestroy {

  heroCollectionObservable = this.getData.heroCollectionObservable();
  heroCollectionDisplay;
  heroCollectionOriginal = [];
  heroCollectionFiltered = [];

  userPickingSide = true;

  userPositionFilter;
  private filterSelectedMeta: boolean;
  private filterSelectedFav: boolean;
  private onlyCounters: boolean;
  private filterSelectedPos: string;

  constructor(
    private storeData: AddDataService,
    private getData: GetDataService,
    private afs: AngularFirestore,
    private stateManage: GameHeroManagerService
  ) {  }

  ngOnInit() {


    this.heroCollectionObservable.subscribe( (res) => {
        this.heroCollectionDisplay = res;
        this.heroCollectionOriginal = this.heroCollectionDisplay.slice();
    });

    this.stateManage.userPickedSide.subscribe(
      (res) => {
        // This will update all the heroe's state after each selection;
        this.heroCollectionObservable.subscribe( (res2) => {
          this.heroCollectionDisplay = res2 ;
        });

        this.userPickingSide = !this.userPickingSide;
      }
    );
  }

  onHeroClick (hero) {
    hero.inHeroSelectedTable = true;
    this.stateManage.userSelectedHero.next(hero);
  }

  filterMetaOnly2 () {
    this.heroCollectionDisplay = this.heroCollectionOriginal; // Reset to all Heroes
    this.heroCollectionFiltered = this.heroCollectionDisplay; // All heroes

    console.log('Hero COllection Filtered');
    console.log(this.heroCollectionFiltered);
    // Meta filter
    //
    this.heroCollectionFiltered = this.heroCollectionDisplay.filter( (hero) => {
      return (hero.meta === 'true' || hero.meta === true);
    });

    this.heroCollectionDisplay = this.heroCollectionFiltered;
  }

  filterMetaFav2 () {
    this.heroCollectionDisplay = this.heroCollectionOriginal; // Reset to all Heroes
    this.heroCollectionFiltered = this.heroCollectionDisplay; // All heroes

    // Meta filter
    //
    this.heroCollectionFiltered = this.heroCollectionDisplay.filter( (hero) => {
      return (hero.meta === 'true' || hero.meta === true);
    });

    // Fav filter
    //
    this.heroCollectionFiltered = this.heroCollectionFiltered.filter( (hero) => {
      return (hero.favorite === 'true' || hero.favorite === true);
    } );

    // Set the Display Object to filtered heroes
    //
    this.heroCollectionDisplay = this.heroCollectionFiltered;
  }

  filterMetaPos2 (userSelectedPos: string) {
    this.heroCollectionDisplay = this.heroCollectionOriginal; // Reset to all Heroes
    this.heroCollectionFiltered = this.heroCollectionDisplay; // All heroes

    // Meta filter
    //
    this.heroCollectionFiltered = this.heroCollectionDisplay.filter( (hero) => {
      return (hero.meta === 'true' || hero.meta === true);
    });

    // Position filter
    //
    // Reset filters and exit function
    if (userSelectedPos === 'posAll') {
      this.heroCollectionDisplay = this.heroCollectionFiltered;
      return true;
    }
    const matchedPositionHeroFiltered = [];
    this.heroCollectionFiltered.forEach( (hero) => {
      hero.position.forEach( (position) => {
        if (position === userSelectedPos) {
          matchedPositionHeroFiltered.push(hero);
        }
      });
    });
    this.heroCollectionFiltered = matchedPositionHeroFiltered;

    // Set the Display Object to filtered heroes
    //
    this.heroCollectionDisplay = this.heroCollectionFiltered;
  }

  filterMetaFavPos2 (userSelectedPos: string) {
    this.heroCollectionDisplay = this.heroCollectionOriginal; // Reset to all Heroes
    this.heroCollectionFiltered = this.heroCollectionDisplay; // All heroes

    // Meta filter
    //
    this.heroCollectionFiltered = this.heroCollectionDisplay.filter( (hero) => {
      return (hero.meta === 'true' || hero.meta === true);
    });

    // Fav filter
    //
    this.heroCollectionFiltered = this.heroCollectionFiltered.filter( (hero) => {
      return (hero.favorite === 'true' || hero.favorite === true);
    } );

    // Position filter
    //
    // Reset filters and exit function
    if (userSelectedPos === 'posAll') {
      this.heroCollectionDisplay = this.heroCollectionFiltered;
      return true;
    }
    const matchedPositionHeroFiltered = [];
    this.heroCollectionFiltered.forEach( (hero) => {
      console.log(hero);
      hero.position.forEach( (position) => {
        if (position === userSelectedPos) {
            matchedPositionHeroFiltered.push(hero);
        }
      });
    });
    this.heroCollectionFiltered = matchedPositionHeroFiltered;

    // Set the Display Object to filtered heroes
    //
    this.heroCollectionDisplay = this.heroCollectionFiltered;
  }

  filterFavPos2 (userSelectedPos: string) {
    this.heroCollectionDisplay = this.heroCollectionOriginal; // Reset to all Heroes
    this.heroCollectionFiltered = this.heroCollectionDisplay; // All heroes

    // Fav filter
    //
    this.heroCollectionFiltered = this.heroCollectionFiltered.filter( (hero) => {
      return (hero.favorite === 'true' || hero.favorite === true);
    } );

    // Position filter
    //
    // Set filters to Favs and exit function
    if (userSelectedPos === 'posAll') {
      this.heroCollectionDisplay = this.heroCollectionFiltered;
      return true;
    }
    const matchedPositionHeroFiltered = [];
    this.heroCollectionFiltered.forEach( (hero) => {
      hero.position.forEach( (position) => {
        if (position === userSelectedPos) {
          matchedPositionHeroFiltered.push(hero);
        }
      });
    });
    this.heroCollectionFiltered = matchedPositionHeroFiltered;

    // Set the Display Object to filtered heroes
    //
    this.heroCollectionDisplay = this.heroCollectionFiltered;
  }

  filterPosOnly3 (userSelectedPos: string) {
    this.heroCollectionDisplay = this.heroCollectionOriginal; // Reset to all Heroes
    this.heroCollectionFiltered = this.heroCollectionDisplay; // All heroes

    // Position filter
    //
    if (userSelectedPos === 'posAll') {
      // Reset filters and exit function
      this.heroCollectionDisplay = this.heroCollectionFiltered;
      return true;
    }

    const matchedPositionHeroFiltered = [];
    for (const heroItem of this.heroCollectionFiltered) {
      const hero = heroItem;
      console.log(hero);
      // noinspection TsLint
      for (const posKey in hero.position) {
        const heroSetPosition = hero.position[posKey];
        if (heroSetPosition === userSelectedPos) {
          matchedPositionHeroFiltered.push(hero);
        }
      }
    }
    this.heroCollectionFiltered = matchedPositionHeroFiltered;

    // Set the Display Object to filtered heroes
    //
    this.heroCollectionDisplay = this.heroCollectionFiltered;
  }

  // Only keeping this one as a record of how interested the problem is
  // The foreach wouldn't work so I had to use a for loop instead and it works.
  // When I ran the forEach loop on the exact same array the single property I was targeting value was null.
  // filterPosOnlyDEPRECATED (userSelectedPos: string) {
  //   this.heroCollectionDisplay = this.heroCollectionOriginal; // Reset to all Heroes
  //   this.heroCollectionFiltered = this.heroCollectionDisplay; // All heroes
  //   console.log(this.heroCollectionFiltered, 'pos only');
  //   // Position filter
  //   //
  //   // Reset filters and exit function
  //   if (userSelectedPos === 'posAll') {
  //     this.heroCollectionDisplay = this.heroCollectionOriginal;
  //     return true;
  //   }
  //   const matchedPositionHeroFiltered = [];
  //   this.heroCollectionFiltered.forEach( (hero) => {
  //     hero.position.forEach( (position) => {
  //       if (position === userSelectedPos) {
  //         matchedPositionHeroFiltered.push(hero);
  //       }
  //     });
  //   });
  //   this.heroCollectionFiltered = matchedPositionHeroFiltered;
  //
  //   // Set the Display Object to filtered heroes
  //   //
  //   this.heroCollectionDisplay = this.heroCollectionFiltered;
  // }

  filterFavOnly2 () {
    this.heroCollectionDisplay = this.heroCollectionOriginal; // Reset to all Heroes
    this.heroCollectionFiltered = this.heroCollectionDisplay; // All heroes

    // Fav filter
    //
    this.heroCollectionFiltered = this.heroCollectionFiltered.filter( (hero) => {
      return (hero.favorite === 'true' || hero.favorite === true);
    } );

    // Set the Display Object to filtered heroes
    //
    this.heroCollectionDisplay = this.heroCollectionFiltered;
  }

  onFilterHeroTable(form) {
    // TODO FILTERS MAKING ERROR WHEN HEROES IN THE SELECTED TABLE ALREADY, I THINK BECAUSE IT'S MAKING NEW REQUESTS AND MANIPULATING THEM.
    // FIXME FILTER CONFLICT WITH SELECTED HEROES IN TABLE
    this.filterSelectedMeta = form.value.metaFilter;
    this.filterSelectedFav = form.value.favFilter;
    this.filterSelectedPos = form.value.userPos;
    // Coming soon... this.onlyCounters = form.value.counterFilter;

    if (this.filterSelectedPos === null || this.filterSelectedPos === undefined) {
      this.filterSelectedPos = 'posAll';
    }

    if ( this.filterSelectedPos !== undefined && this.filterSelectedMeta && this.filterSelectedFav) {
      console.log('filter META FAV and POS');
      this.filterMetaFavPos2(this.filterSelectedPos);
    } else if (this.filterSelectedFav) {
      console.log('filter FAV ONLY');
      this.filterFavOnly2();
    }  else if (this.filterSelectedMeta && this.filterSelectedPos) {
      console.log('filter META POS');
      this.filterMetaPos2(this.filterSelectedPos);
    } else if (this.filterSelectedMeta) {
      console.log('filter META ONLY');
      this.filterMetaOnly2();
    } else if (this.filterSelectedMeta && this.filterSelectedFav) {
        console.log('filter META FAV');
        this.filterMetaFav2();
    } else if (this.filterSelectedFav && this.filterSelectedPos) {
      console.log('filter FAV POS');
      this.filterFavPos2(this.filterSelectedPos);
    } else if (this.filterSelectedPos !== 'empty') {
      console.log('filter POS ONLY');
      console.log(this.filterSelectedPos);
      // this.filterPosOnly2(this.filterSelectedPos);
      this.filterPosOnly3(this.filterSelectedPos);
    }

    // Filter Counter, coming soon...
  }

  onResetFilters () {
    this.heroCollectionDisplay = this.heroCollectionOriginal;
  }


  ngOnDestroy () {
  }


}
