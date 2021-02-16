// Adam Katz
// 2/16/2021
// Assignment 2 
// I tried to make an abstract image of a fox wearing an Asian conical hat


"use strict";

var canvas;
var gl;

var vertices;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) alert( "WebGL 2.0 isn't available" );


    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1, 1, 1, 1.0);

    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

     vertices = [
         //The hat
        vec2(0, 1),
        vec2(-1, 0),
        vec2(1,0),

        //Face
        vec2(0, -1),
        vec2(-.5,0),
        vec2(.5,0),
        
        //Left eye (from my POV)
        vec2(-.10,.2),
        vec2(-.40,.2),
        vec2(-.25, -.1),

        //Right eye (from my POV)
        vec2(.10,.2),
        vec2(.40,.2),
        vec2(.25, -.1),

        //Nose 
        vec2(0, -1),
        vec2(-.13, -.75),
        vec2(.13, -.75),

        //Hat shading??
        vec2(1,0),
        vec2(-1,0),
        vec2(0,.1)

        
        

        
    ];

    var colors = [
        //Hat color 
        vec3(0,0,0),
        vec3(0,0,0),
        vec3(0,0,0),

        //face color
        vec3(1,0,0),
        vec3(1,1,0),
        vec3(1,0,0),

        //Eye color
        vec3(0,0,0),
        vec3(0, 0,0),
        vec3(0,0,0),

        //eye color
        vec3(0,0,0),
        vec3(0, 0,0),
        vec3(0,0,0),

        //nose color
        vec3(1,1,1),
        vec3(0, 0,0),
        vec3(0,0,0),

        //Hat brim color
        vec3(1,1,1),
        vec3(1,1,1),
        vec3(0,0,0)
    ];


    let cBuffer = gl.createBuffer(); 
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer); 
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW); 

    let colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(colorLoc);

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data bufferData

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    

    render();
};


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length);
    requestAnimationFrame(render);
}
