
/* Almacena todos los datos del usuario. */
export class Usuario {
    //ID
    public IdUsuario: string = "";                                                 //ID del usuario.

    //Campos
    public TipoUsuario: string = "";                                               //Tipo de usuario (Admin, Inglés, Maestro).
    public TipoMaestro: string = "";                                               //Tipo de usuario (Tiempo Completo, Medio Tiempo). <?>
    public Nombre: string = "";                                                    //Nombre del usuario.
    public NombreUsuario: string = "";                                             //Nombre de usuario para ingresar.
    public Correo: string = "";                                                    //Correo del usuario.
    public Contrasena: string = "";                                                //Contraseña del usuario (fecha de nacimiento: [ddmmaaaa]).
    public Materias: string[] = new Array();                                       //Materias que imparte el docente.
    public CambiosRecientes: boolean = false;                                      //Variable auxiliar para el cambio de datos de usuario.

    constructor() { }

    setData(data: any) {
        this.IdUsuario = data.IdUsuario;
        this.TipoUsuario = data.TipoUsuario;
        this.TipoMaestro = data.TipoMaestro;
        this.Nombre = data.Nombre;
        this.NombreUsuario = data.NombreUsuario;
        this.Correo = data.Correo;
        this.Contrasena = data.Contrasena;
        this.Materias = data.Materias;
    }
}

/* Almacena todos los datos de una carrera */
export class Carrera {
    //ID
    public IdCarrera: string = "";                                                 //ID de la carrera (Ej. ISCE-R o ISCE-I).

    //Campos
    public Nombre: string = "";                                                    //Nombre de la carrera.
    public Periodicidad: string = "";                                              //Periodicidad de la carrera (Cuatrimestral / Semestral).
    public CantidadPeriodos: number = 0;                                           //Cantidad de periodos que tiene la carrera.

    constructor() { }

    setData(data: any) {
        this.IdCarrera = data.IdCarrera;
        this.Nombre = data.Nombre;
        this.Periodicidad = data.Periodicidad;
        this.CantidadPeriodos = data.CantidadPeriodos;
    }
} 

/* Almacena todos los datos de una materia. */
export class Materia {
    //ID
    public IdMateria: string = "";                                                 //ID de la materia [000-INICIALES].

    //Campos
    public Nombre: string = "";                                                    //Nombre de la materia.
    public Carrera: string = "";                                                   //Nombre de la carrera en la que se imparte la materia.
    public Periodo: string = "";                                                   //Periodo en el que se imparte la materia.

    constructor() { }

    setData(data: any) {
        this.IdMateria = data.IdMateria;
        this.Nombre = data.Nombre;
        this.Carrera = data.Carrera;
        this.Periodo = data.Periodo;
    }
}

/* Almacena los datos de la disponibilidad del horario del maestro. */
export class DisponibilidadMaestro {
    public IdDisponibilidad: string = "";                                                 //ID del maestro al que pertenece la disponibilidad.
    public Nombre: string = "";                                                    //Nombre del maestro al que pertenece la disponibilidad.
    public Ciclo: string = "";                                                     //Ciclo escolar al que pertenece la disponibilidad.
    public Disponibilidad: RegistroHorario[] = new Array();                        //Indica cuando está disponible el maestro.

    constructor() {
        this.prepararHorarios();
    }

    prepararHorarios() {
        for (let i = 0; i < 7; i++) {
            this.Disponibilidad[i] = new RegistroHorario();
            this.Disponibilidad[i].registro = [];
        }

        let Hora = 7;
        for (let i = 0; i < 16; i++) {
            let Formato = Hora + ":00";
            this.Disponibilidad[0].registro[i] = { texto: Formato, disponible: false, hora: "" };
            if (Hora > 12) {
                Hora = 1;
            } else {
                Hora++;
            }
        }

        for (let i = 1; i < 7; i++) {
            for (let j = 0; j < 16; j++) {
                this.Disponibilidad[i].registro[j] = { texto: "", disponible: false, hora: "" };
            }
        }
    }

    setData(data: any) {
        this.IdDisponibilidad = data.IdMaestro;
        this.Nombre = data.Nombre;
        this.Ciclo = data.Ciclo;
        this.Disponibilidad = data.Disponibilidad;
    }
}

/* Almacena los datos de la disponibilidad del horario de inglés. */
export class DisponibilidadIngles {
    public CicloEscolar: string = "";
    public Periodo: string = "";
    public Periodicidad: string = "";
    public Disponibilidad: RegistroHorario[] = new Array();

    constructor() {
        this.prepararHorarios();
    }

    prepararHorarios() {
        for (let i = 0; i < 7; i++) {
            this.Disponibilidad[i] = new RegistroHorario();
            this.Disponibilidad[i].registro = [];
        }

        let Hora = 7;
        for (let i = 0; i < 16; i++) {
            let Formato = Hora + ":00";
            this.Disponibilidad[0].registro[i] = { texto: Formato };
            this.Disponibilidad[0].registro[i].disponible = false;
            if (Hora > 12) {
                Hora = 1;
            } else {
                Hora++;
            }
        }

        for (let i = 1; i < 7; i++) {
            for (let j = 0; j < 16; j++) {
                this.Disponibilidad[i].registro[j] = { texto: "" };
                this.Disponibilidad[i].registro[j].disponible = false;
            }
        }
    }

    setData(data:any) {
        this.CicloEscolar = data.CicloEscolar;
        this.Periodo = data.Periodo;
        this.Periodicidad = data.Periodicidad;
        this.Disponibilidad = data.Disponibilidad;
    }
} 

/* Clase auxiliar para las celdas del horario */
export class RegistroHorario {
    registro: any[] = new Array();

    constructor() { }
}

/* Almacena los datos de un horario */
export class Horario {
    //ID
    public IdHorario: string = "";                                                 //ID del horario (Ej. ISCE-R-7-Horario).

    //Objetos
    public Periodicidad: string = "";                                              //Periodicidad de la carrera a la que pertenece el horario.
    public Periodo: string = "";                                                   //Periodo al que pertenece el horario.
    public Carrera: string = "";                                                   //Carrera a la que pertenece el horario.
    public Ciclo: string = "";                                                     //Ciclo escolar al que pertenece el horario.
    public UltimaModificacion: string = "";                                        //Usuario que modificó el horario por última vez.
    public Materias: string[] = new Array();                                       //Materias asignadas al horario.
    public Maestros: string[] = new Array();                                       //Maestros asignados al horario.
    public HorarioRegular: RegistroHorario[] = new Array();                        //Registros de las celdas del horario regular.
    public HorarioIrregular: RegistroHorario[] = new Array();                      //Registros de las celdas del horario irregular.

    constructor() {
        this.prepararHorarios();
    }

    prepararHorarios() {
        for (let i = 0; i < 7; i++) {
            this.HorarioRegular[i] = new RegistroHorario();
            this.HorarioRegular[i].registro = [];
            this.HorarioIrregular[i] = new RegistroHorario();
            this.HorarioIrregular[i].registro = [];
        }

        let Hora = 7;
        for (let i = 0; i < 16; i++) {
            let Formato = Hora + ":00";
            this.HorarioRegular[0].registro[i] = { texto: Formato };
            this.HorarioIrregular[0].registro[i] = { texto: Formato };
            if (Hora > 12) {
                Hora = 1;
            } else {
                Hora++;
            }
        }

        for (let i = 1; i < 7; i++) {
            for (let j = 0; j < 16; j++) {
                this.HorarioRegular[i].registro[j] = { texto: "" };
                this.HorarioIrregular[i].registro[j] = { texto: "" };
            }
        }
    }

    setData(data: any) {
        this.IdHorario = data.IdHorario;
        this.Periodo = data.Periodo;
        this.Carrera = data.Carrera;
        this.Ciclo = data.Ciclo;
        this.UltimaModificacion = data.UltimaModificacion;
        this.Materias = data.Materias;
        this.Maestros = data.Maestros;
        this.HorarioRegular = data.HorarioRegular;
        this.HorarioIrregular = data.HorarioIrregular;
    }
}