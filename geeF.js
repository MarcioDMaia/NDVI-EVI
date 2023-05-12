var roi = roi_2;
var eviExpression = "2.5*(NIR-RED)/(NIR+6*RED-7.5*BLUE+1)"; // Expressão EVI

var lsCol = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
    .filterDate('2021-05-01', '2022-05-01')
    .filterBounds(roi)
    ;



var lsCol2 = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
.filterDate('2018-05-01', '2022-05-01')
.filterBounds(roi)
;
    

var ndviEviCollection = lsCol.map(function(image) { // Função que adiciona duas bandas a cada imagem da coleção
    // 1° banda: NDVI 2° banda: EVI
      var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');//Adiciona a banda NDVI a cada imagem;
      var evi = image.expression(
        eviExpression, {
          'NIR': image.select('B5'),
          'RED': image.select('B4'),
          'BLUE': image.select('B2')
        }).rename('EVI');
      return image.addBands(ndvi).addBands(evi);
    });
    
var ndviEviCollection2 = lsCol2.map(function(image) { // Função que adiciona duas bandas a cada imagem da coleção
    // 1° banda: NDVI 2° banda: EVI
        var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');//Adiciona a banda NDVI a cada imagem;
        var evi = image.expression(
        eviExpression, {
            'NIR': image.select('B5'),
            'RED': image.select('B4'),
            'BLUE': image.select('B2')
        }).rename('EVI');
        return image.addBands(ndvi).addBands(evi);
    });
    
var chart = ui.Chart.image.series({
    imageCollection: ndviEviCollection.select(['NDVI', 'EVI']),
    region: roi,
    reducer: ee.Reducer.mean(),
    scale: 30,
    xProperty: 'system:time_start'
    });
    chart.style().set({
    position: "bottom-right",
    width: '500px',
    height: '300px'
    });
    chart.setOptions({
    title: 'NDVI e EVI entre 2021 - 2022',
    vAxis:{
      title: "NDVI - EVI média do roi"
    },
    hAxis :{
      title: "Meses do ano"
    }
    });


var chart2 = ui.Chart.image.series({
    imageCollection: ndviEviCollection2.select(['NDVI', 'EVI']),
    region: roi,
    reducer: ee.Reducer.mean(),
    scale: 30,
    xProperty: 'system:time_start'
    });
    chart2.style().set({
    position: "bottom-left",
    width: '500px',
    height: '300px'
    });
    chart2.setOptions({
    title: 'NDVI e EVI entre 2018 - 2022',
    vAxis:{
      title: "NDVI - EVI média do roi"
    },
    hAxis :{
      title: "Anos e meses"
    }
    
    });


var evi = ndviEviCollection.first().select('EVI'); // Salva os dados EVI da primeira imagem da coleção
var nd = ndviEviCollection.first().select("NDVI"); // Salva os dados NDVI da primeira imagem da coleção
Map.add(chart); // Adiciona o grafico no mapa
Map.add(chart2); // Adiciona o grafico no mapa


Map.addLayer(evi, {min: -1, max: 1, palette: ['red', 'yellow', 'green']}, 'EVI'); // Adiciona a opção de ver a primeira imagem da coleção com o filtro EVI
Map.addLayer(nd, {min: -1, max: 1, palette: ['red', 'yellow', 'green']}, 'NDVI'); // Adiciona a opção de ver a primeira imagem da coleção com o filtro NDVI
Map.centerObject(roi, 10);

