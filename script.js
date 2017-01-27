/**
 * Created by gary on 27.01.17.
 */

var source = data.slice(0, 200);

var myData = [].fill.call({ length: 128 }, 0);
source.forEach(function (channels) {

    [].slice.call(channels).forEach(function (el, idx) {
        myData[idx] += parseInt(el, 16);
    });

});


var width = 10;

ema = getEma(myData, width);


console.log('data', myData);
console.log('ema:', ema);




Chart.defaults.global.elements.point.radius = 0;

var ctx = document.getElementById("myChart").getContext("2d");

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Array.apply(null, new Array(myData.length)).map(function (_, i) {return i;}),

        datasets: [
            {
                label: 'val',
                data: myData,
                borderWidth: 1,
                borderColor: 'red',
                backgroundColor: 'rgba(0,0,0,0)'
            },
            {
                label: 'ema',
                data: new Array(width).concat(ema),
                borderWidth: 1,
                borderColor: 'green',
                backgroundColor: 'rgba(0,0,0,0)'
            }]
    },

    options: {
        scaleShowVerticalLines: false,
        elements: {
            line: {
                tension: 0
            }
        },
        responsive: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});




function getEma(data, width) {
    var ema = [],
        a = 2 / (width + 1),
        sma = 0,
        i;

    for (i = 0; i < width; i++) {
        sma += data[i] / width;
    }
    ema.push(sma);
    for (i = width; i < data.length; i++) {
        ema.push(a*data[i] + (1 - a) * ema[ema.length - 1]);
    }
    return ema;
}