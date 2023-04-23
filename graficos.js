function plot() {
  d3.csv('PRU2_2023-02-28_2023-02-28_86c5708524cc0d5ad4e320acc8bc09d8.ismr', function (figure) {

    var novaDiv = document.createElement("div");
    novaDiv.id = 'grafico'

    var body = document.querySelector("body");
    body.appendChild(novaDiv);


    var x = [], y = [], z = [];
    var x1 = [], y1 = [], z1 = [];
    var x2 = [], y2 = [], z2 = [];

    var cont = 0;


    for (var i = 0; i < figure.length && cont < 100; i++) {

      row = figure[i];

      if (row[' svid'] == ' 5') {

        x.push(row[' svid']);
        y.push(row['time_utc']);
        z.push(row[' s4']);

        cont++;
      }

      if (row[' svid'] == ' 7') {

        x1.push(row[' svid']);
        y1.push(row['time_utc']);
        z1.push(row[' s4']);

        cont++;
      }

      if (row[' svid'] == ' 9') {

        x2.push(row[' svid']);
        y2.push(row['time_utc']);
        z2.push(row[' s4']);

        cont++;
      }
    }
    var data = [{
      x: x,
      y: y,
      z: z,

      mode: 'markers',
      marker: {
        size: 20,
        color: [1.0, 0.5, 0.0, 1.0],
        colorscale: 'Viridis',
        colorbar: {
          title: 'Colorbar Title'
        }
      },

      type: 'surface',

    },{
      x: x1,
      y: y1,
      z: z1,

      mode: 'markers',
      marker: {
        size: 20,
        color: [1.0, 0.5, 0.0, 1.0],
        colorscale: 'Viridis',
        colorbar: {
          title: 'Colorbar Title'
        }
      },

      type: 'surface',
    },{
      x: x2,
      y: y2,
      z: z2,

      mode: 'markers',
      marker: {
        size: 20,
        color: [1.0, 0.5, 0.0, 1.0],
        colorscale: 'Viridis',
        colorbar: {
          title: 'Colorbar Title'
        }
      },

      type: 'surface',
    }];

    var layout = {

      title: 'grafico',
      showlegend: true,
      autosize: true,
      width: 600,
      height: 600,
      scene: {
        xaxis: { title: 'svid' },
        yaxis: { title: 'time_utc' },
        zaxis: { title: 's4' }
      }
    };

    Plotly.newPlot('grafico', data, layout);

  });
}

function plot4() {

  var novaDiv = document.createElement("div");
  novaDiv.id = 'grafico'

  var body = document.querySelector("body");
  body.appendChild(novaDiv);

  d3.csv('PRU2_2023-02-28_2023-02-28_86c5708524cc0d5ad4e320acc8bc09d8.ismr', function (figure) {

    var valor = document.getElementById("box").value;

    valor = valor.substring(8, 13);


    var x = [], y = [], z = [];

    var cont = 0;


    for (var i = 0; i < figure.length && cont < 100; i++) {

      row = figure[i];

      if (row[' svid'] == ' 5' || row[' svid'] == ' 7') {

        x.push(row[' svid']);
        y.push(row['time_utc']);
        z.push(row[' s4']);

        cont++;
      }


    }

    var data = [{
      x: x,
      y: y,
      z: z,

      mode: 'markers',
      marker: {
        size: 20,
        color: [1.0, 0.5, 0.0, 1.0],
        colorscale: 'Viridis',
        colorbar: {
          title: 'Colorbar Title'
        }
      },

      type: 'surface',
      showscale: false,

    }]

    var layout = {
      title: 'ISMR Querry Tool',
      autosize: true,
      width: 600,
      height: 600,
      scene: {
        xaxis: { title: 'svid' },
        yaxis: { title: 'time' },
        zaxis: { title: 's4' }
      },

    };

    Plotly.newPlot('grafico', data, layout, { renderer: 'webgl' });
  });
}

function carregar() {
  d3.csv('PRU2_2023-02-28_2023-02-28_86c5708524cc0d5ad4e320acc8bc09d8.ismr', function (figure) {

    var combo = document.getElementById("box");

    for (var i = 0; i < figure.length; i++) {

      row = figure[i];

      if (row['time_utc'].includes("00:00:00")) {

        var opt = document.createElement("option");

        opt.text = "satelite" + row[' svid'];

        combo.add(opt, combo.options[i]);

      }
    }
  });
}