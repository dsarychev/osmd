function handleFileSelect(evt) {
    var maxOSMDDisplays = 10; 
    var files = evt.target.files; 
    var osmdDisplays = Math.min(files.length, maxOSMDDisplays);
    var transpose;
    var transposeBtn;

    var output = [];
    for (var i=0, file = files[i]; i<osmdDisplays; i++) {
      output.push("<li><strong>", escape(file.name), "</strong> </li>");
      output.push("<div id='osmdCanvas" + i + "'/>");
    }
    document.getElementById("list").innerHTML = "<ul>" + output.join("") + "</ul>";

    for (var i=0, file = files[i]; i < osmdDisplays; i++) {
      if (!file.name.match('.*\.xml') && !file.name.match('.*\.musicxml') && false) {
        alert('You selected a non-xml file. Please select only music xml files.');
        continue;
      }

      var reader = new FileReader();

      reader.onload = function(e) {
          var osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmdCanvas", {
            // set options here
            backend: "svg",
            drawFromMeasureNumber: 1,
            drawUpToMeasureNumber: Number.MAX_SAFE_INTEGER 
          });
          osmd
            .load(e.target.result)
            .then(
              function() {
                window.osmd = osmd;                 osmd.render();
              }
            );
      };
      if (file.name.match('.*\.mxl')) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsText(file);
      }
    }
  }

document.getElementById("files").addEventListener("change", handleFileSelect, false);
transposeBtn = document.getElementById('transpose-btn');
if(transposeBtn && transpose){

  transposeBtn.onclick = function(){
    transpose = document.getElementById('transpose');  
    osmd.TransposeCalculator = new opensheetmusicdisplay.TransposeCalculator(); 
      var transposeValue = parseInt(transpose.value);
      osmd.Sheet.Transpose=transposeValue;
      osmd.updateGraphic();
      osmd.render();
  }
} 
