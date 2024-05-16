/**
 * Konsep Promise.
 * 
 * Promise merupakan proxy untuk sebuah nilai di masa depan (Future) yang belum diketahui saat pembuatan Promise tersebut. jadi
 * misal kita membuat sebuah data kan kita tau data nyaa seperti apaa di saat itu juga, nah promise ini misal kita membuat 
 * sebuah data namun kita belum tau saat ini datanya seperti apa tapi nanti data itu akan datang, jadi semacam janji nanti akan
 * ada datang untuk mengisi data yang saat ini kita tidak tau nilai nya. Dalam Penjelasan Official nya adalah berikut.
 * "The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value."
 * jadi Promise ini adalah untuk process yang Asynchronus.
 * 
 * Didalam Promise terdapat state yang mengindikasikan process deliver data nya.
 * 1. State : Pending
 *    Result : undefined
 * 2. State : Fulfilled
 *    Result : value
 * 3. State : Rejected
 *    Result : error
 * 
 * salah satu keuntungan dengan menggunakan Promise ini adalah untuk menghindari process callback yang terlalu dalam atau yang
 * biasa di kenal sebagai callback hell.
 * 
 * contoh case : misal kita akan mengambil data ke server, kita tau di server ada data product dan akan kita ambil sehingga kita
 * tau nanti akan ada data product yang akan akan di berikan oleh server. namun kita tidak tau kapan datang nyaa data si product
 * ini untuk bisa kita tampilkan. oleh karena itu kita menggunakan promise untuk memberitahu jika data product nya sudah ada
 * maka mohon untuk di process lebih lanjut atau misal data product nyaa tidak datang di throw error data not found.
 * 
 * 
 * PROMISE METHOD
 * 
 * promise memiliki 3 method yang bisa kita gunakan sesuai fungsi2 nya. berikut method nya
 * 1. then() --> untuk mendapatkan atau mengubah data ketika Promise sukses
 * 2. catch() --> untuk mendapatkan data error ketika Promise gagal
 * 3. finally() --> akan dieksekusi ketika terjadi sukses atau gagal pada Promise
 * 
 * ketika di dalam promise nya resolve nya yang di panggil maka kita bisa mengakses value yang di resolve dari method then() ini.
 * namun jika di dalam promise nya method rejected nyaa yang di panggil maka otomatis method yang akan di jalan kan adalah catch().
 * lebih jelas nyaa bisa di cek di link berikut.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#instance_methods 
 * 
 * promise juga memiliki static method yang siap di panggil dari object Promise nya. detail lengkap nyaa ada di link di bawah.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#static_methods .
 * berikut adalah beberapa static method pada promise yang sering di gunakan.
 * 1. all([namapromise]) --> digunakan untuk mengeksekusi beberapa promise sekaligus dan menunggu semua hasil promise nya 
 *                           di fulfilled. di static method all() ini promise nyaa harus success/fulfilled semua, 
 *                           tidak boleh ada yang rejected/error .
 * 2. any([namapromise]) --> digunakan untuk mengeksekusi beberapa promise sekaligus dan mengambil hasil promise paling cepat.
 *                           namun untuk any() ini promise yang di ambil yang paling cepat dan tidak error/rejected promise nya.
 * 3. race([namapromise]) --> digunakan untuk mengeksekusi beberapa promise sekaligus dan mengambil hasil promise paling cepat.
 *                           namun untuk race() ini promise yang di ambil yang paling cepat selsai nya. jadi biar pun promise nya
 *                           fulfilled(success)/rejected(error) dia tidak peduli, yang penting siapa promise yang selsai duluan
 *                           dia akan di ambil.
 * 
 * 
 * 
 */

//contoh pembuatan Promise.
// const promise = new Promise(function(resolve,rejected){
//     if(true){
//         resolve("data berhasil di dapat");
//     } else {
//         rejected("data gagal di terima.")
//     }
// });

const getUrl = (keyword) => {
    return `https://api.restful-api.dev/objects/${keyword}`;
}

//contoh pembuatan Promise dan di gabung dengan ajax.
const getProduct = (id) => {
    return new Promise((resolve,rejected) => {
        const ajax = new XMLHttpRequest();
    
        ajax.open("GET",getUrl(id));
        ajax.onload = () => {
            if(ajax.status == 200){
                //jika data berhasil di ambil maka akan di lempar ke resolve untuk di process lebih lanjut.
                resolve(JSON.parse(ajax.responseText));
            } else {
                rejected(JSON.parse(ajax.responseText));
            }
        };
    
        ajax.send();
    });
}

const createElementTable = (datajson) => {
    const tbody = document.getElementById("tbody");
    const tr = document.createElement("tr");

    const id = document.createElement("td");
    id.textContent = datajson.id;

    const name = document.createElement("td");
    name.textContent = datajson.name;

    const year = document.createElement("td");
    year.textContent = datajson.year;

    const price = document.createElement("td");
    price.textContent = datajson.price;

    const CPUmodel = document.createElement("td");
    CPUmodel.textContent = datajson.cpumodel;

    const Harddisksize = document.createElement("td");
    Harddisksize.textContent = datajson.hdsize;

    //proses nyusun
    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(year);
    tr.appendChild(price);
    tr.appendChild(CPUmodel);
    tr.appendChild(Harddisksize);
    tbody.appendChild(tr);
}


//cara mengakses value dari promise dan menggunakan promise method nya beserta cara chaining nya (method then() nyaa ada 2).
getProduct(7)
    .then((response) => {
        //ini di return supaya di method then() yang selanjut nya bisa di ambil value nya di parameter mehtod then() nya.
        return {
            id: response.id,
            name: response.name,
            year: response.data.year,
            price: response.data.price,
            cpumodel: response.data["CPU model"],
            hdsize: response.data["Hard disk size"]
        };
    })
    .then((result) => {
        //disini tidak ada return nya karena mememang di method then() yang ini dia akan memproses data nya.
        console.log(result);
        createElementTable(result);
    })
    .catch((error) => {
        console.error(error);
        alert(error.error);
    })
    .finally(() => {
        console.log("final bang")
    });

//contoh penggunaan static method untuk menangkap lebih dari 1 promise
const staticMethodPromise = Promise.all([
    getProduct(7),
    getProduct(7),
    getProduct(7),
    getProduct(7),
]);
staticMethodPromise.then((response) => {
    const returnme = [];
    response.forEach(element => {
        returnme.push({
            id: element.id,
            name: element.name,
            year: element.data.year,
            price: element.data.price,
            cpumodel: element.data["CPU model"],
            hdsize: element.data["Hard disk size"]
        });
    });

    return returnme;
}).then((result) => {
    console.log(result);
    result.forEach(element => {
        createElementTable(element)
    })
})
.catch((error) => {
    console.error(error);
    alert(error.error);
})
.finally(() => {
    console.log("final bang")
});


