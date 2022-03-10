

function Split(numColsToCut: number, numRowsToCut: number, file: File, image: HTMLImageElement) {
    var _URL = window.URL || window.webkitURL;
    var imagePieces = [];
    const objectURL = _URL.createObjectURL(file);

    for(var x = 0; x < numColsToCut; ++x) {
        for(var y = 0; y < numRowsToCut; ++y) {
            var canvas = document.createElement('canvas');
            canvas.width = 500 / numColsToCut;
            canvas.height = 500 / numRowsToCut;
            var context = canvas.getContext('2d')!;
            context.drawImage(image, x * canvas.width, y * canvas.height, 100, 100, 0, 0, canvas.width, canvas.height);
            imagePieces.push(canvas.toDataURL());
        }
    }

    console.log(imagePieces);
    return imagePieces;
}

export default Split;