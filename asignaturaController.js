var config = require ('./dbsconfig')
const sql = require('mssql')
const Asignaturas = require('./Asignaturas')

async function getAsignaturas() {
    try {
        
        let pool = await sql.connect(config);
        let asignatura = await pool.request()
        .execute('SP_ASIGNATURAS')

        return asignatura.recordset;

    } catch (error) {
        console.log(error);
    }
}

async function getAsignaturabyId(id){
    try {
        let pool = await sql.connect(config);
        let asignatura = await pool.request()
        .input('Id', sql.Int,id)
        .execute('SP_ASIGNATURAS_ID')
        return asignatura.recordset;

    } catch (error) {
        console.log(error)
    }
}

async function postAsignatura(Asignaturas) {
    try {
        let pool = await sql.connect(config);
        let insertAsignatura = await pool.request()
        .input('Codigo', sql.NVarChar,Asignaturas.Codigo)
        .input('Nombre', sql.NVarChar,Asignaturas.Nombre)
        .input('Creditos', sql.TinyInt,Asignaturas.Creditos)
        .execute('SP_ASIGNATURAS_POST')
        return insertAsignatura.recordset;

    } catch (error) {
        console.log(error)
    }
}

async function putAsignatura(Asignaturas, id) {
    try {
        let pool = await sql.connect(config);
        let updateAsignatura = await pool.request()
        .input('Id', sql.Int,id)
        .input('Codigo', sql.NVarChar,Asignaturas.Codigo)
        .input('Nombre', sql.NVarChar,Asignaturas.Nombre)
        .input('Creditos', sql.TinyInt,Asignaturas.Creditos)
        .execute('SP_ASIGNATURAS_PUT')
        return updateAsignatura.recordset;

    } catch (error) {
        console.log(error)
    }
}

async function deleteAsignaturabyId(id) {
    try {
        let pool = await sql.connect(config);
        let deleteAsignatura = await pool.request()
        .input('Id', sql.Int,id)
        
        .execute('SP_ASIGNATURAS_DELETE')
        return deleteAsignatura.recordset;

    } catch (error) {
        console.log(error)
    }
}

async function getGeneral() {
    try {
        
        let pool = await sql.connect(config);
        let general = await pool.request()
        .execute('SP_CONSULTA_GN')

        return general.recordset;

    } catch (error) {
        console.log(error);
    }
}

async function getGeneralPromedio() {
    try {
        
        let pool = await sql.connect(config);
        let promedio = await pool.request()
        .execute('SP_CONSULTA_PROMEDIOS')

        return promedio.recordset;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAsignaturas: getAsignaturas,
    getAsignaturabyId: getAsignaturabyId,
    postAsignatura: postAsignatura,
    putAsignatura: putAsignatura,
    deleteAsignaturabyId, deleteAsignaturabyId,
    getGeneral: getGeneral,
    getGeneralPromedio: getGeneralPromedio
}