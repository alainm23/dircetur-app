import { Injectable } from '@angular/core';

// Firebase
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { first, map } from 'rxjs/operators';
import { combineLatest, of } from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor (private afs: AngularFirestore) { }

  // Proveedores
  get_prestador_by_id (nodo: string, id: string) {
    return this.afs.collection (nodo).doc (id).valueChanges ();
  }

  // Blogs
  get_blogs () {
    return this.afs.collection ('Blogs', ref => ref.orderBy ('fecha_creado').limit (6)).valueChanges ();
  }

  // Calendar
  get_eventos_by_key (id: string) {
    return this.afs.collection ("Eventos").doc (id).valueChanges ();
  }

  get_events_by_month (month: string) {
    const collection = this.afs.collection ("Eventos_Fechas").doc (month).collection ('Eventos');
                                                                                                                                                                                                                                    
    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();

          return this.get_eventos_by_key (data.id).pipe (map (datageneral => Object.assign ({}, {data, datageneral})));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }
}
