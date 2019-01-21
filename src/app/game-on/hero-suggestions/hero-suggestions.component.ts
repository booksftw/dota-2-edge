import {Component, OnInit} from '@angular/core';
import {GameHeroManagerService} from '../../shared/game-hero-manager.service';
import {GetDataService} from '../../shared/getData.service';
import {UtilityService} from '../../shared/utility.service';

@Component({
  selector: 'app-hero-suggestions',
  templateUrl: './hero-suggestions.component.html',
  styleUrls: ['./hero-suggestions.component.css']
})
export class HeroSuggestionsComponent implements OnInit {
  radHeroCollectionDisplay: any = [];
  direHeroCollectionDisplay: any = [];

  counterHeroOverlayDetails = [];
  weakHeroOverlayDetails    = [];

  heroCollectionObservable = this.getData.heroCollectionObservable();
  heroCollectionAll;

  showSuggestionUi = true;

  constructor(
    private stateManager: GameHeroManagerService,
    private getData: GetDataService,
    private utility: UtilityService) { }

  ngOnInit() {

    this.heroCollectionObservable.subscribe((res) => {
      this.heroCollectionAll = res;
    });

    // User selecting side UI Show
    this.stateManager.userSelectedHero.subscribe(
      (res) => {
        this.showSuggestionUi = false;
      }
    );

    // Default UI reset
    this.stateManager.userPickedSide.subscribe(
      (res) => {
        this.showSuggestionUi = true;
      }
    );

    // Add Heroes to Suggestions
    // On this event we get the hero collection, clean up the undefined crap, and get the ids of our counters nested in the hero obj and...
    // Set the new value of hero.counters and hero.strongAgainst to the actual hero object
    // Important to know is that all this processing is done client side
    // Lastly our finished object is defined at the bottom and the view pulls from it.
    this.stateManager.userRadiantSelectionAdd.subscribe(
      (userSelectedRadHeroes) => {
        // @ts-ignore
        userSelectedRadHeroes.forEach((selectedHero) => {
          // For each hero fill this array up with the appropriate counterHero
          const counterIds = selectedHero.counterHeroesId;
          const strongAgainstIds = selectedHero.strongAgainstHeroesId;
          // Processing done on the client side for speed and less weight on firebase
          selectedHero.counterHero = [];
          selectedHero.strongAgainstHero = [];
          // Get entire hero collection observable
          const entireHeroCollection = this.getData.heroCollectionObservable(false);
          // Subscribe to get the response of each hero
          entireHeroCollection.subscribe(
            (heroObjArray) => {
              // Clean up
              // Remove all undefined characters from Counters
              counterIds.forEach(
                (counterId) => {
                  const objExists = this.utility.isObjectInArray(heroObjArray, counterId );
                  if (!objExists) {
                    const undefinedObj = counterId;
                    // Delete this undefined object from counterIds
                    const undefinedObjIndex = counterIds.findIndex(
                      (e) => {
                        return e === undefinedObj;
                      });
                    counterIds.splice(undefinedObjIndex, 1);
                  }
                });

              // Clean up
              // Remove all undefined characters from Strong Against
              strongAgainstIds.forEach(
                (strongAgainstId) => {
                  const objExists = this.utility.isObjectInArray(heroObjArray, strongAgainstId );
                  if (!objExists) {
                    const undefinedObj = strongAgainstId;
                    // Delete this undefined object from counterIds
                    const undefinedObjIndex = strongAgainstIds.findIndex(
                      (e) => {
                        return e === undefinedObj;
                      });
                    const badIndex = this.utility.findBadIndex(strongAgainstIds, undefinedObj);

                    if (badIndex) {
                      strongAgainstIds.splice(undefinedObjIndex, 1);
                      this.utility.findBadIndex(strongAgainstIds, undefinedObj);
                    } else {
                      console.log('Jarvis: all bad indexes removed');
                    }
                    // strongAgainstIds.splice(undefinedObjIndex, 1);
                  }
                });

              // Filter Counters
              counterIds.forEach(
                (id) => {
                  const yourSingleHeroObj = this.getData.singleHeroResponseFilter(heroObjArray, id);

                  // Extra layer of validation
                  if (yourSingleHeroObj.length === 0 ) {
                    console.log('delete this hero from index');
                    return;
                  }

                  if (!this.utility.isObjectInArray(selectedHero.counterHero,  yourSingleHeroObj[0].id)) {
                    selectedHero.counterHero.push(yourSingleHeroObj[0]);
                  }
                });

              // Filter Strong-Against Heroes
              strongAgainstIds.forEach(
                (id) => {
                  const yourSingleHeroObj = this.getData.singleHeroResponseFilter(heroObjArray, id);

                  // TODO CHECK THAT THE ERROR IS STILL HAPPENING WITH NEW HEROES BEFORE IMPLEMENTING THIS ONE.
                  // Extra layer of validation
                  if (yourSingleHeroObj.length === 0 ) {
                    console.log('delete this hero from index');
                    return;
                  }

                  // Error -> I delete a hero so it doesn't exist but the relationship is still stored in memory.
                  // I try to find that deleted hero in the heroObjArray by id but it doesn't exist. I need to delete that.
                  if (!this.utility.isObjectInArray(selectedHero.strongAgainstHero,  yourSingleHeroObj[0].id)) {
                    selectedHero.strongAgainstHero.push(yourSingleHeroObj[0]);
                  }
                });
          // // Get entire hero collection observable
          // const entireHeroCollection = this.getData.heroCollectionObservable(false);
          // // Subscribe to get the response of each hero
          // entireHeroCollection.subscribe(
          //   (heroObj) => {
          //     // Filter Counter Heroes
          //     counterIds.forEach(
          //       (id) => {
          //         const yourSingleHeroObj = this.getData.singleHeroResponseFilter(heroObj, id);
          //         // Duplication Validation
          //         if (!this.utility.isObjectInArray(selectedHero.counterHero,  yourSingleHeroObj[0].id)) {
          //           selectedHero.counterHero.push(yourSingleHeroObj[0]);
          //         }
          //
          //       });
          //     // Filter Strong-Against Heroes
          //     strongAgainstIds.forEach(
          //       (id) => {
          //         const yourSingleHeroObj = this.getData.singleHeroResponseFilter(heroObj, id);
          //         if (!this.utility.isObjectInArray(selectedHero.strongAgainstHero,  yourSingleHeroObj[0].id)) {
          //           selectedHero.strongAgainstHero.push(yourSingleHeroObj[0]);
          //         }
          //       });

              this.radHeroCollectionDisplay = userSelectedRadHeroes;
            });
        });
      });

    // On this event we get the hero collection, clean up the undefined crap, and get the ids of our counters nested in the hero obj and...
    // Set the new value of hero.counters and hero.strongAgainst to the actual hero object
    // Important to know is that all this processing is done client side
    // Lastly our finished object is defined at the bottom and the view pulls from it.
    this.stateManager.userDireSelectionAdd.subscribe(
      (userSelectedDireHeroes) => {
        // @ts-ignore
        userSelectedDireHeroes.forEach((selectedHero) => {
          // For each hero fill this array up with the appropriate counterHero
          const counterIds = selectedHero.counterHeroesId;
          const strongAgainstIds = selectedHero.strongAgainstHeroesId;
          // Processing done on the client side for speed and less weight on firebase
          selectedHero.counterHero = [];
          selectedHero.strongAgainstHero = [];

          // Get entire hero collection observable
          const entireHeroCollection = this.getData.heroCollectionObservable(false);
          // Subscribe to get the response of each hero
          entireHeroCollection.subscribe(
            (heroObjArray) => {
              // Clean up
              // Remove all undefined characters from Counters
                  counterIds.forEach(
                    (counterId) => {
                      const objExists = this.utility.isObjectInArray(heroObjArray, counterId );
                      if (!objExists) {
                        const undefinedObj = counterId;
                        // Delete this undefined object from counterIds
                        const undefinedObjIndex = counterIds.findIndex(
                          (e) => {
                            return e === undefinedObj;
                          });
                        counterIds.splice(undefinedObjIndex, 1);
                      }
                    });

               // Clean up
              // Remove all undefined characters from Strong Against
              strongAgainstIds.forEach(
                      (strongAgainstId) => {
                        const objExists = this.utility.isObjectInArray(heroObjArray, strongAgainstId );
                        if (!objExists) {
                          const undefinedObj = strongAgainstId;
                         // Delete this undefined object from counterIds
                          const undefinedObjIndex = strongAgainstIds.findIndex(
                            (e) => {
                              return e === undefinedObj;
                            });
                          const badIndex = this.utility.findBadIndex(strongAgainstIds, undefinedObj);

                          if (badIndex) {
                            strongAgainstIds.splice(undefinedObjIndex, 1);
                            this.utility.findBadIndex(strongAgainstIds, undefinedObj);
                          } else {
                            console.log('Jarvis: all bad indexes removed');
                          }
                         // strongAgainstIds.splice(undefinedObjIndex, 1);
                        }
                      });

              // Filter Counters
              counterIds.forEach(
                (id) => {
                  const yourSingleHeroObj = this.getData.singleHeroResponseFilter(heroObjArray, id);

                  // Extra layer of validation
                  if (yourSingleHeroObj.length === 0 ) {
                    console.log('delete this hero from index');
                    return;
                  }

                  if (!this.utility.isObjectInArray(selectedHero.counterHero,  yourSingleHeroObj[0].id)) {
                    selectedHero.counterHero.push(yourSingleHeroObj[0]);
                  }
                });

              // Filter Strong-Against Heroes
              strongAgainstIds.forEach(
                (id) => {
                  const yourSingleHeroObj = this.getData.singleHeroResponseFilter(heroObjArray, id);

                  // TODO CHECK THAT THE ERROR IS STILL HAPPENING WITH NEW HEROES BEFORE IMPLEMENTING THIS ONE.
                  // Extra layer of validation
                  if (yourSingleHeroObj.length === 0 ) {
                    console.log('delete this hero from index');
                    return;
                  }

                  // Error -> I delete a hero so it doesn't exist but the relationship is still stored in memory.
                  // I try to find that deleted hero in the heroObjArray by id but it doesn't exist. I need to delete that.
                  if (!this.utility.isObjectInArray(selectedHero.strongAgainstHero,  yourSingleHeroObj[0].id)) {
                    selectedHero.strongAgainstHero.push(yourSingleHeroObj[0]);
                  }
                });

              this.direHeroCollectionDisplay = userSelectedDireHeroes;
            });
        });
      });
  }

  // Hero Overlays
  //

  onClickCounterHeroOverlay(userClickedHero, side: string) {
    // Reset
    this.counterHeroOverlayDetails = [];
    this.weakHeroOverlayDetails    = [];

    userClickedHero.showCounterOverlay = !userClickedHero.showCounterOverlay;
    if (side === 'radiant') {
      // Get user radiant selected heroes
      // Check all their counters and strong against
      for (const radHero of this.radHeroCollectionDisplay) {
        // Counters
        radHero.counterHero.forEach( (el) => {
          // Check userHeroes if counterHero is inside
          if (el.id === userClickedHero.id) {
            // Found a counter hero that matches user selected hero
            // Push for Display
            this.counterHeroOverlayDetails.push(radHero);
          }
        });

        // Strong against
        userClickedHero.counterHeroesId.forEach( (el) => {
          if (el === radHero.id) {
            // Found a hero that beats the clicked hero
            // Push for Display
            this.weakHeroOverlayDetails.push(radHero);
          }
        });
      }
    } else if (side === 'dire') {
      // Get user dire selected heroes
      // Check all their counters and strong against
      for (const direHero of this.direHeroCollectionDisplay) {
        // Counters
        direHero.counterHero.forEach( (el) => {
          // Check userHeroes if counterHero is inside
          if (el.id === userClickedHero.id) {
            // Found a counter hero that matches user selected hero
            // Push for Display
            this.counterHeroOverlayDetails.push(direHero);
          }
        });

        // Strong against
        userClickedHero.counterHeroesId.forEach( (el) => {
          if (el === direHero.id) {
            // Found a hero that beats the clicked hero
            // Push for Display
            this.weakHeroOverlayDetails.push(direHero);
          }

        });
      }
    }

  }

  heroPickIndicator(hero, side) {
   // Returns if counterHero should have a glow : boolean

    if (side === 'radiant') {
      let counterHero = hero;

      for (const radUserHero of this.radHeroCollectionDisplay) {
          radUserHero.strongAgainstHero.forEach(
            (strongAgainstHero) => {
              if (strongAgainstHero.id === hero.id) {
                hero.direCounterGoldHeroPick = true;
                // console.log(hero.name, hero.direCounterGoldHeroPick);
              }
            });
      }
    }

    if (hero.direCounterGoldHeroPick && side === 'radiant') {
      // Gold Hero Pick
      // console.log(hero.name, hero.direCounterGoldHeroPick);
      return 'silverHeroPick';
    } else if (!hero.direCounterGoldHeroPick && side === 'radiant') {
      // Silver Hero Pick
      console.log('RETURNING SILVER');
      return 'goldHeroPick';
    }

    console.log('welcome to the dire side');
    if (side === 'dire') {
      let counterHero = hero;

      for (const direUserHero of this.direHeroCollectionDisplay) {
        direUserHero.strongAgainstHero.forEach(
          (strongAgainstHero) => {
            if (strongAgainstHero.id === hero.id) {
              hero.radiantCounterGoldHeroPick = true;
              console.log(hero.name, hero.radiantCounterGoldHeroPick);
            }
          });
      }
    }

    if (hero.radiantCounterGoldHeroPick) {
      // Gold Hero Pick
      console.log(hero.name, hero.radiantCounterGoldHeroPick);
      return 'silverHeroPick';
    } else {
      // Silver Hero Pick
      return 'goldHeroPick';
    }

  }

}
