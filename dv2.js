
function diagram3(){
    var daigram3 = am4core.create("diagramNo3", am4charts.RadarChart);
daigram3.scrollbarX = new am4core.Scrollbar();
daigram3.scrollbarX.background.fill = am4core.color("#FFFFFF");

daigram3.scrollbarX.background.fillOpacity = 0.2;
daigram3.data = datas;
daigram3.radius = am4core.percent(105);
daigram3.innerRadius = am4core.percent(58);

// function call(){
// 	for(int i=0;i<10;i++)
// 		daigram3.scrollbarX.parent = chart.bottomAxesContainer;
// }
// Create axes
var catAxes = daigram3.xAxes.push(new am4charts.CategoryAxis());
catAxes.dataFields.fill = am4core.color("#FFFFFF");
catAxes.dataFields.category = "category";
//catAxes.dataFields.value.fill = am4core.color("#ffffff");
catAxes.renderer.grid.template.location = 0;
catAxes.renderer.minGridDistance = 30;
catAxes.tooltip.disabled = true;
catAxes.renderer.minHeight = 110;
catAxes.renderer.grid.template.disabled = true;
let labelsTemp = catAxes.renderer.labels.template;
labelsTemp.radius = am4core.percent(-60);
labelsTemp.location = 0.5;
labelsTemp.relativeRotation = 90;

var valueAx = daigram3.yAxes.push(new am4charts.ValueAxis());
valueAx.renderer.grid.template.disabled = true;
valueAx.renderer.labels.template.disabled = true;
valueAx.tooltip.disabled = true;

// Create series
var Radars = daigram3.series.push(new am4charts.RadarColumnSeries());
Radars.sequencedInterpolation = true;
//Radars.dataFields.categoryX.fill = am4core.color("#ffffff");
Radars.dataFields.valueY = "value";
Radars.dataFields.categoryX = "category";
//Radars.dataFields.categoryX.fill = am4core.color("#ffffff");
Radars.columns.template.strokeWidth = 0;
Radars.tooltipText = "{valueY}";
//Radars.tooltipText.fill = am4core.color("#ffffff");
//Radars.tooltipText.color = "#FFFFFF"
Radars.columns.template.radarColumn.cornerRadius = 10;
Radars.columns.template.radarColumn.innerCornerRadius = 0;

Radars.tooltip.pointerOrientation = "vertical";

// on hover, make corner radiuses bigger
let hoverstate = Radars.columns.template.radarColumn.states.create("hover");
hoverstate.properties.cornerRadius = 0;
hoverstate.properties.fillOpacity = 1;


Radars.columns.template.adapter.add("fill", function(fill, target) {
  return daigram3.colors.getIndex(target.dataItem.index);
})

// Cursor
daigram3.cursor = new am4charts.RadarCursor();
daigram3.cursor.innerRadius = am4core.percent(50);
daigram3.cursor.lineY.disabled = true;
}

function againdraw(){
      am4core.useTheme(am4themes_animated);
   diagram3();
}
