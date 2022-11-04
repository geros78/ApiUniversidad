class Record_Academico{
    constructor(Id, Codigo, Fecha, Periodo, Nota1, Nota2, Promedio, Codigo_Docente, Codigo_Estudiante) {
        this.Id = Id,
        this.Codigo = Codigo,
        this.Fecha = Fecha,
        this.Periodo = Periodo,
        this.Nota1 = Nota1,
        this.Nota2 = Nota2,
        this.Promedio = Promedio,
        this.Codigo_Docente = Codigo_Docente,
        this.Codigo_Estudiante = Codigo_Estudiante
    }
}

module.exports = Record_Academico;