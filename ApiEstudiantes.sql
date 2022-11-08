CREATE DATABASE APIESTUDIANTES

USE APIESTUDIANTES

CREATE TABLE Asignaturas(
Id INT IDENTITY(1,1) NOT NULL,
Codigo VARCHAR(10)  NOT NULL,
Nombre VARCHAR(30) NOT NULL,
Creditos TINYINT NOT NULL,
CONSTRAINT PK_ASIGNATURAS_01 PRIMARY KEY(Codigo)
)

CREATE TABLE Docentes(
Id INT IDENTITY (1,1) NOT NULL,
Codigo VARCHAR(10) PRIMARY KEY NOT NULL,
Nombres VARCHAR(20) NOT NULL,
Apellidos VARCHAR(20) NOT NULL,
Codigo_Asignatura VARCHAR(10) CONSTRAINT FK_DOCENTES_01
FOREIGN KEY REFERENCES Asignaturas(CODIGO)
ON UPDATE CASCADE
)

CREATE TABLE Estudiantes(
Id INT IDENTITY (1,1) NOT NULL,
Codigo VARCHAR(10) PRIMARY KEY NOT NULL,
Nombres VARCHAR(20) NOT NULL,
Apellidos VARCHAR(20) NOT NULL,
Semestre VARCHAR(20) NOT NULL,
Carrera VARCHAR(20) NOT NULL,
Codigo_Asignatura VARCHAR(10) CONSTRAINT FK_ESTUDIANTES_02
FOREIGN KEY REFERENCES Asignaturas(CODIGO)
ON UPDATE CASCADE
)


CREATE TABLE Record_Academico(
Id INT IDENTITY (1,1) NOT NULL,
Codigo VARCHAR(10) PRIMARY KEY NOT NULL,
Fecha DATE NOT NULL,
Periodo VARCHAR(20),
Nota1 DECIMAL(3,2),
Nota2 DECIMAL(3,2),
Promedio as (Nota1 + Nota2)/2,
Codigo_Docente VARCHAR(10) CONSTRAINT FK_RECORD_02
FOREIGN KEY REFERENCES Docentes(Codigo),
Codigo_Estudiante VARCHAR(10) CONSTRAINT FK_RECORD_01
FOREIGN KEY REFERENCES Estudiantes(Codigo)
ON UPDATE CASCADE
)

select * from Asignaturas

CREATE PROC SP_ASIGNATURAS
AS
	BEGIN
	SELECT * FROM Asignaturas
	END

EXEC SP_ASIGNATURAS

CREATE PROC SP_ASIGNATURAS_ID (
@id INT)
AS
	BEGIN
	SELECT * FROM Asignaturas WHERE Id = @id
	END

EXEC SP_ASIGNATURAS_ID 2

CREATE PROC SP_ASIGNATURAS_POST (
@Codigo	VARCHAR (10),
@Nombre VARCHAR (20),
@Creditos TINYINT)
AS
	BEGIN
	INSERT INTO Asignaturas(Codigo, Nombre, Creditos) VALUES(@Codigo, @Nombre, @Creditos)
	END

EXEC SP_ASIGNATURAS_POST 'A5', 'Quimica', 4

CREATE PROC SP_ASIGNATURAS_PUT (
@id INT,
@Codigo	VARCHAR (10),
@Nombre VARCHAR (20),
@Creditos TINYINT)
AS
	BEGIN
	UPDATE Asignaturas SET Codigo = @Codigo, Nombre = @Nombre, Creditos = @Creditos 
	Where Id = @id
	END

EXEC SP_ASIGNATURAS_PUT 11, 'A5', 'Quimica', 5


CREATE PROC SP_ASIGNATURAS_DELETE (
@id INT
)

AS
	BEGIN
	DELETE Asignaturas Where Id = @id 
	END

EXEC SP_ASIGNATURAS_DELETE 11 

--PROCEDIMIENTOS DOCENTES




CREATE PROC SP_DOCENTES
AS
	BEGIN
	SELECT * FROM Docentes
	END

EXEC SP_DOCENTES

CREATE PROC SP_DOCENTES_ID (
@id INT)
AS
	BEGIN
	SELECT * FROM Docentes WHERE Id = @id
	END

EXEC SP_ASIGNATURAS_ID 2

CREATE PROC SP_DOCENTES_POST (
@Codigo	VARCHAR (10),
@Nombres VARCHAR (20),
@Apellidos VARCHAR (20),
@Codigo_Asignatura VARCHAR(10)
)
AS
	BEGIN
	INSERT INTO Docentes(Codigo, Nombres, Apellidos, Codigo_Asignatura) VALUES(@Codigo, @Nombres, @Apellidos, @Codigo_Asignatura)
	END

EXEC SP_DOCENTES_POST 'D4', 'Luisa', 'Fontalvo', A1

CREATE PROC SP_DOCENTE_PUT (
@id INT,
@Codigo	VARCHAR (10),
@Nombres VARCHAR (20),
@Apellidos VARCHAR (20),
@Codigo_Asignatura VARCHAR(10)
)
AS
	BEGIN
	UPDATE Docentes SET Codigo = @Codigo, Nombres = @Nombres, Apellidos = @Apellidos, Codigo_Asignatura = @Codigo_Asignatura 
	Where Id = @id
	END

EXEC SP_DOCENTE_PUT 6, 'D4', 'Luisa', 'Fontalvo', 'A3'


CREATE PROC SP_DOCENTE_DELETE (
@id INT
)

AS
	BEGIN
	DELETE Docentes Where Id = @id 
	END

EXEC SP_DOCENTE_DELETE 6 

--Consulta multi tabla

CREATE PROC SP_CONSULTA_GN

AS
	BEGIN
	SELECT A.Nombre AS Asignatura, A.Creditos, CONVERT(numeric(3,2), R.Promedio) as Promedio  ,
	CONCAT(E.Nombres, ' ', E.Apellidos) AS Estudiante, CONCAT(D.Nombres, ' ', D.Apellidos) AS Docente FROM Asignaturas A 
	inner join Docentes D 
	ON D.Codigo_Asignatura = A.Codigo 
	inner join Estudiantes E
	ON E.Codigo_Asignatura = A.Codigo
	inner join Record_Academico R
	ON R.Codigo_Estudiante = E.Codigo
	END

EXEC SP_CONSULTA_GN


CREATE PROC SP_CONSULTA_PROMEDIOS

AS
	BEGIN
	SELECT A.Nombre AS Asignatura, CONVERT(numeric(3,2), R.Promedio) as Promedio  ,
	CONCAT(E.Nombres, ' ', E.Apellidos) AS Estudiante FROM Asignaturas A 
	inner join Estudiantes E
	ON E.Codigo_Asignatura = A.Codigo
	inner join Record_Academico R
	ON R.Codigo_Estudiante = E.Codigo
	WHERE R.Promedio > 3.80
	END

EXEC SP_CONSULTA_PROMEDIOS 


CREATE PROC SP_CONSULTA_PERIODO

AS
	BEGIN
	SELECT CONCAT(E.Nombres, ' ', E.Apellidos) AS Estudiante, R.Nota1, R.Nota2, R.Periodo,
	CONVERT(numeric(3,2), R.Promedio) as Promedio, A.Nombre AS Asignatura 
	FROM Record_Academico R 
	inner join Estudiantes E
	ON E.Codigo = R.Codigo_Estudiante
	inner join Asignaturas A
	ON A.Codigo = E.Codigo_Asignatura
	END

EXEC SP_CONSULTA_PERIODO

