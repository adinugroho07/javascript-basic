/**

Javascript OOP Konsep.

OOP merupakan sebuah konsep pemrograman dimana setiap action di bungkus ke dalam sebuah Object dan Object2 tersebut di tuliskan di dalam blueprint yang dinamakan Class.
Object adalah data yang berisi field / properties / attributes dan method / function / behavior . namun OOP di javascript tidak detail seperti di bahasa java atau C++ .



 */

//contoh pembuatan object di javascript.
const car = {
    tipe: "Sedan",
    warna: "Biru",
    name: "Civic",
    printCar: function() {
        console.log(`mobil ${this.tipe} warna ${this.warna} bernama ${this.name}`)
    }
}

//cara mengakses object nya.
console.log(car);
car.printCar();
