//função para gerar o grafico
function plot() {
  d3.csv('PRU2_2023-02-28_2023-02-28_86c5708524cc0d5ad4e320acc8bc09d8.ismr', function (figure) {

    //criando e colocando id na div onde o grafico vai ser gerado
    var novaDiv = document.createElement("div");
    novaDiv.id = 'grafico'
    novaDiv.classList.add("col-lg-6")
    novaDiv.classList.add("col-sm-12")

    var body = document.querySelector("body");
    body.appendChild(novaDiv);

    //pegando o valor do atributo em que vai ser realizado o plot
    var atributo = document.getElementById("atributo")
    atributo = atributo.options[atributo.selectedIndex].value
    atributo = " " + atributo

    //uma lista de lista, e cada lista represneta as cordenadas de um satelite sendo possivel no maximo 3 satelites, cada lista representa a cordenada x, y e z do plano carteziano
    var cordenadas= [x=[], y=[], z=[],
                     x1=[], y1=[], z1=[],
                     x2=[], y2=[], z2=[]];

    //pegando os valroes do <select> e gardando em uma array
    const select = document.getElementById("satelites");
    var selecionados = Array.from(select.selectedOptions, option => option.value);

    //pegando o numero de cada satelite que foi escolhindo, sendo usando a substring para pegar apenas o numero do satelite
    var satelite1 = selecionados[0];
    if (satelite1 != null) {
      var numeroSatelite1 = satelite1.substring(8, 13);
    }
    var satelite2 = selecionados[1];
    if (satelite2 != null) {
      var numeroSatelite2 = satelite2.substring(8, 13);
    }
    var satelite3 = selecionados[2];
    if (satelite3 != null) {
      var numeroSatelite3 = satelite3.substring(8, 13);
    }

    for (var i = 0; i < figure.length; i++) {

      row = figure[i];

      // vendo se foi selecionado o primeiro satelite caso tenha sido ele pela os valores das colunas do csv(' svid', 'time_utc', ' s4')
      // o coloca nos vetores do satelite1
      if (numeroSatelite1 != null) {

        if (row[' svid'] == numeroSatelite1) {

          cordenadas[0].push(row[' svid']);
          cordenadas[1].push(row['time_utc']);
          cordenadas[2].push(row[atributo]);

        }
      }
      // vendo se foi selecionado um segundo satelite caso tenha sido ele pela os valores das colunas do csv(' svid', 'time_utc', ' s4')
      // o coloca nos vetores do satelite2
      if (numeroSatelite2 != null) {

        if (row[' svid'] == numeroSatelite2) {

          cordenadas[3].push(row[' svid']);
          cordenadas[4].push(row['time_utc']);
          cordenadas[5].push(row[atributo]);

        }
      }
      // vendo se foi selecionado um terceiro satelite caso tenha sido ele pela os valores das colunas do csv(' svid', 'time_utc', ' s4')
      // o coloca nos vetores do satelite3
      if (numeroSatelite3 != null) {
        if (row[' svid'] == numeroSatelite3) {

          cordenadas[6].push(row[' svid']);
          cordenadas[7].push(row['time_utc']);
          cordenadas[8].push(row[atributo]);

        }
      }
    }

    var data = [{
      //gera o grafico com base nas informações do vetor do satelite 1
      x: cordenadas[0],
      y: cordenadas[1],
      
      z: cordenadas[2],
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
      //gera o grafico com base nas informações do satelite 3
      x: cordenadas[3],
      y: cordenadas[4],
      z: cordenadas[5],

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
      //gera o grafico com base nas informações do vetor do satelite 3
      x: cordenadas[6],
      y: cordenadas[7],
      z: cordenadas[8],

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

    //define as informações padrões do layout do grafico
    var layout = {

      title: 'grafico',
      showlegend: true,
      autosize: true,
      width: 600,
      height: 600,
      scene: {
        xaxis: { title: 'Svid' },
        yaxis: { title: 'Time_utc' },
        zaxis: { title: 'Atributo' }
      }
    };

    //executa o plot do grafico
    Plotly.newPlot('grafico', data, layout);

  });
}

//função para carregar o <select> 
function carregar() {
  d3.csv('PRU2_2023-02-28_2023-02-28_86c5708524cc0d5ad4e320acc8bc09d8.ismr', function (figure) {

    var combo = document.getElementById("satelites");
    var svids = {};

    //faz um for do tamanho do csv
    for (var i = 0; i < figure.length; i++) {

      // pega cada linha do csv e coloca na varial 'row' uma vez por cada laço
      row = figure[i];

      //pega o valor do campo ' svid' do csv e coloca na varialvel 'svid'
      var svid = row[' svid'];
      // verifica se o satelite já esta na array caso não esteja adiciona caso esteija ele não adiciona
      if (!svids[svid]) {
        svids[svid] = true;
      }
    }

    //ordena a lista dos satelites em ordem crecente
    var sortedSvids = Object.keys(svids).sort(function (a, b) {
      return a - b;
    });

    //coloca cada valor da lista ordenada no <select>
    // i< sortedSvids.length
    for (var i = 0; i < 20; i++) {
      var svid = sortedSvids[i];
      var opt = document.createElement("option");
      opt.text = "satelite" + svid;
      combo.add(opt);
    }
  });
}