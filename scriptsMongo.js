user1 = {
    'username':'user1',
    'age': 27,
    'email': 'user1@example.com'
}

db.users.insert(user1)

user2 = {
    'username':'user2',
    'age': 27,
    'email': 'user2@example.com'
}

user3 = {
    'username':'user3',
    'age': 27,
    'email': 'user3@example.com'
}

db.users.insert(user3)

user4 = {
    'username':'user4',
    'age': 28,
    'email': 'user4@example.com'
}
db.users.insertOne(user4)

db.users.insertMany([
{
    'username':'user5',
    'age': 27,
    'email': 'user5@example.com'
},
{
    'username':'user6',
    'age': 30,
    'email': 'user6@example.com'
},
{
    'username':'user7',
    'age': 27,
    'email': 'user7@example.com'
}
])

db.users.insertMany([
    {
        'username':'user8',
        'age': 27,
        'email': 'user8@example.com',
        'status':'activo'
    },
    {
        'username':'user9',
        'age': 30,
        'email': 'user9@example.com',
        'status': 'activo'
    },
    {
        'username':'user10',
        'age': 27,
        'email': 'user10@example.com',
        'status':'inactivo'
    },
    {
        'username':'user11',
        'age': 27,
        'email': 'user11@example.com',
        'status':'inactivo'
    }   
    ])

    // obtener el usuario con username igual user7
    db.users.find({
        username: 'user7'
    })
db.users.findOne({
    username:'user7'
})

// Obtener usuarios con una edad mayor a 10

db.users.find({
    edad:{$gt:10} 
})
//gt
//fte
//lt
//lte

// Obtener la cantidad de usuarios con edad menor a 30
// los objetos que devuelven un cursor tienen el metodo count
db.users.find({
    age:{$lt:30} 
}).count()

// Obtener todos los usuarios con edad mayor a 27 y estado activo
db.users.find({
    $and:[
        {age:{$gt:27}},
        {status:'activo'}
    ]
})

//Obtener los usuarios que tienen una edad diferente de 30
db.users.find({
    edad:{$ne:30}
})

//Obtener los usuarios que tengan edad 27 0 30
db.users.find({
    $or:[
        {age: 27},
        {age: 30}
    ]
})

db.users.find({
    age:{$in:[27,30]}
})

//Obtener los usuarios que tengan el atributo status:

db.users.find({
    status:{$exists:true}
})

db.users.find({
    status:{$exists:false}
})

//Obtener todos los usuarios con status activo
db.users.find({
    status:'activo'
})

db.users.find({
    $and:[
        {status:{$exists:true},},
        {status: 'activo'}
    ]
})

db.users.find({
    $and:[
        {status:{$exists:true}},
        {status:'activo'},
        {email:{$exists:true}}
    ]
})

//Obtener el usuario con mayor edad
db.users.find().sort({
    age: -1
})

db.users.find().sort({
    age: -1
}).limit(1)

//Obtener los usuarios mas jovenes

db.users.find().sort({
    age:1
}).limit(3)

// Expresiones regulares
db.users.find({
    email:/.com/
})

db.users.find({
    email:/^user/
})

//Cursores: estos  trabajan con un máximo de 20 documentos por página
db.users.find().count()
db.users.find().limit(5)
db.users.find().skip(5);

db.users.find().sort({
    age: -1
}).limit(1);

db.users.find().pretty();

db.users.find().forEach( user => print(user.username));

// Proyecciones:

db.users.find(
    {},// condiciones
    {
        _id: false,
        username:true,
        email:true
    }
)

// Actualizaciones:
// Forma 1
var user = db.users.findOne();
user.age = 10;
user.email = "user1@mojix.com";
user.status = "activo"; //atributo añadido
db.users.save(user);

// Forma 2
db.users.update(
    {_id:ObjectId("624ecdf19b830adefef4b8b4")},
    {
        $set:{
            age:18,
            username: "Tito"
        }
    }
);

// Quitar un atributo del documento
db.users.update(
    {_id:ObjectId("624eea669b830adefef4b8ba")},
    {
        $unset:{
            status:true
        }
    }
);

// Actualización de multiples documentos
db.users.update(
    { status:'inactivo'},
    {
        $set:{status:'activo'}
    },
    {multi:true}
);

db.users.updateMany(
    {email:{$exists:true}},
    {
        $set:{
            bio:"Añade tu biografía."
        }
    }
);

db.users.updateMany(
    {},
    {
        $inc:{
            age:1
        }
    }
);

db.users.remove({
    age:31
})

// Trabajando con documentos complejos

user13 = {
    'username': 'user13',
    'email':'user13@example.com',
    'age':21,
    'address':{
        'zip': 1001,
        'country': 'MX'
    },
    'course': ['Python','Pysapark','SQL','Java'],
    'comments':[
        {
            body: 'Best course',
            like: true,
            tags: ['MongoDB','Python']
        },
        {
            body: 'Super excited',
            like: true,
            
        },  
        {
            body:'This course its ok'
        }  ,
        {
            body: 'Bad course',
            like: true,
            tags: ['R']
        }          
    ]
}; 

user14 = {
    username:'user14',
    email:'user14@example.com',
    age:20,
    status:'activo',
    comments:[
        {
            body:'Nice course',
            like: false
        }
    ]
};

user15 = {
    username:'user15',
    email:'user14@example.com',
    age:20,
    status:'activo',
    comments:[
        {
            body:'Nice course',
            like: false
        }
    ]
};

db.users.insertMany(
    [user13, user14, user15]
)

// Obtener todos los usuarios que radiquen en Mexico

db.users.find({
    'address.country':'MX'
},
{
    username: true,
    'address.zip': true
});

// Actualizar codigo postal

db.users.updateMany({
    'address.zip':{$exists:true}
},
{
    $set:{
        'address.zip':110
    }
})


// Agregar address a aquellos usuarios que no la poseean

db.users.updateMany({
    'address':{$exists:false}
},
{
    $set:{
        'address':{
            country:'ECU',
            zip:120
        }
    }
})

db.users.updateOne(
    {
        username:'user13'
    },
    {
        $set:{
            'address.location':{
                lat:200,
                lon: -20
            }
        }
    }
);

db.users.find(
    {
        course:{$exists:true}
    }
)

// Obtener todos los usuarios que tienen al menos un comentario positivo
// elemMatch nos permite filtrar atributos de documentos dentro de listas

db.users.find(
    {
        comments:{
            $elemMatch:{
                like:true
            }
        }
    }
);


db.users.find(
    {
        comments:{
            $elemMatch:{
                $and:[
                    {like:true},
                    {tags:{$exists:true}}
                ]
            }
        }
    }
).pretty();

db.users.find(
    {
        comments:{
            $elemMatch:{
                $and:[
                    {like:true},
                    {tags:{$exists:true}}
                ]
            }
        }
    },
    {
        comments:true,
        username:true
    }
).pretty();

// $push permite agregar un atributo a un listado dentro del documento