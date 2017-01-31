/**
 * Created by gary on 27.01.17.
 */

// var source = data.slice(0, 200);
var source = data.slice(0);

var myData = [].fill.call({ length: 128 }, 0);
source.forEach(function (channels) {

    [].slice.call(channels).forEach(function (el, idx) {
        myData[idx] += parseInt(el, 16);
    });

});

// myData = [].reverse.call(myData);
// myData = [1,2,1,2,1,2,10,2,1,2,1,2,1,2,1,2,1,25,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1];

console.dir(myData);


var width = 10;

ema = getEma(myData, width);


console.log('data', myData);
console.log('ema:', ema);

// console.log(Math.min(...ema[2]));
var minVal = ema[2][0], minId;
for (var i = 0; i < ema[2].length; i++) {
    if (ema[2][i] < minVal) {
        minId = i;
        minVal = ema[2][i];
    }
}
// console.log('id', minId, 'val', minVal);
var bestCh = [].fill.call({ length: 128 }, 0);
bestCh[minId] = -5;






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
            // {
            //     label: 'ema',
            //     data: ema[0],
            //     borderWidth: 1,
            //     borderColor: 'green',
            //     backgroundColor: 'rgba(0,0,0,0)'
            // },
            // {
            //     label: 'ema2',
            //     data: ema[1],
            //     borderWidth: 1,
            //     borderColor: 'blue',
            //     backgroundColor: 'rgba(0,0,0,0)'
            // },
            {
                label: 'ema12',
                data: ema[2],
                borderWidth: 1,
                borderColor: 'black',
                backgroundColor: 'rgba(0,0,0,0)'
            },
            {
                label: 'bestCh',
                data: bestCh,
                borderWidth: 1,
                borderColor: 'green',
                backgroundColor: 'rgba(0,0,0,0)'
            }
            ]
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

console.log(bestCh);

function getEma(data, width) {

    data[0]++;
    data[data.length-1]++;

    var ema = [],
        ema2 = [],
        a = 2 / (width + 1),
        sma = 0,
        i;

    for (i = 0; i < width; i++) {
        sma += data[i] / width;
    }
    for (i = 0; i < width; i++) {
        ema.push(sma);
    }
    for (i = width; i < data.length; i++) {
        ema.push(a*data[i] + (1 - a) * ema[ema.length - 1]);
    }


    sma = 0;
    for (i = data.length - 1; i > data.length - width - 1; i--) {
        sma += data[i] / width;
    }
    for (i = data.length - 1; i > data.length - width - 1; i--) {
        ema2.unshift(sma);
    }

    for (i = data.length - width -1 ; i >= 0; i--) {
        ema2.unshift(a*data[i] + (1 - a) * ema2[0]);
    }

    var ema3 = [];
    // for (i = 0; i < ema.length; i++) {
    //     var k = i - parseInt(ema.length / 2);
    //
    //     ema3.push((ema[i] + ema2[i] + k*k/1500) / 3);
    // }

    for (i = 0; i < ema.length; i++) {
        var k = i - parseInt(ema.length / 2);

        ema3.push((ema[i] + ema2[i]) / 2);
    }

    return [ema, ema2, ema3];
}