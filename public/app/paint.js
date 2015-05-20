$(document).ready(function () {

    // Variables :
    var color = "#000";
    var painting = false;
    var started = false;
    var width_brush = 5;
    var canvas = $("#main-canvas");
    var cursorX, cursorY;
    var restoreCanvasArray = [];
    var restoreCanvasIndex = 0;

    var context = canvas[0].getContext('2d');

    var points = [];

    // Trait arrondi :
    context.lineJoin = 'round';
    context.lineCap = 'round';

    // Click souris enfonc� sur le canvas, je dessine :
    canvas.mousedown(function (e) {
        painting = true;

        // Coordonn�es de la souris :
        cursorX = (e.pageX - this.offsetLeft);
        cursorY = (e.pageY - this.offsetTop);
    });

    // Relachement du Click sur tout le document, j'arr�te de dessiner :
    $(this).mouseup(function () {
        painting = false;
        started = false;
        console.log(points);
        points = [];
    });

    // Mouvement de la souris sur le canvas :
    canvas.mousemove(function (e) {
        // Si je suis en train de dessiner (click souris enfonc�) :
        if (painting) {
            // Set Coordonn�es de la souris :
            cursorX = (e.pageX - this.offsetLeft) - 10; // 10 = d�calage du curseur
            cursorY = (e.pageY - this.offsetTop) - 10;

            // Dessine une ligne :
            drawLine();
        }
    });

    // Fonction qui dessine une ligne :
    function drawLine() {
        // Si c'est le d�but, j'initialise
        if (!started) {
            // Je place mon curseur pour la premi�re fois :
            context.beginPath();
            context.moveTo(cursorX, cursorY);
            started = true;
        }
        // Sinon je dessine
        else {
            context.lineTo(cursorX, cursorY);
            context.strokeStyle = color;
            context.lineWidth = width_brush;
            context.stroke();
        }
        points.push({x: cursorX, y: cursorY});
    }

    function fromPoints(points) {
        var startedTmp = false;
        points.forEach(function (point) {
            if (!startedTmp) {
                // Je place mon curseur pour la premi�re fois :
                context.beginPath();
                context.moveTo(point.x, point.y);
                startedTmp = true;
            }
            // Sinon je dessine
            else {
                context.lineTo(point.x, point.y);
                context.strokeStyle = color;
                context.lineWidth = width_brush;
                context.stroke();
            }
        });
    }

});