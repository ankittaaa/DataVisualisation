function animateBullet(bullet) {
    var durat = 4000 * Math.random() + 3000;
    var animates = bullet.animate([{ property: "locationX", from: 0, to: 1 }], durat)
    animates.events.on("animationended", function(event) {
        animateBullet(event.target.object);
    })
}
function diagram1(){
var daigram1 = am4core.create("diagramNo1", am4charts.ChordDiagram);

daigram1.data = data;
daigram1.dataFields.fromName = "from";
daigram1.dataFields.toName = "to";
daigram1.dataFields.value = "value";
daigram1.paddingLeft = 40;
daigram1.paddingRight = 40;

// make nodes draggable
var nodeTemp = daigram1.nodes.template;
nodeTemp.readerTitle = "Drag to rearrange and click to hide/show";
nodeTemp.showSystemTooltip = true;
nodeTemp.label.fill = am4core.color("#ffffff");
nodeTemp.label.value = "[bold]{value}[/b]";

var nodeLine = daigram1.links.template;
var stars = nodeLine.bullets.push(new am4charts.CircleBullet());
stars.fillOpacity = 1;
stars.circle.radius = 5;
stars.locationX = 0.5;

// create animations
daigram1.events.on("ready", function() {
    for (var i = 0; i < daigram1.links.length; i++) {
        var lines = daigram1.links.getIndex(i);
        var stars = lines.bullets.getIndex(0);

        animateBullet(stars);
    }
})
var linking = daigram1.lines.template;
linking.strokeOpacity = 0;
linking.fillOpacity = 0.15;
linking.tooltipText = "{value.value}";

var hoverNode = linking.states.create("hover");
hoverNode.properties.fillOpacity = 0.7;
hoverNode.properties.strokeOpacity = 0.7;
}


function draw(){
      am4core.useTheme(am4themes_animated);
   diagram1();
 }
