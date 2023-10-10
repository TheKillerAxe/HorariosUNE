
/* Almacena todos los datos del usuario. */
export class Usuario {
    //ID
    public IdUsuario : string = "";                                                 //ID del usuario.

    //Campos
    public TipoUsuario : string = "";                                               //Tipo de usuario (Admin, Maestro).
    public TipoMaestro : string = "";                                               //Tipo de usuario (Tiempo Completo, Medio Tiempo). <?>
    public Nombre : string = "";                                                    //Nombre del usuario.
    public NombreUsuario : string = "";                                             //Nombre de usuario para ingresar.
    public Contrasena : string = "";                                                //Contraseña del usuario (fecha de nacimiento: [ddmmaaaa]).

    constructor() { }

    setData(data : any) {
        this.IdUsuario = data.IdUsuario;
        this.TipoUsuario = data.TipoUsuario;
        this.TipoMaestro = data.TipoMaestro;
        this.Nombre = data.Nombre;
        this.NombreUsuario = data.NombreUsuario;
        this.Contrasena = data.Contrasena;
    }
} 

/* Almacena todos los datos de una carrera */ 
export class Carrera {
    //ID
    public IdCarrera : string = "";                                                 //ID de la carrera (Ej. ISCE-R o ISCE-I).

    //Campos
    public Nombre : string = "";                                                    //Nombre de la carrera.
    public Periodicidad : string = "";                                              //Periodicidad de la carrera (Cuatrimestral / Semestral).

    constructor() { }

    setData(data: any) {
        this.IdCarrera = data.IdCarrera;
        this.Nombre = data.Nombre;
        this.Periodicidad = data.Periodicidad;
    }
}

/* Almacena todos los datos de una materia. */
export class Materia {
    //ID
    public IdMateria : string = "";                                                 //ID de la materia [000-INICIALES].

    //Campos
    public Nombre : string = "";                                                    //Nombre de la materia.
    public Carrera : string = "";                                                   //Nombre de la carrera en la que se imparte la materia.
    public Periodo : string = "";                                                   //Periodo en el que se imparte la materia.

    constructor() { }

    setData(data : any) {
        this.IdMateria = data.IdMateria;
        this.Nombre = data.Nombre;
        this.Carrera = data.carrera;
        this.Periodo = data.Periodo;
    }
}

/* Almacena los datos de la disponibilidad del horario del maestro. */
export class DisponibilidadMaestro {
    public IdMaestro : string = "";                                                 //ID del maestro al que pertenece la disponibilidad.
    public Nombre : string = "";                                                    //Nombre del maestro al que pertenece la disponibilidad.
    public Ciclo : string = "";                                                      //Ciclo escolar al que pertenece la disponibilidad.
    public Disponibilidad : boolean[][] = new Array();                                //Indica cuando está disponible el maestro.
}

/* Almacena los datos de la disponibilidad del horario de inglés. */
export class DisponibilidadIngles {
    public CicloEscolar : string = "";
    public Periodo : string = "";
    public Periodicidad : string = "";
    public Disponibilidad : boolean[][] = new Array();
}

/* Clase auxiliar para las celdas del horario */
export class RegistroHorario {
    //ID
    public IdMateria : string = "";                                                 //ID de la materia a impartir.
    public IdMaestro : string = "";                                                 //ID del maestro que va a impartir.

    //Campos
    public Materia : string = "";                                                   //Nombre de la materia a impartir.
    public Maestro : string = "";                                                   //Nombre del maestro que va a impartir.
    public Aula : string = "";                                                      //Nombre del aula donde se imparte.
}

/* Almacena los datos de un horario */
export class Horario {
    //ID
    public IdHorario : string = "";                                                 //ID del horario (Ej. ISCE-R-7-Horario).
    
    //Objetos
    public Periodo : string = "";                                                   //Periodo al que pertenece el horario.
    public Carrera : string = "";                                                   //Carrera a la que pertenece el horario.
    public Periodicidad : string = "";                                              //Periodicidad de la carrera a la que pertenece el horario.
    public Ciclo : string = "";                                                     //Ciclo escolar al que pertenece el horario.
    public UltimaModificacion : string = "";                                        //Usuario que modificó el horario por última vez.
    public Materias : string[] = new Array();                                       //Materias asignadas al horario.
    public Maestros : string[] = new Array();                                       //Maestros asignados al horario.
    public Horario : RegistroHorario[][] = new Array();                             //Registros de las celdas del horario.
    public HorarioIrregular : RegistroHorario[][] = new Array();                    //Registros de las celdas del horario irregular.

    constructor() {}

    setData(data : any) {
        this.IdHorario = data.IdHorario;
        this.Periodo = data.Periodo;
        this.Carrera = data.Carrera;
        this.Ciclo = data.Ciclo;
        this.UltimaModificacion = data.UltimaModificacion;
        this.Materias = data.Materias;
        this.Maestros = data.Maestros;
        this.Horario = data.Horario;
        this.HorarioIrregular = data.HorarioIrregular;
    }
}