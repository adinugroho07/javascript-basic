/**
 * 
 * KONSEP WEB WORKER
 * 
 * 
 */

// const showLog = (total) => {
//     for (let index = 0; index < total; index++) {
//         console.log(index);
//     }
// }

//membuat worker
const worker = new Worker("worker.js")

worker.addEventListener("message", (message) => {
    console.log(message.data);
});



document.getElementById("buttonclick").onclick = () => {
    console.info("start");
    // showLog(100_000);
    worker.postMessage(400_000);
    console.info("end");
}