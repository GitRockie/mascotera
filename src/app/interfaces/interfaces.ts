


export interface MenuOpt {
    icon: string;
    name: string;
    redirectTo: string;
  }

  export  interface User { 
    id     : string;
    address: string;
    cp     : number;
    phone  : string;
    email  : string;
    
  }
  
  export interface Mascota {
    id  : string;
    name: string;
    tipo: string;
    raza: string;
    fnac: Date;
    
  }