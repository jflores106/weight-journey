let graph = require('./graph')
let moment = require('moment')
let EventEmitter = require('events').EventEmitter //same as:
// let Event = require('events')
// let EventEmitter = Event.EventEmitter

exports.notesDescription = function () {
    // graph.graphDescription()
    console.log("Users can write diary entries.")
    let date = "12/15/2020"
    let m = moment(date, "MM/DD/YYYY").format("MMM Do YYYY")
    console.log("Using the moment package, I can change the date format from " + date + " to " + m.toString() + ".");

    let emitter = new EventEmitter()
    graph.graphDescription(emitter) //function from file 2


    for (let i=0; i<10; i++){
        console.log('pre-emitter')
        emitter.emit('my event', i)
        console.log('post-emitter')
}


}


