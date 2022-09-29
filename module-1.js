//node js project setup

//how node js work

//class 

// call back hell
setTimeout(() => {
    console.log('from thread pool 1')
    setTimeout(() => {
        console.log('from thread pool 2')
        setTimeout(() => {
            console.log('from thread pool 3')
        }, 1000);
    }, 1000);
}, 1000);

// single promise 
const myPromise = new Promise((resolve, reject) => {
    const user = { name: 'hasan' };
    if (!user) {
        setTimeout(() => {
            reject('my promise rejected')
        }, 1000);
    } else {
        setTimeout(() => {
            resolve('my promise resolved')
        }, 1000);
    }
})
myPromise.then((res) => console.log(res)).catch(err => console.log(err))

// Multiple promise handle
let userData = [];
const userIds = [1, 2, 3, 4, 5];
for (let i = 0; i < userIds.length; i++) {
    myPromise
        .then((res) => {
            userData.push(res)
        })
        .catch(err => {
            console.log(err)
        })
    console.log(i)
}

// Asyng Await
async function myfun(){
    const res = await myPromise
    console.log(res)
    console.log('asds2')
}
myfun();

// error handle
