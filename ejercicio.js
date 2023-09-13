// Ejercicio 1: Promesas Encadenadas
// Crea una función que realice las siguientes tareas:

// Inicia una promesa que se resuelva después de 2 segundos con un número aleatorio entre 1 y 100.
// Luego, toma ese número y crea una segunda promesa que se resuelva después de 3 segundos con el resultado de elevar ese número al cuadrado.
// Finalmente, toma el resultado de la segunda promesa y crea una tercera promesa que se resuelva después de 1 segundo con la raíz cuadrada del número resultante.

const random = (min, max)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(() => resolve(Math.floor(Math.random() * (max - min + 1)) + min), 2000);
    });
}

const square = (num)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(() => resolve(num * num), 3000);
    }
    );
}

const squareRoot = (num)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(() => resolve(Math.sqrt(num)), 1000);
    }
    );
}

random(1, 100)
.then((result)=>{
    console.log("Número aleatorio: " + result);
    return square(result);
}
).then((result)=>{
    console.log("Cuadrado de número: " + result);
    return squareRoot(result);
}
).then((result)=>{
    console.log("Cuadrado del cuadrado: " + result);
});


// Ejercicio 2: Promesa de Múltiples Solicitudes
// Crea una función que realice las siguientes tareas:

// Recibe un array de URLs como argumento.
// Utiliza fetch y promesas para realizar una solicitud GET a cada URL en el array.
// Devuelve una promesa que se resuelva con un array de los resultados de todas las solicitudes.

const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts',
];

const get = (url)=>{
    return new Promise((resolve, reject)=>{
        fetch(url)
        .then((response)=>{
            resolve(response.json());
        })
        .catch((error)=>{
            reject(error);
        });
    });
};

Promise.all(urls.map((url)=>{
    return get(url);
}))
.then((result)=>{
    console.log(result);
})
.catch((error)=>{
    console.log(error);
});

// Ejercicio 3: Promesas Paralelas
// Crea una función que realice las siguientes tareas:

// Recibe un array de funciones que devuelven promesas como argumento.
// Ejecuta todas las funciones en paralelo y espera a que todas las promesas se resuelvan.
// Devuelve una promesa que se resuelva con un array de los resultados de todas las promesas.

Promise.all([random(1, 100), square(5), squareRoot(25)])
.then((result)=>{
    console.log(result);
})
.catch((error)=>{
    console.log(error);
});


// Ejercicio 4: Promesas en Cadena con Retraso
// Crea una función que realice las siguientes tareas:

// Recibe un número n como argumento.
// Utiliza un bucle para crear una cadena de promesas, donde cada promesa se resuelve después de N segundos con el número actual en el bucle.
// Cada promesa debe imprimir el número en la consola antes de resolverse.
// Finalmente, devuelve una promesa que se resuelva después de N segundos con el mensaje "Todas las promesas se resolvieron".


const delay = (n, loopNumber)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log("El número en el bucle es: " + loopNumber);
            resolve(loopNumber);
        }, n * 1000);
    });
}

const finalPromise = (n)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve("Todas las promesas se resolvieron");
        }, n * 1000);
    });
}


const promiseChain = (n)=>{
    let promiseArray = [];
    for(let i = 0; i < n; i++){
        promiseArray.push(delay(n, i));
    }
    return Promise.all(promiseArray)
    .then((result)=>{
        return finalPromise(n);
    })
}

promiseChain(5).then((result)=>{
    console.log(result);
});


// Ejercicio 5: Promesa con Cancelación
// Crea una función que realice las siguientes tareas:

// Inicia una promesa que se resuelva después de 5 segundos con un mensaje.
// Si se llama a una función cancel antes de que se cumplan los 5 segundos, la promesa debe rechazarse con el mensaje "Promesa cancelada".

const promise = () => {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve("Promesa resuelta");
        }, 5000);
    });
}

const cancel = ()=>{
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            reject("Promesa cancelada");
        }, 2000);
    });
}

Promise.race([promise(), cancel()])
.then((result)=>{
    console.log(result);
})
.catch((error)=>{
    console.log(error);
});

