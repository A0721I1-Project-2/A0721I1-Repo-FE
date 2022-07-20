function generateColor() {
    let r = parseInt(Math.random() * 255);
    let g = parseInt(Math.random() * 255);
    let b = parseInt(Math.random() * 255);
    return `rgb(${r},${g},${b})`
}

const COLORS = [
    '#4dc9f6',
    '#f67019',
    '#f53794',
    '#537bc4',
    '#acc236',
    '#166a8f',
    '#00a950',
    '#58595b',
    '#8549ba'
];

function color(index) {
    return COLORS[index % COLORS.length];
}

function productChart(id, productLabels = [], productInfo = []) {
    let colors = [];
    let length = 9
    for (let i = 0; i < length; i++) {
        colors.push(color(i))
    }

    const data = {
        labels: productLabels,
        datasets: [{
            label: 'Statistics by each products',
            data: productInfo,
            backgroundColor: colors,
            borderColor: colors,
            hoverOffset: 4
        }]
    }
    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: ''
                }
            },
            scales: {
                r: {
                    ticks: {
                        backdropPadding: {
                            x: 10,
                            y: 4
                        }
                    }
                }
            }, layout: {
                padding: {
                    left: 50,
                    bottom:200
                }
            }
        },
    };
    //Global Options
    // Chart.defaults.global.defaultFontFamily = 'Lato';
    // Chart.defaults.global.defaultFontSize = '18';
    // Chart.defaults.global.defaultFontColor = '#777';

    let ctx = document.getElementById(id).getContext("2d");
    new Chart(ctx, config)
}
