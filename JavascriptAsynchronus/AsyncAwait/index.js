/**
 * KONSEP ASNYC AWAIT
 * 
 * Async Await adalah sebuah fitur di javascript yang bisa mempermudah kita dalam menggunakan fitur Promise.
 * Async ini pun juga membuat kode kita jika di baca akan terlihat seperti Synchronus, padahal dia tetap Asynchronus.
 * Async ini dia menandakan bahwa function tersebut merupakan Asynchronus dan mengambalikan sebuah Promise. Jadi jika pada
 * sebelum nya jika kita ingin mengambalikan sebuah Promise kita perlu melakukan hal tersebut secara manual (new Promise())
 * dengan Async Await kita tidak perlu lagi.
 * 
 * Jadi setiap method yang di berikan async pasti method tersebut akan di bungkus dengan promise dan otomatis process yang ada
 * di dalam method tersebut akan menjadi Asynchronus. karena method nyaa sudah di bungkus menjadi promise maka yang di return
 * kan dari method tersebut adalah promise yang bisa di akses data nya menggunakan method .then() dan error handling nya
 * menggunakan .catch().
 * 
 * Await merupakan cara untuk mendapatkan value dari hasil promise. jadi dia akan menunggu hasil dari promise sampai dengan 
 * promise nya fulfilled state nya baru dia akan lanjut ke program selanjut nya. makanyaa Async Await bisa jadi Synchronus
 * atau menjadi blocking. Await ini hanya bisa di gunakan di dalam method Async.
 * 
 * waktu kita menggunakan promise kita juga pasti akan menangkap jika ada error yang terjadi. Di Promise manual biasanya kita
 * menggunakan method catch(), namun untuk Async Await ini kita bisa menggunakan fungsi bawaan javascript yaitu berupa try catch
 * block. di try catch block ini pun juga sudah mendukung final() method juga. 
 * 
 */

const getUrl = () => {
    return 'https://api.restful-api.dev/objects/7';
}

//contoh kode dengan Promise manual
const getNamePromise = () => {
    return new Promise((resolve,reject) => {
        resolve("Adi From Manual Promise");
    })
}

//contoh kode dengan menggunakan Async
const getNamePromiseAsync = async () => {
    return "Adi From Async Promise";
}

//biarpun manual Promise di letakkan di dalam Async dia tidak akan menjadikan double promise, namun tetap menjadi 1 Promise.
const getNamePromiseAsyncManualPromise = async () => {
    //tetap yang akan di return Promise nya hanya 1, biarpun dia nested promise
    return new Promise((resolve,reject) => {
        resolve("Adi from Promise inside Async");
    });
}

//kode di atas sama2 menghasilkan sebuah promise namun dengan cara yang berbeda2. jika di lihat lebih singkat menggunakan Async
//mengakses value promise nya.
getNamePromise().then((data) => console.info(data)); //yang pake promise manual.

getNamePromiseAsync().then((data) => console.info(data)); //yang menggunakan Async

getNamePromiseAsyncManualPromise().then((data) => console.info(data)); //yang menggunakan nested promise

//mengembalikan sebuah promise.
function getProduct(){
    const request = new Request(getUrl(), {
        method: 'GET'
    });

    const response = fetch(request);
    return response.then((response) => response.json());
}

//kita mau buat sebuah method yang menghasilkan nama product
//Dengan Menggunakan Promise Manual
function getProductNamePromise(){
    return new Promise((resolve,reject) => {
        //Promise dari getProduct() di masukkan ke dalam Promise getProductNamePromise()
        getProduct()
        .then((response) => resolve(response.name))
        .catch((error) => reject(error.error))
    });
}

//dengan menggunakan Async Await
async function getProductNameAsyncAwait(){
    //karena di Async Await tidak menggunakan .catch() maka bisa menggunakan try catch block bawaan javascript.
    try {
        //karena menggunakan await maka dia akan menunggu hingga data nyaa ada dulu dan value dari promise nya bisa langsung di
        //keluarkan sehingga response di bawah bisa langsung mengakses json nya.
        const response = await getProduct();
        return response.name; //langsung mengakses value dari promise getProduct();
    } catch (error) {
        console.error(error)
    }
}

//cetak hasil product name
getProductNamePromise().then((response) => console.info(response)); //yang pake promise manual.

getProductNameAsyncAwait().then((response) => console.info(response)); //yang menggunakan Async Await.