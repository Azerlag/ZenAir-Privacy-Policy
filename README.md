## ZenAir for Android

The official repository for **ZenAir** — a comprehensive cross-protocol utility designed for seamless interaction with MCUs via **Wi-Fi (Local)**, **Bluetooth**, **MQTT**, and **USB Serial**. The application is distributed as a completely free, ad-free tool for developers and enthusiasts.

### Some Features

* **Dynamic UI Editor:** GRID Terminal is a highly customizable, item-based layout system that allows users to design their own control dashboards. Unlike traditional stream-based consoles, it provides a workspace for placing and configuring interactive UI elements.
* **CLASSIC Terminal:** There is also standard hard layout interaction with limited capabilities.

**Download on Google Play:** [link](https://play.google.com/store/apps/details?id=com.gang_tracker.arduinowifi)

## Interaction functions
All instructions below pertain to the current version at the time of writing: 2.447

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

if (strcmp(c, ZEN_GET_GUI_COMMAND) == 0) {
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

#define ZEN_GET_GUI_COMMAND "zen_get_gui"
#define ZEN_GET_GUI_COMMAND_RESPONCE "zen_set_gui:"
// ######################

void atClient() {
  while (client.connected()) {
    if (client.available()) {
      char c[(ROOT_SIZE)] = "";
      const uint8_t amount = client.readBytesUntil(READ_BYTES_TERMINATOR, c, (ROOT_SIZE));

      if (strcmp(c, ZEN_GET_GUI_COMMAND) == 0) {
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
<summary>LOCATOR (SSDP)</summary>

Sometimes SSDP works on Sketch, sometimes not. This is most likely due to a conflict between HTTP (ESP8266WebServer) and server (WiFiServer), you can throw `WiFiServer` away and use HTTP get or pust requests to send Terminal to App, but i haven't tested this case. Anyway, I still recommend using hardcoded IP addresses in combination with passing them via an HTTP page in station mode (STA MODE).

```c
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266SSDP.h>

// ###################### COMMON CONFIGURATION & CONSTANTS
#define STASSID "wifi_ssid"
#define STAPSK "wifi_pass"

#define ROOT_SIZE 120
#define READ_BYTES_TERMINATOR ';'

#define ZEN_GET_GUI_COMMAND "zen_get_gui"
#define ZEN_GET_GUI_COMMAND_RESPONCE "zen_set_gui:"
// ######################

const PROGMEM char* zen_terminal = "[H4sIAAAAAAAAAJ2SW3OqMBDHPwtQZ6y0DHeRF1rl4KFK66UqoyfOcBUEpWJVhOF89qqZPoYHM5tMkt1f_tlNFgWuxzG0WNcvdpngMs5QLU7En3C4cXVfY64BF6eV4uUTAmRplqcY9mJIOkHTDApy9hUQ1RT-3wYU7R7vkHQr7skKAvXbaWSiVVVCUus7rupXMGilCE1xyNcboyEBLVVRShEJOXFFAVtIzA4q8kI-9qECQuflOPf8Za8iLyS0ukNJRTM8snzfaMiy52eJho3tyGRehh7vzf8daJpznrMNgbmLU4mt14NFaqd__WTuvhFye5IS54m8oGdvfh20zfxL1NJs1p0EjZe-9DEWa_CA4S4_9CwzVDS4Trv9cS25zllRYxnLrrc_V72bzwOdI1NvOGF7Z-yNMYyJ7deXsCmZy2kYOGYNs0azW7BLWF1FOILBntACyLvwFPL1-2HKtYoTmAUkdipYySChuLe1-dZ0o_WNkjt091Agg-xyk5ES1tllBVzPt9pj5g2VJBoRpl-Myj-DNKonz4_Wg5BvAGCO-lkFmEAtKeW98FSl1Ws3He8zs4VyFXdAL-HrwclQP6zlwt_WdoTawACIZGOiDDUGSr9HX7pvuhU_McdL8AOaXe2szgUAAA==]";

const char* ssid = STASSID;
const char* password = STAPSK;

ESP8266WebServer HTTP(8080);
WiFiServer server(80);
WiFiClient client;

const char* desc_xml = "/description.xml";
const char* ssdp_name = "optional";
const char* ssdp_sn = "000000000000";  // Should be unical (e.g., "V1.0", build ID), better to be dynamic generated in runtime
const char* ssdp_model_name = "optional";
const char* ssdp_model_num = "000000000000";  // Optional, can be same as ssdp_sn
const char* ssdp_model_url = "";              // Optional (http://www.example.com)
const char* ssdp_mfr = "optional";
const char* ssdp_mfr_url = "";  // Optional, same as model_url

void atClient() {
  static float counter = 0;
  while (client.connected()) {
    if (client.available()) {
      char c[(ROOT_SIZE)] = "";
      const uint8_t amount = client.readBytesUntil(READ_BYTES_TERMINATOR, c, (ROOT_SIZE));
      Serial.printf("c:%s\n", c);

      if (strcmp(c, ZEN_GET_GUI_COMMAND) == 0) {
        client.print(ZEN_GET_GUI_COMMAND_RESPONCE);
        client.println(zen_terminal);
        continue;
      }

      // ...
    }
  }
}

void setup() {
  Serial.begin(115200);
  Serial.println();
  Serial.println("Starting WiFi...");

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && (millis() - start < 10000)) {
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.printf("WiFi connected, IP: %s\n", WiFi.localIP().toString().c_str());

    HTTP.on(desc_xml, HTTP_GET, []() {
      SSDP.schema(HTTP.client());
    });
    HTTP.begin();
    Serial.printf("HTTP ready!\n");

    server.begin();
    Serial.printf("WiFi Server ready!\n");

    Serial.printf("Starting SSDP...\n");
    SSDP.setSchemaURL(desc_xml);
    SSDP.setHTTPPort(8080);
    SSDP.setName(ssdp_name);
    SSDP.setSerialNumber(ssdp_sn);
    SSDP.setURL("/");
    SSDP.setModelName(ssdp_model_name);
    SSDP.setModelNumber(ssdp_model_num);
    SSDP.setModelURL(ssdp_model_url);
    SSDP.setManufacturer(ssdp_mfr);
    SSDP.setManufacturerURL(ssdp_mfr_url);
    SSDP.begin();
    Serial.printf("SSDP ready!\n");
  } else {
    Serial.printf("WiFi failed\n");
    while (1) { delay(100); }
  }
}

void loop() {
  client = server.available();
  if (client) atClient();

  HTTP.handleClient();
}

```

</details>

<details>
<summary>GRID</summary>
  
The main way to control the environment from MCU is `zenItem` default commands.

You can also use the commands without an MCU by hand. To do this, enable the «Send messages directly to the internal commands handler» option on the sender item's settings.

Please refer to the data table in the App itself. This section is no longer in service.

</details>

<details>
<summary>CLASSIC</summary>

#### MCU can set the button color defined in the button Settings
1) Activate in: Settings → Buttons! → Button → Enable color changing with commands
2) Set your preferred command with plain text
3) Set your preferred color by clicking to color represent box
4) Receive command from MCU
In sketch it can be:
```c
  client.println("command");
```
Where `client` is `WiFiClient client;` from `#include <ESP8266WiFi.h>`

#### MCU can set the button color directement in ARGB format
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

#### MCU can reset all current button colors to the default white with a command
1) Activate in: Settings → Buttons! → Use all button colors clear command
2) Set your preferred command with plain text
3) Receive command from MCU (see instructions above)

#### MCU can set the button text
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

## Known issues
- Selecting lines outside of the visible area for the console crashes app

## Notes
 
- The implementation of a serial port reader may not work very well. On my test stand with Android 5.0 (Lollipop, API 21) data reception from debugger board based on CH32V305F8P6 controller was unstable
- All changes to settings related to connections take effect with a new connection. Reconnect if the connection was open at the time of configuration change
- The specified history size in the History screen represents the memory used by compressed GZIP data stored in Base85 encoding
- History does not occupy RAM, except for temporary buffer data waiting to be written to memory
- Memory writes occur when transitioning from the main screen and when minimizing the application (stop event)
- The Ignore List does not through specified tags (messages) to the console and history data arrays, but these messages still passed to the command handler
- The Data Matrix scanner recognizes only application-native images. Do not attempt to scan real (live) barcode photos or images containing other elements besides the barcode
  - Text and drawings below and to the right of the barcode’s black border can be anything. The main point is not to remove the border and to keep the code in the upper left corner
- The Data Matrix library may struggle with terminals larger than 2-3 kilobytes

## Changelogs
Changelogs have been moved to the Releases section.
