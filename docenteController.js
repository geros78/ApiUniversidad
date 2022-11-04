var config = require ('./dbsconfig')
const sql = require('mssql')
const Docentes = require('./Docentes')

async function getDocentes() {
    try {
        
        let pool = await sql.connect(config);
        let docente = await pool.request()
        .execute('SP_DOCENTES')

        return docente.recordset;

    } catch (error) {
        console.log(error);
    }
}

async function getDocentebyId(id){
    try {
        let pool = await sql.connect(config);
        let docente = await pool.request()
        .input('Id', sql.Int,id)
        .execute('SP_DOCENTES_ID')
        return docente.recordset;

    } catch (error) {
        console.log(error)
    }
}

async function postDocente(Docentes) {
    try {
        let pool = await sql.connect(config);
        let insertDocente = await pool.request()
        .input('Codigo', sql.NVarChar,Docentes.Codigo)
        .input('Nombres', sql.NVarChar,Docentes.Nombres)
        .input('Apellidos', sql.NVarChar,Docentes.Apellidos)
        .input('Codigo_Asignatura', sql.NVarChar,Docentes.Codigo_Asignatura)
        .execute("SP_DOCENTES_POST")
        return insertDocente.recordset;

    } catch (error) {
        console.log(error)
    }
}

async function putDocente(Docentes, id) {
    try {
        let pool = await sql.connect(config);
        let updateDocente = await pool.request()
        .input('Id', sql.Int,id)
        .input('Codigo', sql.NVarChar,Docentes.Codigo)
        .input('Nombres', sql.NVarChar,Docentes.Nombres)
        .input('Apellidos', sql.NVarChar,Docentes.Apellidos)
        .input('Codigo_Asignatura', sql.NVarChar,Docentes.Codigo_Asignatura)
        .execute('SP_DOCENTE_PUT')
        return updateDocente.recordset;

    } catch (error) {
        console.log(error)
    }
}

async function deleteDocentebyId(id) {
    try {
        let pool = await sql.connect(config);
        let deleteDocente = await pool.request()
        .input('Id', sql.Int,id)
        
        .execute('SP_DOCENTE_DELETE')
        return deleteDocente.recordset;

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getDocentes: getDocentes,
    getDocentebyId: getDocentebyId,
    postDocente: postDocente,
    putDocente: putDocente,
    deleteDocentebyId, deleteDocentebyId
}