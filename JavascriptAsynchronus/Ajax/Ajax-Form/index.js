const productname = document.getElementById("productnamefrm");
const yearfrm = document.getElementById("yearfrm");
const price = document.getElementById("pricefrm");
const cpumodel = document.getElementById("cpumodelfrm");
const hdsize = document.getElementById("hdsizefrm");
const submit = document.getElementById("submit");
const liveToast = document.getElementById("liveToast");
const liveToasterror = document.getElementById("liveToasterror");
const idproduct = document.getElementById("idproduct");
const submitfinddata = document.getElementById("submitfinddata");
let objectXHR = null;

const getObjectXHR = () => {
    if(objectXHR == null){
        return new XMLHttpRequest();
    } 
    return objectXHR;
}

let dataMain = []

const getUrl = () => {
    return 'https://api.restful-api.dev/objects';
}

const createFormElement = (labelvalue,id,type,value) => {

    const rowElement = document.createElement("div");
    rowElement.className = 'row mb-3';

    const label = document.createElement("label");
    label.className = 'col-sm-4 col-form-label';
    label.setAttribute('for',id);
    label.textContent = labelvalue;

    const colom = document.createElement("div");
    colom.className = 'col-sm-8'

    const input = document.createElement("input");
    input.className = 'form-control';
    input.setAttribute("id",id);
    input.setAttribute("type",type);
    input.setAttribute("value", value);
    input.readOnly = true;

    //nyusun
    colom.appendChild(input);

    rowElement.appendChild(label);
    rowElement.appendChild(colom);

    return rowElement;
}

const createCardElement = (data) => {
    const card = document.createElement("div");
    card.className = "card";

    const cardHeader = document.createElement("div");
    cardHeader.className = 'card-header';
    cardHeader.textContent = data.name;

    const cardBody = document.createElement("div");
    cardBody.className = 'card-body';

    const cardTitle = document.createElement("h5");
    cardTitle.className = 'card-title';
    cardTitle.textContent = 'Spesifikasi';

    //nyusun element
    card.appendChild(cardHeader);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(createFormElement('ID','id','text',data["id"]));
    cardBody.appendChild(createFormElement('Year','year','number',data.data.year));
    cardBody.appendChild(createFormElement('Price','price','number',data.data.price));
    cardBody.appendChild(createFormElement('CPU','cpu','text',data.data["CPU model"]));
    cardBody.appendChild(createFormElement('HD Size','hdsize','text',data.data["Hard disk size"]));
    


    card.appendChild(cardBody);

    return card;
    
}

const cariDataXHR = function(url){

    //cara pake url search param. ini tuh yang di url end point nya di akhir nya ada ?id=2 gitu. kayak contoh di bawah
    //https://api.restful-api.dev/objects?id=3&id=5&id=10
    //buat ngambil si id = 2 itu pake url search param ini.
    //lengkap nya ada di link https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    
    const azax = getObjectXHR();

    //cara penggunaan URL Search Param
    const idparam = new URLSearchParams();
    //ambil value dari input field idproduct untuk di masukkan ke value di param nya.
    idparam.append('id',idproduct.value);

    //cara menambahkan url search param di url end point nya.
    azax.open('GET',url+`?${idparam.toString()}`);

    azax.addEventListener('load', () => {
        
        if(azax.status == 200) {
            const jsonData = JSON.parse(azax.responseText);

            //inisialisasi modal object
            const exampleModal = document.getElementById("exampleModal");
            const modal = new bootstrap.Modal(exampleModal,{
                focus: true
            });

            //modal show
            modal.show();
    
            //create form in modal with data.
            const modalBody = document.getElementById("modal-body");
            modalBody.textContent = "";

            jsonData.forEach(element => {
                modalBody.append(createCardElement(element))
            });

        }

        if(azax.status == 404 || azax.status == 502){
            alert("URL Not Found Or Error CORS");
        }
    });

    azax.send();
}

const runXHR = (url,method,id,datakirim) => {
    const contentData = document.getElementById("contentData");

    const ajax = getObjectXHR();
    if(id != ''){
        ajax.open(method, url+"/"+id);
    } else {
        ajax.open(method, url);
    }

    ajax.addEventListener('readystatechange', () => {

        if(ajax.readyState == XMLHttpRequest.DONE){

            //load data when ajax state is DONE
            ajax.addEventListener('load', () => {
                //set toaster
                const toast = new bootstrap.Toast(liveToast);
                const toasterror = new bootstrap.Toast(liveToasterror);

                //check ajax status
                if(ajax.status == 200){
                    toast.show();
                    const jsonData = JSON.parse(ajax.responseText);
                    //console.log(jsonData);
                    contentData.textContent = "";
                    if(method == 'GET'){
                        
                        dataMain.forEach(element => {
                            contentData.appendChild(createCardElement(element));
                        })
                    }
                    
                    if(method == 'POST'){
                        const jsonData = JSON.parse(ajax.responseText);
                        dataMain.push(jsonData);
                        dataMain.forEach(element => {
                            contentData.appendChild(createCardElement(element));
                        })
                    }
                    
                }
                
                if(ajax.status == 404){
                    toasterror.show();
                    //alert("URL Not Found !!");
                }

                if(ajax.status == 502){
                    toasterror.show();
                    //alert("URL Not Found !!");
                }

                setTimeout(() => {
                    toast.hide();
                    toasterror.hide();
                }, 3000);
                
            })
        }
    });

    /**
     * FORM WITH AJAX 
     * 
     * untuk mengirimkan data hasil dari form maka maka kita bisa menggunakan URLSearchParams() karena pada dasar nya
     * ketika di send itu dia di blakang url nya nanti ada param nyaa yang bisa di search. nah param nyaa itu dari field2 yang
     * ada di form nya. jadi step2 nyaa seperti ini.
     * 1. ambil value dari field2 form dan di masukkan ke append --> URLSearchParams().append('namaparam',valuefield)
     * 2. merubah Content-Type yang di header yang tadi nya application/json menjadi application/x-www-form-urlencoded .
     *    ajax.setRequestHeader('Content-Type','application/json') --> ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
     * 3. object URLSearchParams() yang di sudah di append value2 yang ada di form field di masukkan ke dalam 
     *    parameter function send ajax --> ajax.send(objectparam)
     * 
     * UPLOAD FILE WITH FORM AJAX
     * 
     * masih di seputar form with ajax, di dalam form terdapat input yang berupa input file dimana ini di gunakna untuk fitur
     * upload data. ajax juga bisa mengirimkan file dari client ke server dengan menggunakan object FormData. lebih lengkap nya
     * ada di link berikut : https://developer.mozilla.org/en-US/docs/Web/API/FormData . ketika kita menggunakan object FormData
     * ini nanti secara otomatis Content-Type yang di set akan menjadi multipart/form-data karena ada kebutuhan kita untuk 
     * mengirimkan file. cara untuk menggunakan upload data with ajax ini sebagai berikut.
     * 
     * 1. ambil element input di dalam form dengan input type berupa file 
     *    <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"/>
     *    const fileupload = document.getElementById("avatar")
     * 
     * 2. buat object atau inisialisasi FormData() nya.
     *    const form = new FormData();
     * 
     * 3. masukkan value dari upload file tersebut ke dalam object FormData menggunakan function append() . untuk mengambil
     *    value dari hasil upload data nya kita bisa menggunakan object File yang sudah di sediakan oleh javascript. Dari object
     *    File tersebut kita bisa mengambil value nya dengan menggunakan function item(index file) . index ke 0 brarti kita 
     *    mengambil file yang di upload pertama.
     *    const readyUpload = fileupload.files.item(0) 
     *    form.append('namaparam',readyUpload)
     * 
     * 4. send data dengan ajax seperti biasa. nanti file yang sudah di tambahkan ke dalam FormData ini akan di rubah menjadi
     *    binary dan di save di end point.
     *    ajax.send(form)
     *   
     * berikut adalah link2 terkait yang bisa membantu dalam process ajax upload file.
     * https://developer.mozilla.org/en-US/docs/Web/API/File
     * https://developer.mozilla.org/en-US/docs/Web/API/FormData 
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file 
     * https://developer.mozilla.org/en-US/docs/Web/API/FileList 
     */

    if(method == 'POST'){
        ajax.setRequestHeader('Content-Type','application/json')
        ajax.send(datakirim);
    } else {
        ajax.send();
    }

}

submit.addEventListener('click', () => {
    tempData = {};
    data = {};
    tempData.name = productname.value;
    data["year"] = yearfrm.value;
    data["price"] = price.value;
    data["CPU model"] = cpumodel.value;
    data["Hard disk size"] = hdsize.value;
    tempData.data = data;

    // console.log(tempData);

    runXHR(getUrl(),'POST','',JSON.stringify(tempData));
    
    //remove last value
    productname.value = "";
    yearfrm.value = 2024;
    price.value = 0;
    cpumodel.value = "";
    hdsize.value = "";

   
});

submitfinddata.addEventListener('click', () => {
    cariDataXHR(getUrl());

    //remove last value
    idproduct.value = "";
});

// window.onload = runXHR(getUrl(),'GET','ff8081818f4d32ff018f5e2a5d844228',null);