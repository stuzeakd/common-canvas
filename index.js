(function(){
var isNodeModule = typeof module !== "undefined" && module.exports;
var isRequirejs = typeof define === 'function' && define.amd;
    
var Canvas;
var Image;

/* Constructor Setting */
if(isNodeModule){
    var Canvas = require("canvas");   
    var Image = Canvas.Image;
}else {
    var Canvas = function(width, height){
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
}

var commonCanvas = {
    createCanvasByImage : function(img, saturate){
    //    console.log(__basename + " - function() createCanvasByImage start ...");
    //    console.log(img);

        var pixelNum = img.width * img.height;
        saturate = typeof saturate !== "undefined" ? saturate : pixelNum;    
        var pixelNumRate = pixelNum / saturate;

        var canvasWidth = img.width;
        var canvasHeight = img.height;

        if(pixelNumRate > 1){
//            console.log("resizing... pixcoelNumRate : " + pixelNumRate);
            var lengthRate =  Math.sqrt(pixelNumRate);
            canvasWidth = parseInt(canvasWidth/lengthRate);
            canvasHeight = parseInt(canvasHeight / lengthRate);
//            console.log("resizing result - canvasWidth : " + canvasWidth + ", canvasHeight : " + canvasHeight);
        }

        var rCanvas = new Canvas(canvasWidth, canvasHeight);
        var rCanvasCtx = rCanvas.getContext("2d");
        rCanvasCtx.drawImage(img, 0,0, img.width, img.height, 0,0, canvasWidth, canvasHeight);
    //    console.log(__basename + " - function() createCanvasByImage end");
        return rCanvas;
    } 
};
    
    
if(isNodeModule){
    module.exports = commonCanvas ;
}else if(isRequirejs){
    define(function(){ return commonCanvas });
}else {
    window.commonCanvas = commonCanvas;
}
})();