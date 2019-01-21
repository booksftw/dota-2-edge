import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable()
export class AddDataService{
  private heroCollection: AngularFirestoreCollection;
  heroes;

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore
  ) {
    // Grab the hero collection from Firebase
    // TODO: UPDATING TO HEROES 2
    this.heroCollection = afs.collection('heroes2');
    this.heroes = this.heroCollection.valueChanges();
  }


  addHero(heroName: string, heroNickname: string, heroImgUrl: string, heroLanes: [string], heroPosition:[number], isMeta: string, heroStatType: string ) {
    console.log(heroName);
    console.log(heroNickname);
    console.log(heroImgUrl);
    console.log(heroLanes);
    console.log(heroPosition);
    console.log(isMeta);
    console.log(heroStatType);
    console.log('and more properties added.');

    const heroPackage = {
      name: heroName,
      nickName: heroNickname,
      imgUrl: heroImgUrl,
      lanes: heroLanes,
      position: heroPosition,
      meta: isMeta,
      statType: heroStatType,
      counterHeroesId: [],
      strongAgainstHeroesId: [],
      favorite: false,
      counterDescript: '',
      heroAgainstDescript: '',
      synergyDescript: '',
    };

    console.log('Hero Package');
    console.log(heroPackage);

    this.heroCollection.add(heroPackage);
    console.log('Add request sent to Firebase');
  }



}

