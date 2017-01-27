/**
 * Created by gary on 27.01.17.
 */

var source = data.slice(0);
// console.log(source);

var myData = [].fill.call({ length: 128 }, 0);


source.forEach(function (channels) {

    [].slice.call(channels).forEach(function (el, idx) {
        myData[idx] += parseInt(el, 16);
    });

});


// var orig = [22.81, 23.09, 22.91, 23.23, 22.83, 23.05, 23.02, 23.29, 23.41, 23.49, 24.60, 24.63, 24.51, 23.73, 23.31, 23.53, 23.06, 23.25, 23.12, 22.80, 22.84];
// var origEMA = [22.81, 22.87, 22.87, 22.95, 22.92, 22.95, 22.96, 23.03, 23.10, 23.18, 23.47, 23.70, 23.86, 23.83, 23.73, 23.69, 23.56, 23.50, 23.42, 23.30, 23.21];

// var orig = [5.3, 6.7, 7.9, 7.1, 5.2, 4.1, 3.5, 5.4, 7.3, 9.4, 8.0, 6.6, 7.9, 9.2, 7.6];

var width = 20;



//
ema = getEma(myData, width);


console.log('data', myData);
console.log('ema:', ema);



// console.log('ema', );




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