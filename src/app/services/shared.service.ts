import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private cedulaSource = new BehaviorSubject<string | undefined>(undefined);
  cedulaSeleccionada$ = this.cedulaSource.asObservable();

  actualizarCedula(fechaIngreso: string) {
    this.cedulaSource.next(fechaIngreso);
  }

  constructor(private firestore: AngularFirestore) { }

  getDatosGenerales(general: any): Promise<any> {

    return this.firestore.collection('datosGenerales').add(general)
      .then((docRef) => {
        console.log('Document successfully written with ID: ', docRef.id);
        return docRef.id; // You can return the cedula if needed
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
        throw error;
      });
  }

  mostrarDatosGenerales(): Observable<any> {
    return this.firestore.collection('datosGenerales').snapshotChanges();
  }

  mostrarDatosGeneralesID(cedula: string): Observable<any[]> {
    return this.firestore.collection('datosGenerales').snapshotChanges().pipe(
      map(datos => datos.filter(dato => dato.payload.doc.id === cedula))
    );
  }

  obtenerDatosGenerales(cedula: string): Observable<any> {
    return this.firestore.collection('datosGenerales').doc(cedula).valueChanges();
  }



  getDatosEnfermeria(general: any): Promise<any> {
    // Use set with a custom document ID (cedula)
    return this.firestore.collection('enfermeria').add(general)
      .then((docRef) => {
        console.log('Document successfully written with ID: ', docRef.id);
        return docRef.id; // You can return the cedula if needed
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
        throw error;
      });
  }

  mostrarDatosEnfermeria(): Observable<any> {
    return this.firestore.collection('enfermeria').snapshotChanges();
  }

  mostrarDatosEnfermeriaID(cedula: string): Observable<any[]> {
    return this.firestore.collection('enfermeria').snapshotChanges().pipe(
      map(datos => datos.filter(dato => dato.payload.doc.id === cedula))
    );
  }

  obtenerDatosEnfermeria(cedula: string): Observable<any> {
    return this.firestore.collection('enfermeria').doc(cedula).valueChanges();
  }



  getDatosConsulta(general: any): Promise<any> {
    const cedula = general.cedula;
    // Use set with a custom document ID (cedula)
    return this.firestore.collection('consulta').add(general)
      .then((docRef) => {
        console.log('Document successfully written with ID: ', docRef);
        return docRef; // You can return the cedula if needed
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
        throw error;
      });
  }

  mostrarDatosConsulta(): Observable<any> {
    return this.firestore.collection('consulta').snapshotChanges();
  }

  mostrarDatosConsultaID(cedula: string): Observable<any[]> {
    return this.firestore.collection('consulta').snapshotChanges().pipe(
      map(datos => datos.filter(dato => dato.payload.doc.id === cedula))
    );
  }

  obtenerDatosConsulta(cedula: string): Observable<any> {
    return this.firestore.collection('consulta').doc(cedula).valueChanges();
  }

  getAllData(): Observable<any[]> {
    // Recupera los datos de cada colección por separado
    const datosGenerales$ = this.firestore.collection('datosGenerales').valueChanges();
    const consulta$ = this.firestore.collection('consulta').valueChanges();
    const enfermeria$ = this.firestore.collection('enfermeria').valueChanges();

    // Combina los observables de cada colección
    return combineLatest([datosGenerales$, consulta$, enfermeria$]).pipe(
      map(([datosGenerales, consulta, enfermeria]) => {
        // Combina los datos de todas las colecciones en una sola matriz
        return [...datosGenerales, ...consulta, ...enfermeria];
      })
    );
  }

}
