var RtmClient = function (socket) {
    console.log('User connected');
    this.socket = socket;
    this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);

    socket.on('choose', this.onChoose.bind(this));
    socket.on('disconnect', this.onDisconnect.bind(this));
    socket.on('draw', this.onDraw.bind(this));
};

RtmClient.prototype.onChoose = function (id) {
    console.log("User choose", id);
    if (this.drawingId) {
        this.socket.leave(this.drawingId);
    }
    this.socket.join(id);
    this.drawingId = id;
};

RtmClient.prototype.onDisconnect = function () {
    console.log('User disconnected');
};

RtmClient.prototype.onDraw = function (draw) {
    this.socket.broadcast.to(this.drawingId).emit('draw', draw, this.color);
};

module.exports = RtmClient;




