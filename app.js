var AsignaturasController = require('./asignaturaController');
var Asignaturas = require('./Asignaturas');

var DocentesController = require('./docenteController')
var Docentes = require('./Docentes')

var EstudiantesController = require('./estudianteController')
var Estudiantes = require('./Estudiantes')

var RecordConstroller = require('./recordController')
var Record = require('./RecordAcademico')

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
//const { response } = require('express');
const asignaturaController = require('./asignaturaController');
const docenteController = require('./docenteController');
const estudianteController = require('./estudianteController')
const recordController = require('./recordController')

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

var port = process.env.port || 8090;
app.listen(port);
console.log('running in the port '+ port);

router.use((request,response,next) =>{
    console.log('Welcome, Time:', Date.now());
    next();
    });

router.route('/asignaturas').get((request, response)=>{
    asignaturaController.getAsignaturas().then(result =>{
        response.json(result);
        console.log(result)
    })
})


router.route('/asignaturas/:id').get((request, response)=>{
    asignaturaController.getAsignaturabyId(request.params.id).then(result =>{
        response.json(result);
        console.log(result)
    })
})

router.route('/asignaturas').post((request, response)=>{
    let asignatura = {...request.body}
    asignaturaController.postAsignatura(asignatura).then(result =>{
        response.status(201).json(result);        
       console.log('Creado!!!')
    })
})

router.route('/editAsignatura/:id').put((request, response)=>{
    let asignatura = {...request.body}
    asignaturaController.putAsignatura(asignatura,request.params.id).then(result =>{
       response.json(result)     
       console.log('Actualizado!!!')
    })
})

router.route('/deleteAsignatura/:id').delete((request, response)=>{
     asignaturaController.deleteAsignaturabyId(request.params.id).then(result =>{
        response.json(result)     
        console.log('Eliminado!!!')
     })
 })

 //App Docentes

 router.route('/docentes').get((request, response)=>{
    docenteController.getDocentes().then(result =>{
        response.json(result);
        console.log(result)
    })
})


router.route('/docentes/:id').get((request, response)=>{
    docenteController.getDocentebyId(request.params.id).then(result =>{
        response.json(result);
        console.log(result)
    })
})

router.route('/docentes').post((request, response)=>{
    let docente = {...request.body}
    docenteController.postDocente(docente).then(result =>{
        response.status(201).json(result);        
        console.log('Creado!')
       
    })
})

router.route('/editDocente/:id').put((request, response)=>{
    let docente = {...request.body}
    docenteController.putDocente(docente,request.params.id).then(result =>{
       response.json(result)     
       console.log('Actualizado!!!')
    })
})

router.route('/deleteDocente/:id').delete((request, response)=>{
     docenteController.deleteDocentebyId(request.params.id).then(result =>{
        response.json(result)     
        console.log('Eliminado!!!')
     })
 })

 //App Estudiantes

 router.route('/estudiantes').get((request, response)=>{
    estudianteController.getEstudiante().then(result =>{
        response.json(result);
        console.log(result)
    })
})


router.route('/estudiantes/:id').get((request, response)=>{
    estudianteController.getEstudiantebyId(request.params.id).then(result =>{
        response.json(result);
        console.log(result)
    })
})

router.route('/estudiantes').post((request, response)=>{
    let estudiante = {...request.body}
    estudianteController.postEstudiante(estudiante).then(result =>{
        response.status(201).json(result);        
        console.log('Creado!')
       
    })
})

router.route('/editEstudiante/:id').put((request, response)=>{
    let estudiante = {...request.body}
    estudianteController.putEstudiante(estudiante,request.params.id).then(result =>{
       response.json(result)     
       console.log('Actualizado!!!')
    })
})

router.route('/deleteEstudiante/:id').delete((request, response)=>{
     estudianteController.deleteEstudiantebyId(request.params.id).then(result =>{
        response.json(result)     
        console.log('Eliminado!!!')
     })
 })

 //App Record_Academico

 router.route('/record').get((request, response)=>{
    recordController.getRecord().then(result =>{
        response.json(result);
        console.log(result)
    })
})


router.route('/record/:id').get((request, response)=>{
    recordController.getRecordbyId(request.params.id).then(result =>{
        response.json(result);
        console.log(result)
    })
})

router.route('/record').post((request, response)=>{
    let record = {...request.body}
    recordController.postRecord(record).then(result =>{
        response.status(201).json(result);        
        console.log('Creado!')
       
    })
})

router.route('/editRecord/:id').put((request, response)=>{
    let record = {...request.body}
    recordController.putRecord(record,request.params.id).then(result =>{
       response.json(result)     
       console.log('Actualizado!!!')
    })
})

router.route('/deleteRecord/:id').delete((request, response)=>{
     recordController.deleteRecordbyId(request.params.id).then(result =>{
        response.json(result)     
        console.log('Eliminado!!!')
     })
 })

 //Consulta general

 router.route('/general').get((request, response)=>{
    asignaturaController.getGeneral().then(result =>{
        response.json(result);
        console.log(result)
    })
})

router.route('/promedio').get((request, response)=>{
    asignaturaController.getGeneralPromedio().then(result =>{
        response.json(result);
        console.log(result)
    })
})

router.route('/periodo').get((request, response)=>{
    recordController.getPeriodo().then(result =>{
        response.json(result);
        console.log(result)
    })
})
