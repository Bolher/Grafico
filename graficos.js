function plot() {
  d3.csv('PRU2_2023-02-28_2023-02-28_86c5708524cc0d5ad4e320acc8bc09d8.ismr', function (figure) {

    var novaDiv = document.createElement("div");
    novaDiv.id = 'grafico'

    var body = document.querySelector("body");
    body.appendChild(novaDiv);


    var x = [], y = [], z = [];
    var x1 = [], y1 = [], z1 = [];
    var x2 = [], y2 = [], z2 = [];

    const select = document.getElementById("box");
    var selecionados = Array.from(select.selectedOptions, option => option.value);


    var valor1 = selecionados[0];
    if (valor1 != null) {
      var teste1 = valor1.substring(8, 13);
    }
    var valor2 = selecionados[1];
    if (valor2 != null) {
      var teste2 = valor2.substring(8, 13);
    }
    var valor3 = selecionados[2];
    if (valor3 != null) {
      var teste3 = valor3.substring(8, 13);
    }

    console.log(teste1)
    console.log(teste2)
    console.log(teste3)

    for (var i = 0; i < figure.length; i++) {

      row = figure[i];

      if (teste1 != null) {

        if (row[' svid'] == teste1) {

          x.push(row[' svid']);
          y.push(row['time_utc']);
          z.push(row[' s4']);

        }
      }

      if (teste2 != null) {

        if (row[' svid'] == teste2) {

          x1.push(row[' svid']);
          y1.push(row['time_utc']);
          z1.push(row[' s4']);

        }
      }

      if (teste3 != null) {
        if (row[' svid'] == teste3) {

          x2.push(row[' svid']);
          y2.push(row['time_utc']);
          z2.push(row[' s4']);

        }
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

    }, {
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
    }, {
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

function carregar() {
  d3.csv('PRU2_2023-02-28_2023-02-28_86c5708524cc0d5ad4e320acc8bc09d8.ismr', function (figure) {

    var combo = document.getElementById("box");
    var svids = {};

    for (var i = 0; i < figure.length; i++) {

      row = figure[i];

      var svid = row[' svid'];

      if (!svids[svid]) {
        svids[svid] = true;
      }
    }

    var sortedSvids = Object.keys(svids).sort(function (a, b) {
      return a - b;
    });

    for (var i = 0; i < sortedSvids.length; i++) {
      var svid = sortedSvids[i];
      var opt = document.createElement("option");
      opt.text = "satelite" + svid;
      combo.add(opt);
    }

  });
}