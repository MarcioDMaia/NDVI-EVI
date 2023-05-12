


var GenericObjectic = function(collection, date, clound, roi, dataset_graph, vizualization){
    this.collection = collection;
    this.date = date;
    this.clound = clound;
    this.roi = roi;
    this.dataset_graph = dataset_graph
    this.vizualization = vizualization 
    this.EVI_EXPRESSION = "2.5*2*(NIR-RED)/(NIR+6*RED-7.5*BLUE+1)"; // Expressão EVI
    this.DATASET = ee.ImageCollection(this.collection).filterDate(this.date[0], this.date[1]).filterBounds(this.roi);
    this.CHART;
    this.EVI;
    this.NDVI;
};

GenericObjectic.prototype.applyScaleFactors = function(image){
    var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
    var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
    return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);    
}

GenericObjectic.prototype.uppdateDataset = function(func){
    this.DATASET.map(func) // Atualizar uma vez para a fatoração e outra para a adição dos filtros
}

GenericObjectic.prototype.ndvi_evi_filter = function(image){
    var ndvi = image.normalizedDifference(["SR_B5","SR_B4"]).rename("NDVI");
    var evi = image.expression(
        this.EVI_EXPRESSION, {
            "NIR" : image.select("SR_B5"),
            "RED" : image.select("SR_B4"),
            "BLUE" : image.select("SR_B2")
        }
    ).rename("EVI")
    return image.addBands(ndvi).addbands(evi);
}

GenericObjectic.prototype.creat_chart = function(){
    var chart = ui.Chart.image.siries({
      imageCollection : this.ndvi_evi_filter.select(["NDVI", "EVI"]),
      region : this.roi,
      reducer : ee.Reducer.mean(),
      scale : this.dataset_graph[this.dataset_graph.leght - 1],
      xProperty : "system:time_start"
    });
    this.CHART = chart    
}


GenericObjectic.prototype.style_options = function(){
    this.CHART.style().set({
        position : this.dataset_graph[0],
        width : this.dataset_graph[1],
        height : this.dataset_graph[2],
      });
      this.CHART.setOptions({
        title : this.dataset_graph[3]
      });
}

GenericObjectic.prototype.run = function(){
    this.uppdateDataset(this.applyScaleFactors)
    this.uppdateDataset(this.ndvi_evi_filter)
    this.creat_chart()
    this.style_options()
}

addL = function(object, vizualization){
    Map.add(object.CHART)
    Map.addLayer(object.EVI, vizualization, "EVI")
    Map.addLayer(object.NDVI, vizualization, "NDVI")
}


var vizu = {min: -1, max: 1, palette: ['red', 'yellow', 'green']}
var roi_1 = GenericObjectic("LANDSAT/LC09/C02/T1_L2", ['2022-10-15', '2023-10-15'], 
    "Quaisquer geometria", ["bottom-left", "500px", "300px", "NDVI - EVI LANDSAT 9", 30], vizu)

roi_1.run()
addL(roi_1)
