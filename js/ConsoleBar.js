const Bar = document.getElementById('Bar');
const button = document.getElementById('button');


function Button() {
    var data = Bar.value;
    ConsoleSupp(Bar.value+'\r');
    
    OldColor = button.style.backgroundColor;
    button.style.backgroundColor = '#292b2b';
    setTimeout(() => {
        button.style.backgroundColor = OldColor;
    }, 50);
  }

  document.getElementById('Console').addEventListener('keydown', (key)=>{
        Bar.focus();
  });
