<!DOCTYPE html>
<html>
	
  <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    
  <script src="js/ToSlave_LED.js"></script>
 
  <meta charset="utf-8" name="viewport">
  <link rel="stylesheet" type="text/css" href="css/base.css">
  <link rel="stylesheet" type="text/css" href="css/darktheme.css" id="theme-link">

  <head>
    <title>Maximum of control</title>
  </head>

  <body>
    <div class="wrapper">
      <div class="theme-button" id="theme-button">Change theme</div>
      <header class="header">
        <div class="header-content">
          <nav class="nav-content">
            <a href="/" class="nav-item nav-item_active">Home</a>
            <a href="subpage.html" class="nav-item">Oh, are you from England?</a>
          </nav>
        </div>
      </header>
   </div>

    <br>

    <div>
      <input class="button" id="button" type="submit" value="Submit" onClick='Button()'></input>
      <input class="Bar" id="Bar" type="search" placeholder="Enter" onsearch='Button()'></input>

      <span class="button" id="ConsoleDataNum" onClick='ResetConsoleDataNum()'>---</span>
      <span class="ConsoleData" id="ConsoleLastData">---</span>
      <span class="ConsoleData" id="ConsoleRate">---</span>
      <span class="ConsoleData" id="FPS">---</span>
    </div>

    <script>  
    /*
      function show() {  
          $.ajax({  
            url: "transfer/ledstate.php",
            cache: false,  
            success: function(html){  
                $("#content-3").html(html); 
            }
          });
      }
      
      $(document).ready(function(){  
          show();
          setInterval('show()', 999999);  
      }); 
      

      function AjaxFormRequest(result_id,led,url) {
        jQuery.ajax({
          url:      url,
          type:     "POST",
          dataType: "html",
          data: jQuery("#"+led).serialize(),
        });
      }

      */
    </script>  

    
    <textarea class="area" id="Console" placeholder="---" readonly onmousemove="XY()" onmouseout="XY()"></textarea>
    <textarea class="area" id="Console2" placeholder="---" readonly></textarea>
    
    <script src="js/ConsoleBar.js"></script>

    <script type="text/javascript">
      const Console = document.getElementById('Console');
	    
      var OldWid = 0; 
      var OldHei = 0;
      function XY() {
        Hei = Console.offsetHeight;
        Wid = Console.offsetWidth;

        const ConsoleDataNum = document.getElementById('ConsoleDataNum');
        const ConsoleLastData = document.getElementById('ConsoleLastData');
        const ConsoleRate = document.getElementById('ConsoleRate');
        const FPS = document.getElementById('FPS');
        const Bar = document.getElementById('Bar');
        const button = document.getElementById('button');

        const Console2 = document.getElementById('Console2');
        
        if (OldWid != Wid || OldHei != Hei) {
          ConsoleDataNum.style.left = (Wid-38)+'px';
          ConsoleLastData.style.left = (Wid-38)+'px';
          ConsoleRate.style.left = (Wid-95)+'px';
          FPS.style.left = (Wid-95)+'px';
          Bar.style.width = (Wid-100)+'px';
          button.style.left = (Wid-80)+'px';

          Console2.style.height = (Hei-8)+'px';
          Console2.style.width = (Wid/1.5)+'px';
        }
        OldWid = Wid; OldHei = Hei;
      }


      document.getElementById('ConsoleDataNum').addEventListener('oninput', (done) => {
        done = document.getElementById('ConsoleDataNum').getAttribute('value');
        console.log(done);
      });

    </script>
    
    
    <script type="text/javascript">
      var mass = [];
      var MassScore = 0;
      var Revers = 0;
      
      const ConsolHistory = 300;
      
      /*
      var socket = io.connect();
      socket.on('FromArduino', (arg) => {
        mass[MassScore] = arg;
        ConsoleSupp();
      });
      */
	    
      function ResetConsoleDataNum() {
        mass = [];
        MassScore = 0;
        Revers = 0;
        ConsoleSupp();
      }
      function ConsoleSupp(str) {
        if (str != undefined) mass[MassScore] = str;
        if (MassScore >= ConsolHistory) {
            mass[(Revers)] = [];
            if (MassScore >= Revers) mass[(Revers+1)] = [];
            Revers++;
          }
          MassScore++;
          Console.scrollTop = Console.scrollHeight;
          Console.innerHTML = mass;

          document.getElementById('ConsoleLastData').innerHTML = (MassScore-Revers);
          document.getElementById('ConsoleDataNum').innerHTML = MassScore;
      }
      var old = 0; 
      var c = 0;
      var Now = [];
      var Sum = 0;
      var Divider = 0;

      const MinRate = 200;
      const MaxRate = 2000;
      const SumCells = 10;
      
      var Period = 1;
      //socket.emit('SettingsReq', 'ConsoleData FPS: ');

      setTimeout(function Speed() {
        c++; if (c > SumCells) c = 1;
        Now[c] = MassScore - old;
        
        var b = 0;
        for (var a = 1; a <= Period;a++) {
          if (Now[a] == undefined) break;
          if (Now[a] == 0) b++;
          Sum += Now[a];
        }
        //console.log(Now);
        (b != SumCells) ? Sum = Sum/(SumCells) : Sum = 0;

        var OldDivider = Divider;
        Divider = (Period/MinRate)/(500/MinRate);
        var ConsoleRate = Sum / ((Divider+OldDivider)/2);

        old = MassScore;
        Period = parseFloat(Period);
        if (ConsoleRate > 0 && Period >= MinRate) {
          Period = Period/(1+((Period/MinRate)-1)/(Period/MinRate));
        } else if (Period < MaxRate) {
          Period = Period*(1+(((Period/MaxRate)-1)/((Period/MaxRate)-(Period/MinRate))));
        }
        setTimeout(Speed, Period);

        if (Period.toFixed(0) != 2000) {
          document.getElementById('ConsoleRate').innerHTML = ConsoleRate.toFixed(2);
          document.getElementById('FPS').innerHTML = Period.toFixed(0)+'ms';
        }
      }, );
    </script>

    <br></br>
    <input type="range" class="slider" id= "inputSlider" value="0" min="0" max="255" step="3" oninput="analyze(this.value)"> </input>
    <br></br>
    <span>Brightness of «LED_BUILTIN» is: </span>
    <span id="outputText">--</span>
    <span id="SlidersXY">--</span>


    <script type="text/javascript">

      var Scroll = 0;
      var DetlaSum = 0;
      const inputSlider = document.getElementById('inputSlider');
      const outputText = document.getElementById('outputText');

      function analyze(NewValue) {
        if (NewValue != undefined) {Scroll = parseInt(NewValue); DetlaSum = 0} else {Scroll += DetlaSum}
        DetlaSum = 0;
        if (Scroll < 0) { Scroll = 0 } else if (Scroll > 255) { Scroll = 255 }

        outputText.innerHTML = Scroll;
        inputSlider.value = Scroll;
        ToSlave_LED(Scroll);
      }
      var isDigit = function(a) {
        return /\d/.test(a);
      }
      
      var StepScroll = 10;
	    
      inputSlider.addEventListener('wheel', (e)=>{
        var Detla = e.deltaY;
        Detla = StepScroll*(Detla/100);
        Detla = parseInt(Detla);

        document.getElementById('SlidersXY').innerHTML = (DetlaSum + Detla);
        DetlaSum = document.getElementById('SlidersXY').innerHTML;
        DetlaSum = parseInt(DetlaSum);
        analyze();
      }, {passive: true});
    </script>	
  </body>
</html>
