
//cursor (mouse/touch)
var cursor_x = 0;
var cursor_y = 0;
var cursor_x_old = 0;
var cursor_y_old = 0;
var cursor_down = 0;
var cursor_down_old = 0;
var cursor_damping = 0.7;
//drag distance for current frame
var drag_x = 0;
var drag_y = 0;
//cursor was mouse-clicked/touch-tapped (1=mouseup)
var cursor_clicked = 0;
//internal use
var cursor_clickdetect = 0;
//swipe velocity
var velocity_x = 0;
var velocity_y = 0;

function bind_mouse(canvas) {
    //bind mouse events                
    canvas.addEventListener('mousedown', mousedown_function, false);
    canvas.addEventListener('mousemove', mousemove_function, false);
    canvas.addEventListener('mouseup', mouseup_function, false);
    canvas.addEventListener('click', mouseclick_function, false);
}

function bind_touch(canvas) {
    //bind touch events                
    canvas.addEventListener('touchstart', touchstart_function, false);
    canvas.addEventListener('touchmove', touchmove_function, false);
    canvas.addEventListener('touchend', touchend_function, false);
}


//mouse 

function mousedown_function(evt) {
    drag_x = 0;
    drag_y = 0;
    var touch = evt;
    cursor_x_old = cursor_x;
    cursor_y_old = cursor_y;
    cursor_x = touch.clientX;
    cursor_y = touch.clientY;
    cursor_clickdetect = 1;
    //cursor_down_old = cursor_down;
    cursor_down = 1;
    evt.preventDefault();
}

function mousemove_function(evt) {
    var touch = evt;
    drag_x = (cursor_x - cursor_x_old);
    drag_y = (cursor_y - cursor_y_old);
    cursor_x_old = cursor_x;
    cursor_y_old = cursor_y;
    cursor_x = touch.clientX;
    cursor_y = touch.clientY;
    //prevent vertical bounce
    evt.preventDefault();
    //handle swipes
    if (cursor_down) {
        handle_swipe_events();
    }
    cursor_clickdetect = 0;
}
function mouseup_function(evt) {
    drag_x = 0;
    drag_y = 0;
    var touch = evt;
    //cursor_down_old = cursor_down;
    cursor_down = 0;
    if (cursor_clickdetect == 1) {
        cursor_clickdetect = 0;
        cursor_clicked = 1;
    }
    evt.preventDefault();
}
function mouseclick_function(evt) {
    cursor_clicked = 1;
    //evt.preventDefault();
}


//touch 

function touchstart_function(evt) {
    drag_x = 0;
    drag_y = 0;
    var touch = evt.touches[0];
    cursor_x_old = cursor_x;
    cursor_y_old = cursor_y;
    cursor_x = touch.clientX;
    cursor_y = touch.clientY;
    cursor_clickdetect = 1;
    cursor_clicked = 0;
    //cursor_down_old = cursor_down;
    cursor_down = 1;
    drag_x = 0;
    drag_y = 0;
}
function touchmove_function(evt) {
    drag_x = (cursor_x - cursor_x_old);
    drag_y = (cursor_y - cursor_y_old);
    var touch = evt.touches[0];
    //cursor_down_old = cursor_down; 
    cursor_x_old = cursor_x;
    cursor_y_old = cursor_y;
    cursor_x = touch.clientX;
    cursor_y = touch.clientY;
    //prevent vertical bounce
    evt.preventDefault();
    //handle swipes
    if (cursor_down) {
        handle_swipe_events();
    }
    cursor_clickdetect = 0;
    cursor_clicked = 0;

}
function touchend_function(evt) {
    drag_x = 0;
    drag_y = 0;
    //note: iPhone used changedTouches for touchend
    //var touch = evt.changedTouches[0];
    var touch = evt.touches[0];
    //cursor_down_old = cursor_down;
    cursor_down = 0;
    if (cursor_clickdetect == 1) {
        cursor_clickdetect = 0;
        cursor_clicked = 1;
    }
}


//swipe 

function handle_swipe_events() {
    velocity_x = (cursor_x_old - cursor_x);
    velocity_y = (cursor_y_old - cursor_y);
}

function damp_swipes() {
    //damp horizontal velocity
    velocity_x = velocity_x * cursor_damping;
    //damp vertical velocity
    velocity_y = velocity_y * cursor_damping;

}