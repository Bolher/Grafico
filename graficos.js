// Função para gerar o gráfico
function plot() {
  d3.csv('PRU2_2023-02-28_2023-02-28_86c5708524cc0d5ad4e320acc8bc09d8.ismr', function (error, figure) {
      if (error) {
          console.error("Erro ao carregar o CSV: ", error);
          return;
      }

      if (!figure || figure.length === 0) {
          console.error("O arquivo CSV está vazio ou não foi carregado corretamente.");
          return;
      }

      // Criar a div 'grafico' se ainda não existir
      var graficoDiv = document.getElementById('grafico');
      if (!graficoDiv) {
          graficoDiv = document.createElement("div");
          graficoDiv.id = 'grafico';
          graficoDiv.classList.add("col-lg-6", "col-sm-12");
          document.querySelector("body").appendChild(graficoDiv);
      }

      // Pegando os satélites selecionados
      const select = document.getElementById("satelites");
      var selecionados = Array.from(select.selectedOptions, option => option.value);

      console.log("Satélites selecionados:", selecionados);

      // Pegando o número de cada satélite selecionado
      var numeroSatelite1 = selecionados[0] ? selecionados[0].substring(8, 13).trim() : null;
      var numeroSatelite2 = selecionados[1] ? selecionados[1].substring(8, 13).trim() : null;
      var numeroSatelite3 = selecionados[2] ? selecionados[2].substring(8, 13).trim() : null;

      console.log("Número dos Satélites Selecionados:", numeroSatelite1, numeroSatelite2, numeroSatelite3);

      // Inicializando arrays para armazenar as coordenadas dos satélites
      var cordenadas = [
          [], [], [], // Coordenadas do satélite 1
          [], [], [], // Coordenadas do satélite 2
          [], [], []  // Coordenadas do satélite 3
      ];

      // Preenchendo os arrays com dados
      for (var i = 0; i < figure.length; i++) {
          var row = figure[i];

          // Verificando e armazenando as coordenadas do satélite 1
          if (numeroSatelite1 && row[' svid'].trim() == numeroSatelite1) {
              cordenadas[0].push(row[' svid']);
              cordenadas[1].push(row['time_utc']);
              cordenadas[2].push(row[' elev']);
          }

          // Verificando e armazenando as coordenadas do satélite 2
          if (numeroSatelite2 && row[' svid'].trim() == numeroSatelite2) {
              cordenadas[3].push(row[' svid']);
              cordenadas[4].push(row['time_utc']);
              cordenadas[5].push(row[' elev']);
          }

          // Verificando e armazenando as coordenadas do satélite 3
          if (numeroSatelite3 && row[' svid'].trim() == numeroSatelite3) {
              cordenadas[6].push(row[' svid']);
              cordenadas[7].push(row['time_utc']);
              cordenadas[8].push(row[' elev']);
          }
      }

      console.log("Cordenadas:", cordenadas);

      // Validação: se não houver dados suficientes para plotar, exibe uma mensagem de erro
      if (cordenadas[0].length === 0 && cordenadas[3].length === 0 && cordenadas[6].length === 0) {
          console.error("Nenhum dado válido foi encontrado para os satélites selecionados.");
          return;
      }

      // Gerar o gráfico (apenas se houver dados válidos)
      var data = [];

      if (cordenadas[0].length > 0) {
          data.push({
              x: cordenadas[0],
              y: cordenadas[1],
              z: cordenadas[2],
              mode: 'markers',
              type: 'surface',
              marker: {
                  size: 20,
                  colorscale: 'Viridis'
              }
          });
      }

      if (cordenadas[3].length > 0) {
          data.push({
              x: cordenadas[3],
              y: cordenadas[4],
              z: cordenadas[5],
              mode: 'markers',
              type: 'surface',
              marker: {
                  size: 20,
                  colorscale: 'Viridis'
              }
          });
      }

      if (cordenadas[6].length > 0) {
          data.push({
              x: cordenadas[6],
              y: cordenadas[7],
              z: cordenadas[8],
              mode: 'markers',
              type: 'surface',
              marker: {
                  size: 20,
                  colorscale: 'Viridis'
              }
          });
      }

      var layout = {
          title: 'Gráfico',
          autosize: true,
          width: 600,
          height: 600,
          scene: {
              xaxis: { title: 'Svid' },
              yaxis: { title: 'Time_utc' },
              zaxis: { title: 'Atributo' }
          }
      };

      // Se houver dados, gera o gráfico
      if (data.length > 0) {
          Plotly.newPlot('grafico', data, layout);
      } else {
          console.error("Nenhum dado foi gerado para plotar o gráfico.");
      }
  });
}




// Função para carregar o <select> com os satélites
function carregar() {
  d3.csv('PRU2_2023-02-28_2023-02-28_86c5708524cc0d5ad4e320acc8bc09d8.ismr', function (error, figure) {
      if (error) {
          console.error("Erro ao carregar o CSV: ", error);
          return;
      }

      var combo = document.getElementById("satelites");
      var svids = {};

      for (var i = 0; i < figure.length; i++) {
          var row = figure[i];
          var svid = row[' svid'];
          if (!svids[svid]) {
              svids[svid] = true;
          }
      }

      var sortedSvids = Object.keys(svids).sort(function (a, b) {
          return a - b;
      });

      for (var i = 0; i < 20 && i < sortedSvids.length; i++) {
          var svid = sortedSvids[i];
          var opt = document.createElement("option");
          opt.text = "satelite" + svid;
          combo.add(opt);
      }
  });
}
