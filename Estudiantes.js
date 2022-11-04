class Estudiantes{
    constructor(Id, Codigo, Nombres, Apellidos, Semestre, Carrera, Codigo_Asignatura) {
        this.Id = Id,
        this.Codigo = Codigo,
        this.Nombres = Nombres,
        this.Apellidos = Apellidos,
        this.Semestre = Semestre,
        this.Carrera = Carrera,
        this.Codigo_Asignatura = Codigo_Asignatura
    }
}

module.exports = Estudiantes;