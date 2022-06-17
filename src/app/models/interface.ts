export  interface Usuario {
  user: any;  //usuario /propietario
  $key: string;
  id: string;
  nombre: string;
  direccion: string;
  cp: number;
  tlf: string;
  email: string;
  photo: string;
  obs: string;
}


export interface Mascota {   //Datos mascota
  id: number;
  name: string;
  foto: HTMLImageElement;
  tipo: string;  // perro, gato, loro....
  raza: string;
  pelaje: string;
  chip: string;
  pedigree: Pedigree;
  propietario: number; // id propietario
  nacimiento: Date;
  adquisicion: Date;
  salud: Salud[] ; // id's salud
  alimentacion: Alimentacion[];  //id's alimentacion
  memories: Memories[]; // id's memories
  obs: string;
}


export interface Pedigree{  // Datos pedigree, resumen
  id: number;
  mascota: number; //id mascota
  certificado: number;
  padre: string;
  madre: string;
  obs: string;
}

export interface Vacuna {  //datos vacunas
  id: number;
  mascota: number; // id mascota
  tipo: string;
  veterinario: string;
  dureccion: string;
  fecha: Date;
  proxima: Date;
  obs: string;
}


export interface Veterinario{  // Datos visitas veterinario
  id: number;
  mascota: number; //id mascota
  nombre: string;
  direccion: string;
  visita: Date;
  diagnostico: string;
  tratamiento: string;
  proxima: Date;
  obs: string;
}

export interface Salud{  // Registro de salud
  id: string;
  mascota: number; //id mascota
  vacunas: Vacuna[]; //id's vacunas
  veterinarios: Veterinario[]; // id's visitas
}


export interface Alimentacion{  //Registro Alimentacion
  id: number;
  mascota: number; //id's mascotaa
  dieta: string;
  inicio: Date;
  final: Date;
  obs: string;
}


export interface Memories {  //Registo recuerdos (fotos)
  foto: HTMLImageElement;
  ubicacion: string;
  fecha: Date;
  obs: string;
}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}

export class FileUpload {
  key!: string;
  name!: string;
  url!: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}
