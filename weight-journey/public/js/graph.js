let description = require('./description')


exports.graphDescription = function (emitter) {
    description.getDescription()
    console.log("A graph will display users' weight entries over a period.")


    emitter.on('my event', function (i){
        console.log('Event received ' + i)

    })

}


