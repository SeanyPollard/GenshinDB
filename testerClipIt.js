const Clipper = require('image-clipper');
const Canvas = require('canvas');

Clipper.configure({
    canvas: Canvas
})

// async function main() { 
    // console.log("running");
//     try {
    function clipit() {
        console.log("I started")
        Clipper('/Write Up/Inv Art.png', function() {
            this.crop(20, 20, 100, 100)
            .resize(50, 50)
            .quality(80)
            .toFile('/public/dump.jpg', function() {
            console.log('saved!');
            });
        });
        console.log("I finished")
    }
//     } catch (error) {
//         console.log(error);
//     }
// }

// main();
clipit()