App in Google Play: https://play.google.com/store/apps/details?id=com.gang_tracker.arduinowifi

## Interaction functions
All instructions below pertain to the current version at the time of writing: 1.817

#### The MCU can set the button color defined in the button Settings
1) Activate in: Settings → Buttons! → Button → Enable color changing with commands
2) Set your preferred command with plain text
3) Set your preferred color by clicking to color represent box
4) Receive command from MCU
In sketch it can be:
```c
  client.println("command");
```
Where `client` is `WiFiClient client;` from `#include <ESP8266WiFi.h>`

#### The MCU can set the button color directement in ARGB format
1) Activate in: Settings → Buttons! → Button → Allow to set ARGB color by command as <command button_index uint32_t(color)>
2) Set your preferred command with plain text
3) Receive command from MCU
In sketch it can be:
```c
  #define RGB_TO_UINT32(a, r, g, b) (((uint32_t)(a) << 24) | ((uint32_t)(r) << 16) | ((uint32_t)(g) << 8) | (uint32_t)(b))
  const uint8_t buttonCount = 4;
  static uint32_t time = 0;
  static uint8_t buttonIndex = 0;
  static uint8_t a = 255, r = 64, g = 128, b = 255;

  if (millis() - time > 50) {
    time = millis();
    if (++buttonIndex > buttonCount-1) buttonIndex = 0;
    uint32_t color = RGB_TO_UINT32(a, r++, g++, b++);
    client.print("setColor ");
    client.print(buttonIndex);
    client.print(" ");
    client.println(color);
    // First output will be: "setColor 1 4282417407"
  }
```
<img src="res/setColor.gif" width="400" height="300" alt="Color set demo">

#### The MCU can reset all current button colors to the default white with a command
1) Activate in: Settings → Buttons! → Use all button colors clear command
2) Set your preferred command with plain text
3) Receive command from MCU (see instructions above)

#### The MCU can set the button text
1) Activate in: Settings → Buttons! → Button → Enable a text replacement command
2) Set your preferred command with plain text
3) Receive command from MCU
In sketch it can be:
```c
  static uint16_t i = 0;
  client.print("setTextCommand ");
  client.println(i++);
  // It makes next string: "setTextCommand 0"
```
Ensure that the format specified in the app is strictly followed, including maintaining a space between the command and the button future text: "command text"

## Notes

- Terminal initialization and variable setup occur every time the user returns to the main screen (e.g., from the settings screen)
- Terminals do not occupy RAM while they are not open
  - Consequently, upon each opening, variables are initialized. This can cause noticeable lag when loading a large terminal, depending on the device’s performance. An exception is console data, which loads with the application if the console is enabled in the settings
- The specified history size in the History screen represents the memory used by compressed GZIP data stored in Base85 encoding
- All changes to settings related to connections take effect with a new connection. Reconnect if the connection was open at the time of configuration change
- History does not occupy RAM, except for temporary buffer data waiting to be written to memory
- Memory writes occur when transitioning from the main screen and when minimizing the application (stop event)
- The Ignore List does not bypass specified tags (messages) to the console and history data arrays, but these messages are passed to the command handler
- The Data Matrix scanner recognizes only application-native images. Do not attempt to scan real (live) barcode photos or images containing other elements besides the barcode
  - Text and drawings below and to the right of the barcode’s white border can be anything. The main point is not to extend the white area further and to keep the code in the upper left corner
- The Data Matrix library may struggle with terminals larger than 2-3 kilobytes.
- Creating two or more WiFi/Bluetooth connections simultaneously is not possible (architectural flaw, will be fixed in the next version)

## Changelogs
<details>
<summary>1.769 → 1.817 (2024.08.19)</summary>

I should have released this update a long time ago, but unfortunately I noticed a significant bug with the MQTT buttons too late.

I have plans for the next version to add a real grid panel on which it will be possible to place and move elements. Add a chart at the end...

Performance:
- External data storage library has been removed, streamlining app size
- That migration has reduced required occupied by user data by ~58%

Features:
- Added a new feature to send messages directly to the developer, making it easier to report bugs or suggest features
- Introduced the ability to assign colors to buttons using the ARGB format by MCU (check out an example on GitHub)
- Added visible dashes steps on the slider body at low values

Fixes:
- MQTT buttons and sliders are now fully operational
- Button states are now saved when you exit the app
- Improved slider behavior with small values
- Fixed an issue where the slider did not send value of a single click or at release when the delay setting was enabled
- Removed the "Receiver Delay" setting as it no longer had any functional impact
- The time-based auto-clicker functionality for buttons has been removed

</details>
<details>
<summary>1.633 → 1.769 (2024.07.22)</summary>
I would like to thank everyone who continues to use my App and those who manually send crash reports via email. Thank you!
  
For more information, including other version changelogs and usage examples, you can find the GitHub link on the interface size setting screen (Settings by Default). Also if you want to receive new versions earlier, join the beta testers on the ZenAir App page on the Google Play

Performance:
- Enhanced message processing speed by eliminating memory lookups for console and history limit values
- Reduced battery consumption by migrating from Activity to Compose Navigation

Features:
- Added MQTT connection type
- Added disconnect time progress bar
- Added connection indicator on terminal top
- Added a setting to adjust console height
- Added a setting to include a timestamp in console messages
- Enabled sharing and importing terminals as images with a Data Matrix
- Including an option to insert trusted information about the terminal creator (not encrypted or centralized)
- Implemented a preliminary check of data types (IPv4, port, etc.) at terminal import, for more security
- Added a section in terminal settings for configuring individual sliders (joystick mode and other slider settings for each terminal)
- Introduced 3 new slider settings:
1) Round by x (integer) at sending
2) Set delay for slider sending in millis
3) Send only last value
- Increased the maximum number of buttons from 16 to 30
- Added 3 button-specific functions:
1) Button non-clickability
2) Functionality of the status element. Now, using commands from the controller, you can change the color of the button
3) Button text change functionality from microcontroller (on specific received commands)
- Introduced 3 general button functions:
1) Change the maximum capacity of a button row (1-10)
2) Add a reset button to revert button states
3) Use external command to reset button colors only
- Added a setting to ignore successfully processed commands
- Added a setting to merge the connect and disconnect buttons

Fixes:
- Fixed fonts in Вialog Boxes
- Fixed stack behavior
- Fixed a bug where the last terminal was not deleted
- Fixed a bug where the settings check box did not save the state of setting
- Fixed a bug where disconnections, connections and error messages were added in the disabled console
- Fixed a bug where the console cleaning button did not clear memory data
- Fixed a bug in «Settings by Default» where disabling one and enabling another did not activate the restart button

Known Issues:
- Resource limit settings for the receiver do not currently have any effect
</details>

▷ 1.632 → 1.633 (2024.05.06)
- Terminal reordering and order saving works now
<details>
<summary>1.43 → 1.632 (2024.05.04)</summary>

Performance:
- Reduced a bit RAM usage by two classes merging
- Reduced App size (for ~2MB) by implementing additional shrink configurations
- Reduced storage usage by data compression using Gzip
- Improved implementation of blacklist functionality
- History now loads asynchronously
- Made minor adjustments for better optimization in App layout structure
- The Input Stream (receiver) working is stopped now at disabled Console

Features:
- Added ability to reorder Terminals with long press
- Added Terminal Export/Import possibility (Import: Add New Terminal -> Type Page)
- Added global options to change font size of Console and of common text
- Added «clean» button for the Console
- By joystick send zero, «;» terminator and user's «You have sent:» messages now can be customized in settings
- Added setting for disable view of repeatable (multiple) messages in Console from sliders and pressable buttons
- Added setting of last pressed button showing
- Added visual scroll bar to Console and History
- Introduced Terminal duplication (Terminal Settings -> Top Right Menu)

Fixes:
- Fixed settings UI behavior at unstandart screen sizes
- Slider auto disconnection works correctly now - without sudden closure at repeatedly pressing or at multi taping
- Fixed latency of initialization a new screen caused by data saving event
- Fixed issue where only one line could be selected in History
- Fixed (maybe) Bluetooth caused crashes by adding permission check and their requests event (thanks to the users who sends crash logs by email)

Future:
- MQTT panel addition

</details>

▷ X → 1.43 (2023.08.10)
