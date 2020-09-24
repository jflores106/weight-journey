let graph = require('./graph')
let moment = require('moment')

exports.notesDescription = function () {
    graph.graphDescription()
    console.log("Users can write diary entries.")
    let date = "12/15/2020"
    let m = moment(date, "MM/DD/YYYY").format("MMM Do YYYY")
    console.log("Using the moment package, I can change the date format from " + date + " to " + m.toString() + ".");

}

