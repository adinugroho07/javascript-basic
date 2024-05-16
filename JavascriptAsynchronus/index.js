/*
Konsep Asynchronus Dan Synchronus.

Secara default program pada javascript akan di eksekusi dari baris per baris yang artinya jika baris sebelum nya belu selesai
di eksekusi maka baris selanjut nya tidak akan di eksekusi. Proses Eksekusi baris per baris ini di sebut juga sebagai Sycnchronus.
Proses Synchronus ini juga di sebut sebgai process bloking, karena harus menunggu tiap kode selesai di process baru dia akan 
lanjut ke baris kode selanjut nya.

Berbeda dengan proses yang nama nya Asynchronus, proses tersebut akan membuat javascript tidak akan menunggu proses pada baris
kode di eksekusi sampai dengan selesai. artinya dia akan lanjut ke baris kode selanjut nya tanpa harus menunggu prosses
Asynchronus selesai di eksekusi. Proses Aysnchronus ini juga di sebut sebagai process non blocking. pada saat sebuah process di
jadikan Asynchronus, maka untuk memanggil kembali process tersebut atau untuk kita bisa mengakses data nya maka kita perlu
menggunakan Callback function .



Konsep Callback.

Callback merupakan mekanisme untuk memanggil kembali kode yang ada di program dari proses Asyncrhonus. Callback ini biasanya
dibuat dalam bentuk function as parameter, dan parameter function tersebut akan dieksekusi saat proses Asyncrhonus selesai.
Dengan menggunakan Callback, program bisa menerima informasi yang dibutuhkan dari proses yang berjalan secara Asyncrhonus.
Ada banyak method yang secara default di set sebagai Asynchronus oleh javascript, salah dua nya adalah method berikut.
- setTimeout(callback, timeInMilis) --> digunakan untuk menjalankan proses Asyncrhonus sekali dalam waktu tertentu.
- setInterval(callback, timeInMilis) --> digunakan untuk menjalankan proses Asyncrhonus secara periodik dalam waktu tertentu.

 */

//contoh sederhana callback membuat callback.
function print(callback) {  
    const hello = 'hello from callback';
    callback(hello);//paramter yang di jadikan sebagai function untuk nanti di gantikan dengan body function lain.
}

//contoh sederhana cara memanggil dan menggunakan callback
print((event) => { //function yang menggantikan parameter callback
    console.log(event);
});

//bisa gini juga manggil callback nya
print(function(bla){
    console.log(bla);
});

//atau bisa gini juga manggil callback nya.
const foo = (anotherbla) => {
    console.log(anotherbla);
}
print(foo);



function addElement(){
    //craate element
    const header = document.createElement("h1");
    header.textContent = "Adi Nugroho";
    
    //nambahin element ke body.
    document.body.appendChild(header);
}

const setTime = () => {
    const header = document.getElementById("anotherheader");
    header.textContent = "Adi Nugroho Again, Hellow !! - " + new Date().toString();
    document.body.appendChild(header)
}

//contoh penggunaan callback.
setTimeout(addElement, 5000); //ini akan di eksekusi blakangan karena Asynchronus.
console.info("program selesai") //ini akan di eksekusi dulan.

// setInterval(setTime,2000);

