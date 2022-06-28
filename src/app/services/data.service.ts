import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Componentes, Mascota } from '../models/interface';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { rootCertificates } from 'tls';

@Injectable({
  providedIn: 'root',
})

export class DataService {
  dataList: AngularFireList<any>;
  dataRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase,
             private http: HttpClient) {}
  // Create
  createMascota(mascota: Mascota ) {
    return this.dataList.push({
      name: mascota.name,
      tipo: mascota.tipo,
      raza: mascota.raza,
      fnac: mascota.nacimiento,
      obs: mascota.obs,
    });
  }
  // Get single object
  getMascota(id: string) {
    this.dataRef = this.db.object('/mascotas/' + id);
    return this.dataRef;
  }
  // Get List
  getMascotaList() {
    this.dataList = this.db.list('/mascotas');
    return this.dataList;
  }
  // Update
  updateMascota(id, mascota: Mascota) {
    return this.dataRef.update({
      name: mascota.name,
      tipo: mascota.tipo,
      raza: mascota.raza,
      fnac: mascota.nacimiento,
      obs: mascota.obs,
    });
  }
  // Delete
  deleteMascota(id: string) {
    this.dataRef = this.db.object('/mascotas/' + id);
    this.dataRef.remove();
  }

  getMenuOpt() {
    return this.http.get<Componentes[]>('/assets/data/menu-options.json');
  }


}
