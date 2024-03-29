import { Injectable } from '@angular/core';

// Firebase
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Services
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { first, map } from 'rxjs/operators';
import { combineLatest, of } from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public idioma: string;
  
  constructor(private afs: AngularFirestore,
              private events: Events,
              private storage: Storage) {
    this.events.subscribe ('language_changed', (lang) => {
      this.idioma = lang;
    });

    this.storage.get ('i18n').then ((response: string) => {
      this.idioma = response;

      if (this.idioma === null || this.idioma === undefined) {
        this.idioma = 'es';
      }
    });
  }

  // Proveedores
  get_prestador_by_id (nodo: string, id: string) {
    return this.afs.collection (nodo).doc (id).valueChanges ();
  }

  // Blogs
  get_last_blogs (limit: number) {
    return this.afs.collection ('Blogs', ref => ref.orderBy ('fecha_creado').limit (limit)).valueChanges ();
  }

  get_blogs () {
    return this.afs.collection ('Blogs', ref => ref.orderBy ('fecha_creado')).valueChanges ();
  }

  get_blog_categories () {
    return this.afs.collection ('Blog_Categorias').valueChanges ();
  }

  get_blog_by_id (id: string) {
    return this.afs.collection ('Blogs').doc (id).valueChanges ();
  }

  // Boleto turistico
  get_boletos_turisticos () {
    return this.afs.collection ("Boleto_Turistico").valueChanges ();
  }

  // CIrcuito turistico
  get_circuitos_turisticos () {
    return this.afs.collection ('Circuitos_Turisticos').valueChanges ();
  }

  get_circuito_turistico_by_id (id: string) {
    return this.afs.collection ('Circuitos_Turisticos').doc (id).valueChanges (); 
  }

  get_dias_by_circuito_turistico (id: string) {
    return this.afs.collection ('Circuitos_Turisticos').doc (id).collection ('Dias').valueChanges (); 
  }

  get_circuitos_turisticos_limit (n: number) {
    return this.afs.collection ('Circuitos_Turisticos', ref => ref.limit (n)).valueChanges ();
  }

  // Turismo rural comunitario
  get_trc () {
    return this.afs.collection ("Turismo_Rural").valueChanges ();
  }

  get_trc_by_id (id: string) {
    return this.afs.collection ("Turismo_Rural").doc (id).valueChanges ();
  }

  // Calendar
  get_evento_by_key (id: string) {
    return this.afs.collection ("Eventos").doc (id).valueChanges ();
  }

  get_eventos () {
    return this.afs.collection ("Eventos", ref => ref.orderBy ('fecha')).valueChanges ();
  }

  get_eventos_categorias () {
    return this.afs.collection ('Eventos_Tipos').valueChanges ();
  }

  get_events_by_month (month: string) {
    const collection = this.afs.collection ("Eventos_Fechas").doc (month).collection ('Eventos');
                                                                                                                                                                                                                                    
    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();

          return this.get_evento_by_key (data.id).pipe (map (datageneral => Object.assign ({}, {data, datageneral})));
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

  // Etiquetas
  get_etiquetas (doc: string) {
    return this.afs.collection ('PaginaWeb').doc (doc).valueChanges ();
  }
}
