function loadXMLDoc(dname) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("get", dname, false);
    xhttp.send(null);
    return xhttp.responseXML;
}
function showData() {
    var xml = loadXMLDoc("info.xml");
    var xsl = loadXMLDoc("stylesheet.xsl");
    var xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);
    xsltProcessor.setParameter(null, "code", this.id);
    xsltProcessor.setParameter(null, "title", this.getAttribute("title"));
    var resultDocument = xsltProcessor.transformToFragment(xml, document);
    var results = document.getElementById("results");
    results.innerHTML = "";
    results.appendChild(resultDocument);
    var x = document.styleSheets[0];
    x.deleteRule(x.cssRules.length - 1);
    var computedStyle = window.getComputedStyle(this, null);
    x.insertRule("caption, th { background-color: " + computedStyle.fill.replace(')', ',' + computedStyle.opacity + ')').replace('rgb', 'rgba') + ";}", x.cssRules.length);
}

function stateColor() {
    var xml = loadXMLDoc("info.xml");
    var xsl = loadXMLDoc("populacao.xsl");
    var xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);
    var resultDocument = xsltProcessor.transformToDocument(xml);

    var ranks = resultDocument.getElementsByTagName('rank');

    var map = document.getElementById("map");
    var doc = map.getSVGDocument();

    for (var i = 0; i < ranks.length; i++) {
        var estado = doc.getElementById(ranks[i].getAttribute('id'));
        estado.style.fill = "blue";
        estado.style.opacity = parseInt(ranks[i].textContent) / parseInt(ranks[0].textContent);
    }
}

function init() {

    var map = document.getElementById("map");
    var doc = map.getSVGDocument();
    var estados = doc.getElementsByTagName("path");
    for (var i = 0; i < estados.length; i++) {
        var estado = estados[i];
        estado.onmouseover = showData;
    }
    doc.styleSheets[0].deleteRule(doc.styleSheets[0].cssRules.length - 1);
    stateColor();
}
onload = init;
