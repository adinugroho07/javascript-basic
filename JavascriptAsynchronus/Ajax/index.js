/*

Konsep AJAX

AJAX merupakan singkatan dari Asynchronous JavaScript and XML. AJAX biasanya digunakan untuk mengambil atau mengirim data ke 
URL lain tanpa harus merefresh page yang sedang kita buka. Untuk membuat AJAX, kita bisa menggunakan class XMLHttpRequest.
berikut adalah link detail nya : https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest .

Dalam berkomunikasi client dan server AJAX selalu memberikan response status. response status ini bisa di akses dengan cara
mengakses dari object AJAX nyaa yang sudah di inisialisasi dan mengakses method status() seperti contoh di bawah.

AJAX juga memiliki tahapan state dimana kita bisa mendapatkan banyak sekali state di Ajax menggunakan property readyState.
Property readyState mengembalikan nilai number, dimana tiap number merupakan representasi dari statenya.
- value : 0 --> state : UNSENT --> Client has been created. open() not called yet.
- value : 1 --> state : OPENED --> open() has been called.
- value : 2 --> state : HEADERS_RECEIVED --> send() has been called, and headers and status are available.
- value : 3 --> state : LOADING --> Downloading; responseText holds partial data.
- value : 4 --> state : DONE --> The operation is complete.


*/

const pokemon = document.getElementById("pokemon");
const namepokemon = document.getElementById("name");
const weightpokemon = document.getElementById("weight");
const buttonGass = document.getElementById("btngas");
const ul = document.getElementById("listmove");


const getUrl = (keyword) => {
    return `https://pokeapi.co/api/v2/pokemon/${keyword}`;
}

const removeLi = () => {
    ul.textContent = "";
}

const runXHR = (url) => {
    //cara membuat AJAX
    const ajax = new XMLHttpRequest();
    
    //untuk menentukan dia Get data atau post data.
    ajax.open('GET',url);

    //cek state nya.
    ajax.addEventListener('readystatechange', () => {
        
        //kalo AJAX state nyaa done baru kita action ngapain
        if(ajax.readyState == XMLHttpRequest.DONE){

            //untuk mengambil hasil dari yang di send, karena ini proses ini Asynchronus.
            ajax.addEventListener('load', () => {
                
                //cek status response ajax
                if(ajax.status == 200){
                    const jsonData = JSON.parse(ajax.responseText);
                    namepokemon.textContent = `Nama Pokemon : ${jsonData.name}`;
                    weightpokemon.textContent = `Berat Pokemon : ${jsonData.weight}`;
                    removeLi();
                    jsonData.moves.forEach(element => {
                        const li = document.createElement("li");
                        li.textContent = element.move.name;
                        ul.appendChild(li);  
                    });
                }

                if(ajax.status == 404){
                    alert("URL Not Found !!")
                    namepokemon.textContent = ''
                    weightpokemon.textContent = ''
                    pokemon.value = ''
                    removeLi();
                }
            });
        }
    });

    
    //mengirimkan request.
    ajax.send();
}

buttonGass.addEventListener("click", () => {
    runXHR(getUrl(pokemon.value));
})


