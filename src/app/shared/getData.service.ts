import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import * as firebase from 'firebase';

export interface Hero { name: string; price: number; }
export interface HeroId extends Hero { id: string; }
export interface Item { name: string; }

@Injectable()
export class GetDataService {

  private heroCollection: AngularFirestoreCollection<Hero>;
  private selectedHeroDoc;
  hero: Observable<HeroId[]>;


  constructor(
    private http: HttpClient,
    private afs : AngularFirestore
  ) {  }

  heroCollectionObservable(onlyId?: boolean){
    // Subscribe this in receiving component
    // You can also access it in your template

    this.heroCollection = this.afs.collection('heroes2');
    let heroes;

    switch (onlyId) {
      case false:
        break;
      case true:
        break;
      default:
        // undefined
        onlyId = false;
    }

    if (!onlyId) {
      // false and undefined
      heroes = this.heroCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      return heroes;
    } else {
      // true
      heroes = this.heroCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const id = a.payload.doc.id;
          return id;
        }))
      );
      return heroes;
    }

  }

  // Redudant code
  // singleHeroCollectionObservable() {
  //   // Subscribe this in receiving component
  //   // You can also access it in your template
  //
  //     // false and undefined
  //     let heroes = this.heroCollection.snapshotChanges().pipe(
  //       map(actions => actions.map(a => {
  //         const data = a.payload.doc.data();
  //         const id = a.payload.doc.id;
  //         return { id, ...data };
  //       }))
  //     );
  //     return heroes;
  // }

  singleHeroResponseFilter(response, heroId) {
    const yourHero = response.filter( el => {
      // console.log(el);
      return el.id === heroId;
    } );
    // console.log(yourHero);
    return yourHero;
  }

  heroSingleDocObservable( id: string ) {
    this.selectedHeroDoc = this.afs.doc<Item>('heroes2/' + id);
    return this.selectedHeroDoc;
  }

  heroCollectionByName (name:string, onlyId?:boolean) {
    // afs.collection('items', ref => ref.where('size', '==', 'large'))
    let singleHeroCollection = this.afs.collection('heroes2', ref => ref.where('name', '==', name));
    let hero;

    if (onlyId != true) {
      console.log('return id only');
      hero = singleHeroCollection.snapshotChanges().pipe(
        map(actions => actions.map(
          a => {
            const id = a.payload.doc.id;
            return id;
          }
        ))
      );
      return hero;
    } else {
      // Return All Data and Id
      hero = singleHeroCollection.snapshotChanges().pipe(
        map( actions => actions.map(
          a => {
            const data = a.payload.doc.data();
            const id   = a.payload.doc.id;
            return {id, ...data};
          }
        ))
      );
      return hero;
    }
  }

  heroCollectionByMeta (onlyId?:boolean) {
    // afs.collection('items', ref => ref.where('size', '==', 'large'))
    const singleHeroCollection = this.afs.collection('heroes2', ref => ref.where('meta', '==', 'true'));
    let hero;

    if (onlyId === true) {
      console.log('return id only');
      hero = singleHeroCollection.snapshotChanges().pipe(
        map(actions => actions.map(
          a => {
            const id = a.payload.doc.id;
            return id;
          }
        ))
      );
      return hero;
    } else {
      // Return All Data and Id
      hero = singleHeroCollection.snapshotChanges().pipe(
        map( actions => actions.map(
          a => {
            const data = a.payload.doc.data();
            const id   = a.payload.doc.id;
            return {id, ...data};
          }
        ))
      );
      return hero;
    }
  }

  heroCollectionByFavorite (onlyId?:boolean) {
    // afs.collection('items', ref => ref.where('size', '==', 'large'))
    const singleHeroCollection = this.afs.collection('heroes2', ref => ref.where('favorite', '==', 'true'));
    let hero;

    if (onlyId === true) {
      console.log('return id only');
      hero = singleHeroCollection.snapshotChanges().pipe(
        map(actions => actions.map(
          a => {
            const id = a.payload.doc.id;
            return id;
          }
        ))
      );
      return hero;
    } else {
      // Return All Data and Id
      hero = singleHeroCollection.snapshotChanges().pipe(
        map( actions => actions.map(
          a => {
            const data = a.payload.doc.data();
            const id   = a.payload.doc.id;
            return {id, ...data};
          }
        ))
      );
      return hero;
    }
  }

  heroCollectionByPosition (userPos:string ,onlyId?:boolean) {

    const singleHeroCollection = this.afs.collection('heroes2', ref => ref.where('position', 'array-contains', userPos));
    let hero;

    if (onlyId === true) {
      console.log('return id only');
      hero = singleHeroCollection.snapshotChanges().pipe(
        map(actions => actions.map(
          a => {
            const id = a.payload.doc.id;
            return id;
          }
        ))
      );
      return hero;
    } else {
      // Return All Data and Id
      hero = singleHeroCollection.snapshotChanges().pipe(
        map( actions => actions.map(
          a => {
            const data = a.payload.doc.data();
            const id   = a.payload.doc.id;
            return {id, ...data};
          }
        ))
      );
      return hero;
    }
  }


  heroCollectionByTest (id: string, onlyId?: boolean) {
    // afs.collection('items', ref => ref.where('size', '==', 'large'))
    let singleHeroCollection = this.afs.collection('heroes2', ref => ref.where('nickName', '==', 'Skywrath'));
    let hero;

    if (onlyId === true) {
      console.log('return id only');
      hero = singleHeroCollection.snapshotChanges().pipe(
        map(actions => actions.map(
          a => {
            const id = a.payload.doc.id;
            return id;
          }
        ))
      );
      return hero;
    } else {
      // Return All Data and Id
      hero = singleHeroCollection.snapshotChanges().pipe(
        map( actions => actions.map(
          a => {
            const data = a.payload.doc.data();
            const id   = a.payload.doc.id;
            return {id, ...data};
          }
        ))
      );
      return hero;
    }
  }

}
