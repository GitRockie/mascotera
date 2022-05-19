export  interface User {  //usuario /propietario
  $key: string;
  direccion: string;
  cp: number;
  tf: string;
  email: string;
  obs: string;
}

export interface Mascota {
  $key: string;
  name: string;
  tipo: string;
  raza: string;
  fnac: Date;
  obs: string;
}
