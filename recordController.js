var config = require ('./dbsconfig')
const sql = require('mssql')
const Record = require('./RecordAcademico')

async function getRecord() {
    try {
        
        let pool = await sql.connect(config);
        let record = await pool.request()
        .query('SELECT * FROM Record_Academico')

        return record.recordset;

    } catch (error) {
        console.log(error);
    }
}

async function getRecordbyId(id){
    try {
        let pool = await sql.connect(config);
        let record = await pool.request()
        .input('Id', sql.Int,id)
        .query('SELECT * FROM Record_Academico WHERE Id = @id')
        return record.recordset;

    } catch (error) {
        console.log(error)
    }
}

async function postRecord(Record) {
    try {
        let pool = await sql.connect(config);
        let insertRecord = await pool.request()
        .input('Codigo', sql.NVarChar,Record.Codigo)
        .input('Fecha', sql.Date,Record.Fecha)
        .input('Periodo', sql.NVarChar,Record.Periodo)
        .input('Nota1', sql.Decimal,Record.Nota1)
        .input('Nota2', sql.Decimal,Record.Nota2)
        .input('Codigo_Docente', sql.NVarChar,Record.Codigo_Docente)
        .input('Codigo_Estudiante', sql.NVarChar,Record.Codigo_Estudiante)
        .query("INSERT INTO Record_Academico(Codigo, Fecha, Periodo, Nota1, Nota2, Codigo_Docente, Codigo_Estudiante) VALUES(@Codigo, @Fecha, @Periodo, @Nota1, @Nota2, @Codigo_Docente, @Codigo_Estudiante)")
        return insertRecord.recordset;

    } catch (error) {
        console.log(error)
    }
}

async function putRecord(Record, id) {
    try {
        let pool = await sql.connect(config);
        let updateRecord = await pool.request()
        .input('Id', sql.Int,id)
        .input('Codigo', sql.NVarChar,Record.Codigo)
        .input('Fecha', sql.Date,Record.Fecha)
        .input('Periodo', sql.NVarChar,Record.Periodo)
        .input('Nota1', sql.Decimal,Record.Nota1)
        .input('Nota2', sql.Decimal,Record.Nota2)
        .input('Codigo_Docente', sql.NVarChar,Record.Codigo_Docente)
        .input('Codigo_Estudiante', sql.NVarChar,Record.Codigo_Estudiante)
        .query("UPDATE Record_Academico SET Codigo = @Codigo, Fecha = @Fecha, Periodo = @Periodo, Nota1 = @Nota1, Nota2 = @Nota2, Codigo_Docente = @Codigo_Docente, Codigo_Estudiante = @Codigo_Estudiante WHERE Id = @id")
        return updateRecord.recordset;

    } catch (error) {
        console.log(error)
    }
}

async function deleteRecordbyId(id) {
    try {
        let pool = await sql.connect(config);
        let deleteRecord = await pool.request()
        .input('Id', sql.Int,id)
        
        .query('DELETE Record_Academico Where Id = @id')
        return deleteRecord.recordset;

    } catch (error) {
        console.log(error)
    }
}

async function getPeriodo() {
    try {
        
        let pool = await sql.connect(config);
        let periodo = await pool.request()
        .execute('SP_CONSULTA_PERIODO')

        return periodo.recordset;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getRecord: getRecord,
    getRecordbyId: getRecordbyId,
    postRecord: postRecord,
    putRecord: putRecord,
    deleteRecordbyId, deleteRecordbyId,
    getPeriodo: getPeriodo
}