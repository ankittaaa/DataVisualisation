function diagram2(){
    var daigram2 = am4core.create("diagramNo2", am4charts.ChordDiagram);

// colors of main characters
daigram2.colors.saturation = 0.45;
daigram2.colors.step = 3;
var colors = {
    Ted:daigram2.colors.next(),
    Barney:daigram2.colors.next(),
    Lily:daigram2.colors.next(),
    Robin:daigram2.colors.next(),
    Mother:daigram2.colors.next(),
    Mosby:daigram2.colors.next()
}


daigram2.data= data2;
daigram2.dataFields.fromName = "from";
daigram2.dataFields.toName = "to";
daigram2.dataFields.value = "value";


daigram2.nodePadding = 0.5;
daigram2.minNodeSize = 0.01;
daigram2.startAngle = 80;
daigram2.endAngle = daigram2.startAngle + 360;
daigram2.sortBy = "value";
daigram2.fontSize = 10;

var nodeTemp = daigram2.nodes.template;
nodeTemp.readerTitle = "Click to show/hide or drag to rearrange";
nodeTemp.showSystemTooltip = true;
nodeTemp.propertyFields.fill = "color";
nodeTemp.tooltipText = "{age}'s consume: {total}";
nodeTemp.label.fill = am4core.color("#ffffff");
nodeTemp.label.value = "[bold]{value}[/b]";

// when rolled over the node, make all the links rolled-over
nodeTemp.events.on("over", function(event) {    
    var nodeTarget = event.target;
    nodeTarget.outgoingDataItems.each(function(dataItem) {
        if(dataItem.toNode){
            dataItem.link.isHover = true;
            dataItem.toNode.label.isHover = true;
        }
    })
    nodeTarget.incomingDataItems.each(function(dataItem) {
        if(dataItem.fromNode){
            dataItem.link.isHover = true;
            dataItem.fromNode.label.isHover = true;
        }
    }) 

    nodeTarget.label.isHover = true;   
})

// when rolled out from the node, make all the links rolled-out
nodeTemp.events.on("out", function(event) {
    var nodeTarget = event.target;
    nodeTarget.outgoingDataItems.each(function(dataItem) {        
        if(dataItem.toNode){
            dataItem.link.isHover = false;                
            dataItem.toNode.label.isHover = false;
        }
    })
    nodeTarget.incomingDataItems.each(function(dataItem) {
        if(dataItem.fromNode){
            dataItem.link.isHover = false;
           dataItem.fromNode.label.isHover = false;
        }
    })

    nodeTarget.label.isHover = false;
})

var labelNode = nodeTemp.label;
labelNode.relativeRotation = 90;


labelNode.fillOpacity = 0.4;
let labelHS = labelNode.states.create("hover");
labelHS.properties.fillOpacity = 1;

nodeTemp.cursorOverStyle = am4core.MouseCursorStyle.pointer;
// this adapter makes non-main character nodes to be filled with color of the main character which he/she kissed most
nodeTemp.adapter.add("fill", function(fill, target) {
    let nodeTarget = target;
    let pointers = {};
    let diag = false;
    nodeTarget.incomingDataItems.each(function(dataItem) {
        if(colors[dataItem.toName]){
            diag = true;
        }

        if(isNaN(pointers[dataItem.fromName])){
            pointers[dataItem.fromName] = dataItem.value;
        }
        else{
            pointers[dataItem.fromName] += dataItem.value;
        }
    })
    if(diag){
        return fill;
    }

    let count = 0;
    let color;
    let largest = 0;
    let largestName;

    for(var point in pointers){
        if(pointers[point] > largest){
            largestName = point;
            largest = pointers[point]; 
        }        
    }
    if(colors[largestName]){
        fill = colors[largestName];
    }
  
    return fill;
})

// link template
var linking = daigram2.links.template;
linking.strokeOpacity = 0;
linking.fillOpacity = 0.15;
linking.tooltipText = "{value.value}";

var hoverOver = linking.states.create("hover");
hoverOver.properties.fillOpacity = 0.7;
hoverOver.properties.strokeOpacity = 0.7;

}
function drawChart(){
    am4core.useTheme(am4themes_animated);
   diagram2();
}