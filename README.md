This is official project page created by developer (me) dedicated to ZenAir Android application - tool for make connect to MCU's via local Wi-Fi, Bluetooth and MQTT. It's completely free and has no ads.

The application provides a user interface editor with in-app «Terminals» to make it more comfy and flexible for using MCU in real practice.
There is 2 view Terminal types: CLASSIC and GRID (since 1.936)

App in Google Play: https://play.google.com/store/apps/details?id=com.gang_tracker.arduinowifi

## Interaction functions
All instructions below pertain to the current version at the time of writing: 2.000

<details>
<summary>LOCATOR (finding zen-devices and import terminals from MCU)</summary>

1. Make Base64 import terminal text and insert it into sketch as `const char*` like:
```c
const PROGMEM char* zen_terminal = "[H4sIAAAAAAAAAJ2SW3OqMBDHPwtQZ6y0DHeRF1rl4KFK66UqoyfOcBUEpWJVhOF89qqZPoYHM5tMkt1f_tlNFgWuxzG0WNcvdpngMs5QLU7En3C4cXVfY64BF6eV4uUTAmRplqcY9mJIOkHTDApy9hUQ1RT-3wYU7R7vkHQr7skKAvXbaWSiVVVCUus7rupXMGilCE1xyNcboyEBLVVRShEJOXFFAVtIzA4q8kI-9qECQuflOPf8Za8iLyS0ukNJRTM8snzfaMiy52eJho3tyGRehh7vzf8daJpznrMNgbmLU4mt14NFaqd__WTuvhFye5IS54m8oGdvfh20zfxL1NJs1p0EjZe-9DEWa_CA4S4_9CwzVDS4Trv9cS25zllRYxnLrrc_V72bzwOdI1NvOGF7Z-yNMYyJ7deXsCmZy2kYOGYNs0azW7BLWF1FOILBntACyLvwFPL1-2HKtYoTmAUkdipYySChuLe1-dZ0o_WNkjt091Agg-xyk5ES1tllBVzPt9pj5g2VJBoRpl-Myj-DNKonz4_Wg5BvAGCO-lkFmEAtKeW98FSl1Ws3He8zs4VyFXdAL-HrwclQP6zlwt_WdoTawACIZGOiDDUGSr9HX7pvuhU_McdL8AOaXe2szgUAAA==]";

```
I also use `PROGMEM` in ESP8266

2. Then you should to add next special logic:
```c
#define ZEN_GET_GUI_COMMAND "zen_get_gui"
#define ZEN_GET_GUI_COMMAND_RESPONCE "zen_set_gui:"
#define ZEN_SEARCH_COMMAND "zen_search_message"
#define ZEN_SEARCH_COMMAND_RESPONCE "zen_OK"

if (strcmp(c, ZEN_SEARCH_COMMAND) == 0) {
  client.println(ZEN_SEARCH_COMMAND_RESPONCE);
  continue;
} else if (strcmp(c, ZEN_GET_GUI_COMMAND) == 0) {
  client.print(ZEN_GET_GUI_COMMAND_RESPONCE);
  client.println(zen_terminal);
  continue;
}
```
I use `continue` to skip the current pass of the loop inside the `while (client.connected())` statement. This ensures that no more data will be sent to the Locator during the search process.
<details>
<summary>Full code of Wi-Fi message handling</summary>

```c
// ###################### COMMON CONFIGURATION & CONSTANTS
#define ROOT_SIZE 120
#define READ_BYTES_TERMINATOR ';'
// ######################

void atClient() {
  while (client.connected()) {
    if (client.available()) {
      char c[(ROOT_SIZE)] = "";
      const uint8_t amount = client.readBytesUntil(READ_BYTES_TERMINATOR, c, (ROOT_SIZE));

      if (strcmp(c, ZEN_SEARCH_COMMAND) == 0) {
        client.println(ZEN_SEARCH_COMMAND_RESPONCE);
        continue;
      } else if (strcmp(c, ZEN_GET_GUI_COMMAND) == 0) {
        client.print(ZEN_GET_GUI_COMMAND_RESPONCE);
        client.println(zen_terminal);
        continue;
      }

      // ...
    }
  }
}
```
Where `client` is `WiFiClient client;` from `#include <ESP8266WiFi.h>`
</details>

3. Upload your modified sketch to your device
4. Open the main menu (top-left corner) and click the Locator's «Search Device» button to start the search process.
5. Wait for the Locator to find your device. You can monitor the process by checking the IPs in the Locator Log, accessible via the left icon.
- By default, the Locator searches within the IP range `192.168.0.0` to `192.168.3.0`.
- To modify the search range, go to the settings menu by clicking the gear icon on the right.
6. When a terminal is received from the device, you must manually add it unless you are in Log window. In Log the terminal will be added or replaced automatically, provided the corresponding setting is enabled

During the search process, the Locator sends a `zen_search_message` to your device, adds the device to the whitelist, and continues the search. At the end of the process, it checks the whitelist by sending a `zen_get_gui` message.

</details>
 
<details>
<summary>GRID</summary>
  
The main way to control the environment from MCU is `zenItem` default commands, here is help table below.
You can also use the commands without an MCU by hand. To do this, enable the «Send messages directly to the internal commands handler» option on the sender item's settings.
```
Non-mqtt commands handling:

		Works with all items

	zenItem index 	setColor 	uint32_t(color)		Set background color for item
	zenItem index 	setColor				Clear background color for item by default color
	zenItem 	setColor 	uint32_t(color)		Set background color for all items
	zenItem 	setColor 				Clear background color for all items by default color
		
		Works with all items

	zenItem index 	setTitle 	your text		Set title text
	zenItem index 	setTitle 				Clear title text
	zenItem 	setTitle 	your text		Set title text for all
	zenItem 	setTitle 				Clear title text for all
	
		Works with: StateItem

	zenItem index	setText 	your text		Set text to extra field for StateItem
	zenItem index	setText 				Clear text in extra field for StateItem
	zenItem 	setText 	your text		Set text to extra field for all StateItems
	zenItem 	setText 				Clear text in extra field for all StateItems
		
		Works with: StateItem & ButtonItem & TextLogItem & SliderItem
		* «-» char to ignore param on icon_code place: «zenItem 0 setIcon - 4279522515»

	zenItem index 	setIcon 	uint32_t(icon_code)			Set icon to item
	zenItem index 	setIcon 	uint32_t(icon_code) uint32_t(color) 	Set colorized icon to item
	zenItem index 	setIcon 	-* 		    uint32_t(color) 	Set color to icon
	zenItem index 	setIcon 	-* 					Clear icon color
	zenItem index 	setIcon 						Clear icon & color for item
	zenItem       	setIcon 	uint32_t(icon_code)			Set icon for all items
	zenItem       	setIcon 	uint32_t(icon_code) uint32_t(color)	Set colorized icon for all items
	zenItem       	setIcon 	-* 		    uint32_t(color)	Set color to icon for all items
	zenItem       	setIcon 	-* 					Clear icon color for all items
	zenItem       	setIcon 						Clear icon & color for all items
	
	Example:
		zenItem 0 setTitle hello title
		element of zero index will gives new title: "hello title"
	
MQTT commands handling:
	StateItem:
		Message-to-color (state commands in settings)
		Works with only one element per command (individually - against processing logic of non-mqtt connection)
		Any messages that cannot be processed as color-command will be identified as extra text to insert to the item
	TextLogItem:
		Any message will added to log (except success handled main zenItem commands with «Don't display accepted commands» setting)
	ButtonItem:
		isn't subscriber
	TextFieldItem:
		isn't subscriber
	SliderItem:
		isn't subscriber
```
<video src="res/zenItemCommandsHandleDemo.mp4" width=250 />
</details>


<details>
<summary>CLASSIC</summary>

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
  #define ARGB_TO_UINT32(a, r, g, b) (((uint32_t)(a) << 24) | ((uint32_t)(r) << 16) | ((uint32_t)(g) << 8) | (uint32_t)(b))
  const uint8_t buttonCount = 4;
  static uint32_t time = 0;
  static uint8_t buttonIndex = 0;
  static uint8_t a = 255, r = 64, g = 128, b = 255;

  if (millis() - time > 50) {
    time = millis();
    if (++buttonIndex > buttonCount-1) buttonIndex = 0;
    uint32_t color = ARGB_TO_UINT32(a, r++, g++, b++);
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
</details>

## Notes

- The implementation of a serial port reader may not work very well. On my test stand with Android 5.0 (Lollipop, API 21) data reception from debugger board based on CH32V305F8P6 controller was unstable.
- The specified history size in the History screen represents the memory used by compressed GZIP data stored in Base85 encoding
- All changes to settings related to connections take effect with a new connection. Reconnect if the connection was open at the time of configuration change
- History does not occupy RAM, except for temporary buffer data waiting to be written to memory
- Memory writes occur when transitioning from the main screen and when minimizing the application (stop event)
- The Ignore List does not through specified tags (messages) to the console and history data arrays, but these messages still passed to the command handler
- The Data Matrix scanner recognizes only application-native images. Do not attempt to scan real (live) barcode photos or images containing other elements besides the barcode
  - Text and drawings below and to the right of the barcode’s black border can be anything. The main point is not to remove the border and to keep the code in the upper left corner
- The Data Matrix library may struggle with terminals larger than 2-3 kilobytes.

## Changelogs

<details>
<summary>1.958 -> 2.000 (2025.07.XX)</summary>

Thank you for using my app. If you like it, I will be very glad to receive your review on Google Play!

This update marks a transition to a new version, featuring new functionality as well as a number of important improvements and fixes.

Features:
- Added a new connection type: USB Serial.
- Added a new element to the Grid Terminal: Slider.

Improvements:
- Added an option to disable network status tracking in the settings.
- Improved the behavior of the terminal auto-reconnect, with an added option to cancel.
- Terminals that have lost connection are now marked with a dim green indicator.
- The import window now displays the size of the terminal being copied.
- Added a pop-up notification for internet connection loss.

Fixes:
- Fixed an issue of Classic terminal settings, due to which changes made inside tabs were reset upon closing and reopening.
- Fixed a bug where the connection might not close after a single click on the scroll element.
- Fixed: The joystick indicator did not return to its central position after interaction ended.
- Fixed: When using a slider send delay, the last sent value could be incorrect.
  
</details>
<details>
<summary>1.936 → 1.958 (2025.02.11)</summary>

Features:
- Added the ability to set a custom background image for the Terminal
- MQTT elements in the Grid Terminal can now locally disable the global topic
- Buttons now support an "on release" command

Fixes:
- Fixed a crash when entering settings after creating a Bluetooth Terminal
- Fixed a crash caused by an receiving invalid setColor command in the CLASSIC Terminal (e.g., setColor 0)
- Fixed an issue where the last line was duplicated in the history
- Fixed a bug where the slider sent technical information to the console when the "Don't display Repeatable sends" setting was enabled.
  
</details>
<details>
<summary>1.817a → 1.936 (2024.12.13)</summary>

Thank you to everyone who continues to use my app! In turn, I'm introducing a new version

It's become pretty clear to me that the classic terminal view can't fully satisfy all the needs of IoT devices - it's too inflexible, so I started development. After several months of continuous work, I'm releasing an update

I want to express my gratitude again: as of 24.12.04, we have 479 active users, I really appreciate your dedication and trust in my project and I hope that my subsequent absence won't upset you. The next version will definitely be

"Removed the 'mail to developer' feature" - unfortunately, I can't afford to maintain a normal server for collecting statistics and your messages. Before this update, I used a crutch with mqtt hosting: it worked very poorly. I can't be sure that your messages are getting through. All I got was the messages "123" and "gcv". Please leave feedback on GitHub

Support for the French language has been discontinued, sorry, but 15 people is too few, especially since the quality of the translation left much to be desired

Features:
- Introduced an alpha version of the Grid terminal:
* A new type of user interface with the ability to place elements on a grid, customize their appearance (background, icons, names, content size inside)
* Advanced ability to change all element parameters via commands from microcontrollers
* Available elements: StateItem, TextLogItem, ButtonItem, TextFieldItem
* Planned: Slider, Switch, Linear Chart, Joystick and others

- Added a function to scan the local network for your devices and get the terminal embedded in the device - now you can put the terminal in the controller's memory and retrieve it during the search process. You can find an example on Githab.
- Added autosave
- Added the ability to automatically connect when the application starts

Improvements:
- Saving the scroll position in the list when it is expanded
- Blocking scrolling beyond the nested list
- Added console lines highlighting for more contrast and a numeric score of line on the side
- Added ARGB values (0-255) and white shadow on background for greater contrast to the HSV circle
- Added global button size modifier for classic terminal
- Description text in settings is now highlighted, all pictures have been removed
- Changed last button pressed to softer blue

Fixes:
- Fixed: the settings for the unclickability of the button in the classic terminal were not copied or exported
- On the main settings screen, changes made in the terminals were not saved before restarting
- Fixed export issues: changes made before export are now also saved
- Fixed a bug with the remaining red text when an import attempt failed, even when a simple warning was displayed that should have been yellow
- The timecode was not displayed in the console when the "Don't show repeatable messages" setting was active
- Fixed the display of the time zone for new exported terminals
- Fixed the indent after the button array

Performance:
- Improved codebase
- Reduced text volume of exporting terminal by ~17% by eliminating default values

Other Changes:
- Added a link to GitHub in the main menu
- Removed the "mail to developer" function
- Increased the maximum size of an imported terminal, considered potentially dangerous, to 5120 bytes
- Increased limits of buttons (30 -> 60) and sliders (9 -> 16) for the classic terminal

</details>

▷ 1.817 → 1.817a (2024.10.02)
- Minor improvement of the primary image processing algorithm before of main scanning for Data Matrix code is run. Now, instead of pure white, the first column of pixels (of the y coordinate) can be any color except black (reserved as the end of the barcode: blackeness of 15%). Despite this, it is still recommended not to deviate from the black-and-white paradigm, this improvement makes it possible to read jpeg modified images, where white and black can be impure (imperfect).
- Buttons colorization by ARGB command works now
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
