import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Injectable} from "@angular/core";

import * as firebase from "firebase";


export interface Item { name: string; }

@Injectable()
export class UpdateDataService {
  private itemDoc: AngularFirestoreDocument<Item>;
  item: Observable<Item>;
  private newData: {};
  private deletePropertyObject: {};

  constructor (
    private afs: AngularFirestore
  ) {}


  update(id: any, newKey: string, newValue: any) {
    // You can update an existing property value and you can create
      // a new property and value

    // FIXME Creating weird nested database entry - not sure if this is an issue. My guess it isn't anymore.

    console.log('id: ' + id);
    console.log('newKey ' + newKey);
    console.log('newValue ' + newValue);
    // A way to set the property dynamically because it's a weird type
    this.newData = (this.newData = {}, this.newData[newKey] = newValue, this.newData);
    console.log(this.newData);

    const path = 'heroes2/' + id;
    this.afs.doc(path).update(this.newData);

    console.log('Jarvis: Updating firebase!' + id + '  ' + newKey + '  ' + newValue);
  }
  // updateKey (id: string, newKey: string, newValue:any) {
  //
  //   // A way to set the property dynamically because it's a weird type
  //   this.newData = (this.newData={}, this.newData[newKey]=newValue, this.newData);
  //   console.log(this.newData);
  //   let selectedDoc = this.afs.doc('heroes/'+id).update(this.newData);
  //   console.log('Jarvis: Update complete');
  // }



  deleteHero (id: string) {
      this.afs.doc('heroes2/'+id).delete();
  }
  deleteProperty (id, deleteProperty ) {
    console.log('Jarvis: Deleting Property');

    // A way to set the property dynamically because it's a weird type
    this.deletePropertyObject = (this.newData={}, this.newData[deleteProperty]=firebase.firestore.FieldValue.delete(), this.newData);
    // Execute the deletion of the property
    this.afs.doc('heroes2/'+ id).update(this.deletePropertyObject);
    console.log('Jarvis Delete Property Complete' + id + '  ' + deleteProperty)

  }

  counterHeroesId(editHeroId: string, counterHeroIds ) {
    this.afs.doc('heroes2/' + editHeroId).update({counterHeroesId: counterHeroIds}).catch(error => console.log(error) );
  }

  strongAgainstHeroesId(editHeroId: string, strongAgainstHeroIds) {
    console.log(strongAgainstHeroIds);
    this.afs.doc('heroes2/' + editHeroId).update({strongAgainstHeroesId: strongAgainstHeroIds}).catch(error => console.log(error) );
  }

}
