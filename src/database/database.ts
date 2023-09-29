
/* Almacena todos los datos del usuario. */
export class Usuario {
    //ID
    public Matricula : string = "";                                            //Matrícula del usuario [aXXXXXX].

    //Campos
    public Tipo : string = "";                                                 //Tipo de usuario (Admin, Maestro).
    public Nombre : string = "";                                               //Nombre(s) del usuario.
    public Apellido : string = "";                                             //Apellido(s) del usuario.
    public numFechaNacimiento : number = 0;                                    //Fecha de nacimiento del usuario (formato numérico).
    public txtFechaNacimiento : string = "";                                   //Fecha de nacimiento del usuario (formato texto).
    public Correo : string = "";                                               //Correo del usuario.
    public Contraseña : string = "";                                           //Contraseña del usuario (fecha de nacimiento: [ddmmaaaa]).
    public Horas : number = 0;                                                 //Horas disponibles del maestro.

    constructor() { }

    setData(data : any) {
        this.Matricula = data.Matricula;
        this.Tipo = data.Tipo;
        this.Nombre = data.Nombre;
        this.Apellido = data.Apellido;
        this.numFechaNacimiento = data.numFechaNacimiento;
        this.txtFechaNacimiento = data.txtFechaNacimiento;
        this.Correo = data.Correo;
        this.Contraseña = data.Contraseña;
        this.Horas = data.Horas;
    }
}

/* Almacena todos los datos de una carrera */
export class Carrera {
    //ID
    public IdCarrera : string = "";                                            //ID de la carrera (Ej. ISCE-R o ISCE-I).

    //Campos
    public Nombre : string = "";                                               //Nombre de la carrera.
    public Estado : string = "";                                               //Estado de la carrera (Regular / Irregular).

    constructor() {}

    setData(data: any) {
        this.IdCarrera = data.IdCarrera;
        this.Nombre = data.Nombre;
    }
}

/* Almacena todos los datos de un periodo. */
export class Periodo {
    //ID
    public IdPeriodo : string = "";                                            //ID del periodo (Ej. ISCE-R-7).
    public IdCarrera : string = "";                                            //ID de la carrera a la que pertenece el periodo.

    //Campos
    public Ciclo : string = "";                                                //Ciclo del periodo (Ej. 2023/03).
    public Grado : number = 0;                                                 //Grado del periodo (Ej. 7).

    constructor(data: any) {
        this.IdPeriodo = data.IdPeriodo;
        this.IdCarrera = data.Carrera;
        this.Ciclo = data.Ciclo;
        this.Grado = data.Grado;
    }
}

/* Almacena todos los datos de una materia. */
export class Materia {
    //ID
    public IdMateria : string = "";                                            //ID de la materia [000-INICIALES].
    public IdPeriodo : string = "";                                            //ID del periodo al que pertenece la materias.
    public IdMaestro : string = "";                                            //ID del maestro que imparte la maestra.

    //Campos
    public Nombre : string = "";                                               //Nombre de la materia.
    public Grupo : string = "";                                                //Grupo de alumnos al que se imparte la materia.
    public Aula : string = "";                                                 //Aula en la que se imparte la materia.
    public txtDia : string = "";                                               //Día en el que se imparte la materia (Lunes - Viernes).
    public numDia : number = 0;                                                //Día en el que se imparte la materia (0 - 4).
    public Hora : number = 0;                                                  //Hora en la que se imparte la materia.

    constructor() { }

    setData(data : any) {
        this.IdMateria = data.IdMateria;
        this.IdPeriodo = data.IdPeriodo;
        this.IdMaestro = data.IdMaestro;
        this.Nombre = data.Nombre;
        this.Grupo = data.Grupo;
        this.Aula = data.Aula;
        this.txtDia = data.txtDia;
        this.numDia = data.numDia;
        this.Hora = data.Hora;
    }
}

/* Almacena los datos de un horario */
export class Horario {
    //ID
    public IdHorario : string = "";                                            //ID del horario (ISCE-R-7-Horario).
    public IdPeriodo : string = "";                                            //ID del periodo al que pertenece la materia.

    //Objetos
    public Materias : Materia[][] = [];                                        //Materias del horario [Hora][Día].

    constructor() {}

    setData(data : any) {
        this.IdHorario = data.IdHorario;
        this.IdPeriodo = data.IdPeriodo;
        this.Materias = data.Materias;
    }
}