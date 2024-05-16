/**
 * KONSEP FETCH API
 * 
 * Fetch API merupakan fitur baru sebagai alternatif AJAX.Saat menggunakan AJAX, kita perlu menggunakan Callback 
 * untuk menerima response atau data dari Server, sedangkan Fetch API sudah menggunakan Promise, sehingga penggunaan 
 * Fetch API lebih mudah dibandingkan AJAX. detail lengkap nyaa terkait Fecth API ada di link di bawah.
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * 
 * Object Request
 * Saat kita akan mengirim request menggunakan Fetch API, kita perlu membuat object Request terlebih dahulu. isi dari object
 * Request ini seperti URL end point, header, body, mode, dll. untuk detail nya bisa di lihat di link di bawah.
 * https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
 * syntaks Request : new Request(url, options) --> options ini yang nanti akan di isikan detail config pengirimannya seperti apa.
 * contoh : 
 * const oldRequest = new Request("https://github.com/mdn/content/issues/12959",
        { headers: { From: "webmaster@example.org" } },
   );
 * 
 * Method Fecth
 * method yang akan mulai melakukan request data sesuai dengan spesifikan di object Request dan akan mengembalikan sebuah promise
 * yang sudah fulfilled.
 * 
 * Object Response
 * Hasil dari Fetch API (menggunakan method fecth()) adalah sebuah Promise. Promise yang di kembalikan tersebut berisikan 
 * object Response . ada banyak Ada banyak property dan method pada object Response, kita bisa menggunakannya sesuai 
 * dengan yang kita butuhkan. berikut detail nya ada di link di bawah.
 * https://developer.mozilla.org/en-US/docs/Web/API/Response .
 * 
 * 
 */

const getUrl = () => {
    return 'https://api.restful-api.dev/objects';
}

//membuat object request.
const request = new Request(getUrl(),{
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json" 
    },
    body: JSON.stringify({
        name: "Apple MacBook Pro 16",
        data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB"
        }
    })
});

//memasukkan object request ke dalam fetch() method.
const response = fetch(request);

//atau kita bisa langsung membuat Object Request nya di dalam method fetch().
const anotherResponse = fetch(getUrl(),{
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json" 
    },
    body: JSON.stringify({
        name: "Apple MacBook Pro 16",
        data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB"
        }
    })
})

//karena yang di return kan adalah promise maka kita bisa akses lewat mehtod then()
response.then((response) => {
    return response.json();
}).then((response) => {
    console.info(response);
})

anotherResponse.then((response) => {
    return response.json();
}).then((response) => {
    console.info(response);
})

