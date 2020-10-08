let axios = require('axios');

exports.getActivity = function () {

    axios.get('https://www.boredapi.com/api/activity')
        .then(function (response){
            console.log(response.data.activity)
            span.innerText = response.data.activity;

        })
        .catch(function (){
            console.log('converting it to a String')
        })

    let span = document.createElement("SPAN")
    document.querySelector("DIV").appendChild(span)
}