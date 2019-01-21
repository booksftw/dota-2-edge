import {Subject} from "rxjs";

export class GameHeroManagerService {

  // User clicks hero
  userSelectedHero = new Subject();

  // User clicks side
  userPickedSide = new Subject();

  // Radiant Hero Table Add/Remove
  userRadiantSelectionAdd = new Subject();
  userRadiantSelectionRemove = new Subject();

  // Dire Hero Table Add/Remove
  userDireSelectionAdd = new Subject();
  userDireSelectionRemove = new Subject();
}
