const Bar = document.getElementById('Bar');
const button = document.getElementById('button');


function Button() {
    //console.log(document.getElementById('Console').scrollTop);
    var data = Bar.value;
    ConsoleSupp(Bar.value+'\r');
    //if (isDigit(data[0]) && isDigit(data[1]) || isDigit(data[0]) && data[1] == undefined) {
    //    outputText.innerHTML = data;
    //    inputSlider.value = data;
    //    Scroll = parseInt(data);
    //}
    
    if (data[0] != undefined) ToArduino(data);
    
    OldColor = button.style.backgroundColor;
    button.style.backgroundColor = '#292b2b';
    setTimeout(() => {
        button.style.backgroundColor = OldColor;
    }, 30);


    let DATA = [];
    DATA[0] = data;
    ToSettingsFile(DATA); // record data to settings file
    SettingsSupp(DATA); // 'activates' this new data

  }

  document.getElementById('Console').addEventListener('keydown', (key)=>{
        //console.log(key.keyCode);
        Bar.focus();
  });
