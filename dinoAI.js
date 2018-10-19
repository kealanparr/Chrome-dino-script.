// A JS script made for the offline Chrome dino game. Accessible most easily from chrome://dino/
// This script was made to be very simple and I didn't want to spend too much optimising this
// This script regularly scores between ~ 5,000 and 15,000
var canvas = document.getElementsByTagName("canvas")[0],
    ctx = canvas.getContext("2d"); // Return the drawing context of the canvas	

(function recurseDinoScript() {

    // The dino game has a bug, where the Dino "floats" to the right. So we set the Dino position to stop it
    Runner.instance_.tRex.xPos = 21;

    // Reduce the Uint8ClampedArray into a number. If it isn't zero, there's an obstacle
    let cactus =      (ctx.getImageData(80, 118, 85, 1).data).reduce(reducer); // Put an 85 pixel long line in front of us. If there's anything there, jump. (Down arrow key)
    let pterodactyl = (ctx.getImageData(90, 85, 40,  1).data).reduce(reducer); //  Put a 40 pixel long line above our head. If there's anything there, duck. (Up arrow key)

    if (cactus) {
        let jump = new KeyboardEvent('keydown', {
            'keyCode': 38,
            'which': 38
        });
        document.dispatchEvent(jump);
    } else if (pterodactyl) {
        let duck = new KeyboardEvent('keydown', {
            'keyCode': 40,
            'which': 40
        });
        document.dispatchEvent(duck);

        // The jump doesn't require firing a keyup event, but the duck event does, or else it is held down
        setTimeout(function() {
            var cancelDuck = new KeyboardEvent('keyup', {
                'keyCode': 40,
                'which': 40
            });
            document.dispatchEvent(cancelDuck);
        }, 250)
    }
    setTimeout(recurseDinoScript, 5);
})();

// Array.reduce() takes a function to reduce the array down to a single number.
function reducer(a, b) {
    return a + b
}