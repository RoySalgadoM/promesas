let result = undefined;

console.log(result);
const waitUntil = (message)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            result = message;
            reject(result);
        }, 2000);
    });
}

// waitUntil('Puras promesas aquí')
// .then((result)=>{
//     console.log(result);
// }).catch((error)=>{
//     console.log(error);
// });


const multiplicarLento = (num1, num2)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(() => resolve(num1 * num2), 2000);
    });
}

const dividirRapido = (num1, num2)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(() => resolve(num1 / num2), 1000);
    });
}

// Promise.race([multiplicarLento(1, 2), dividirRapido(1, 2)])
// .then((result)=>{
//     console.log("Then: " + result);
// })
// .catch((error)=>{
//     console.log("Catch: " + error);
// });


