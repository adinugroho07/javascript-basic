addEventListener('message', (event) => {
    const total = event.data;
    for (let index = 0; index < total; index++) {
        postMessage(index);
    }
});