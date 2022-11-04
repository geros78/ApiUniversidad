var config = require ('./dbsconfig')
const sql = require('mssql')
const Estudiantes = require('./Estudiantes')

async function getEstudiante() {
    try {
        
        let pool = await sql.connect(config);
        let estudiante = await pool.request()
        .query('SELECT * FROM Estudiantes')

        return estudiante.recordset;

    } catch (error) {
        console.log(error);
    }
}

async function getEstudiantebyId(id){
    try {
        let pool = await sql.connect(config);
        let estudiante = await pool.request()
        .input('Id', sql.Int,id)
        .query('SELECT * FROM Estudiantes WHERE Id = @id')
        return estudiante.recordset;

    } catch (error) {
        console.log(error)
    }
}

async function postEstudiante(Estudiantes) {
    try {
        let pool = await sql.connect(config);
        let insertEstudiante = await pool.request()
        .input('Codigo', sql.NVarChar,Estudiantes.Codigo)
        .input('Nombres', sql.NVarChar,Estudiantes.Nombres)
        .input('Apellidos', sql.NVarChar,Estudiantes.Apellidos)
        .input('Semestre', sql.NVarChar,Estudiantes.Semestre)
        .input('Carrera', sql.NVarChar,Estudiantes.Carrera)
        .input('Codigo_Asignatura', sql.NVarChar,Estudiantes.Codigo_Asignatura)
        .query("INSERT INTO Estudiantes(Codigo, Nombres, Apellidos, Semestre, Carrera, Codigo_Asignatura) VALUES(@Codigo, @Nombres, @Apellidos, @Semestre, @Carrera, @Codigo_Asignatura)")
        return insertEstudiante.recordset;

    } catch (error) {
        console.log(error)
    }
}

async function putEstudiante(Estudiantes, id) {
    try {
        let pool = await sql.connect(config);
        let updateEstudiante = await pool.request()
        .input('Id', sql.Int,id)
        .input('Codigo', sql.NVarChar,Estudiantes.Codigo)
        .input('Nombres', sql.NVarChar,Estudiantes.Nombres)
        .input('Apellidos', sql.NVarChar,Estudiantes.Apellidos)
        .input('Semestre', sql.NVarChar,Estudiantes.Semestre)
        .input('Carrera', sql.NVarChar,Estudiantes.Carrera)
        .input('Codigo_Asignatura', sql.NVarChar,Estudiantes.Codigo_Asignatura)
        .query("UPDATE Estudiantes SET Codigo = @Codigo, Nombres = @Nombres, Apellidos = @Apellidos, Semestre = @Semestre, Carrera = @Carrera, Codigo_Asignatura = @Codigo_Asignatura Where Id = @id")
        return updateEstudiante.recordset;

    } catch (error) {
        console.log(error)
    }
}

async function deleteEstudiantebyId(id) {
    try {
        let pool = await sql.connect(config);
        let deleteEstudiante = await pool.request()
        .input('Id', sql.Int,id)
        
        .query('DELETE Estudiantes Where Id = @id')
        return deleteEstudiante.recordset;

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getEstudiante: getEstudiante,
    getEstudiantebyId: getEstudiantebyId,
    postEstudiante: postEstudiante,
    putEstudiante: putEstudiante,
    deleteEstudiantebyId, deleteEstudiantebyId
}