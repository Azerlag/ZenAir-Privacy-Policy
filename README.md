## ZenAir

The official repository for **ZenAir** — a cross-protocol dashboard application designed for seamless interaction with MCUs via **Wi-Fi**, **Bluetooth**, **MQTT**, **HTTP** and **USB Serial**. Available on Android, Windows and Linux. The application is distributed as a completely free, ad-free tool for developers and enthusiasts.

- [Download Android app from Google Play](https://play.google.com/store/apps/details?id=com.gang_tracker.arduinowifi)
- [Download desktop builds and apk from GitHub Releases](https://github.com/Azerlag/ZenAir-Privacy-Policy/releases)

## Download and installation

<details>
<summary>Android</summary>

This is an universal Android build. Install it directly on your device.

- [**`ZenAir-android-3.260-170.apk`**](https://github.com/Azerlag/ZenAir-Privacy-Policy/releases/download/3.260/ZenAir-android-3.260-170.apk)

> This APK is signed with my own key rather than Google's. It is fully valid and works normally, but if you already have the Play Store version installed, there will be a signature mismatch so you'll need to uninstall the Play Store version first before installing this APK.

</details>
<details>
<summary>Linux</summary>

There are two options:

1. [**`ZenAir-linux-x64-3.260-170.jar`**](https://github.com/Azerlag/ZenAir-Privacy-Policy/releases/download/3.260/ZenAir-linux-x64-3.260-170.jar)
   Standard JAR file. Requires Java 17 or higher to be installed on your system.

2. [**`ZenAir-linux-x64-distributable-3.260-170.7z`**](https://github.com/Azerlag/ZenAir-Privacy-Policy/releases/download/3.260/ZenAir-linux-x64-distributable-3.260-170.7z)
   Portable build with an embedded JRE. No separate Java installation is required. Extract the archive and run the `./bin/ZenAir` executable.

#### Running the JAR on Arch Linux

The following examples use Arch Linux package names. For other distributions perform installation using your system package manager.

```bash
# Check which java version you have
ls /usr/lib/jvm
# Check current java
java -version
# Install OpenJDK 17 if you do not already have Java 17 or newer
sudo pacman -S jdk17-openjdk
# Make sure Java is installed
java -version
# Run
/usr/lib/jvm/java-17-openjdk/bin/java -jar "/path/to/ZenAir.jar"
# Or, if java is already in your PATH:
java -jar "/path/to/ZenAir.jar"
```
If you are using a different Java installation, replace `/usr/lib/jvm/java-17-openjdk/bin/java` with the path to your `java` executable.

#### USB access on Arch Linux

For USB device access, add your user to the `uucp` and `lock` groups:

```bash
sudo usermod -aG uucp $USER
sudo usermod -aG lock $USER
```
After that, log out and log back in, or reboot the system, for the group changes to take effect. On other Linux distributions, USB access may require different group permissions or udev rules.

#### Crash with `could not load font` error

If you encounter a font-related error at startup, install the base font packages:

```bash
sudo pacman -S fontconfig
sudo pacman -S ttf-dejavu ttf-liberation noto-fonts
```

#### Running on Tiling Window Managers

In some tiling window managers, such as Niri, you may need to set the `_JAVA_AWT_WM_NONREPARENTING` environment variable:

```bash
_JAVA_AWT_WM_NONREPARENTING=1 java -jar "/path/to/ZenAir.jar"
```
#### Black Screen on Startup

If the application starts but shows a black screen, try switching the renderer to the software backend:

```bash
SKIKO_RENDER_API="SOFTWARE" java -jar "/path/to/ZenAir.jar"
# Or for distributable
SKIKO_RENDER_API="SOFTWARE" ./bin/ZenAir
```
</details>
<details>
<summary>Windows</summary>

There are two options and I strictly **recommend** second one:

1. [**`ZenAir-windows-x64-3.260-170.jar`**](https://github.com/Azerlag/ZenAir-Privacy-Policy/releases/download/3.260/ZenAir-windows-x64-3.260-170.jar)
   Standard JAR file. Requires Java 17 or higher to be installed on your system.

2. [**`--> ZenAir-windows-x64-distributable-3.260-170.7z`**](https://github.com/Azerlag/ZenAir-Privacy-Policy/releases/download/3.260/ZenAir-windows-x64-distributable-3.260-170.7z)
   Portable build with an embedded JRE. No separate Java installation is required. Extract the archive using 7-Zip or WinRAR and run the `ZenAir.exe` executable.

#### Running the JAR on Windows

Make sure Java 17 or higher is installed:

```bat
java -version
``` 
You should see something like:
```text
openjdk version "17.x" ...
```

or a newer Java version.

If Java is not installed, install Java 17 or newer separately, for example OpenJDK 17, Temurin 17, or any other compatible Java 17+ distribution.

Run the JAR:

```bat
java -jar "C:\path\to\ZenAir-windows-x64-3.260-170.jar"
```

If `java` is not recognized, make sure Java is added to your system `PATH`, or use the full path to `java.exe`.

</details>
<details>
<summary>Checksums</summary>

To verify file integrity, use:

- **`SHA256SUMS`**
- **`RELEASE-CHECKSUMS.md`**

Example on Linux:

```bash
sha256sum -c SHA256SUMS
# For a single file:
sha256sum -c ZenAir-linux-x64-3.260-170.jar.sha256
```
Compare the resulting hash with the value listed in `SHA256SUMS`. `RELEASE-CHECKSUMS.md` also contains additional SHA512 and MD5 hashes.

</details>

## Function descriptions

<details>
<summary>LOCATOR (finding zen-devices and import terminals from MCU)</summary>

1. Make Base64 import terminal text and insert it into sketch as `const char*` like:
```c
const PROGMEM char* zen_terminal = "[H4sIAAAAAAAA_0VT6Y6iYBB8lnHF6Lqj3Ijx4vZAHFAUNIxBjk9ERUFRnLDPvrMbd6Z-daq6O-lK9eqjYBeaBTsu_CpsPgushpJwIf_1pKMnjcIoWYPpGkJ9aU7y1JAvyk2_tjTw30gNISiCILHf3zOPZ4O9WWYN-B_ig8DWy4huEDxeP77RZK_TGZQsETNU-DK5OEPQMtQWD4UUlrYrOcfO-_Pwfr9gmemRft5R9xtysq9Eh04HOR96L-3DVe0ynV5OYKvL2al-HPJ4hYH6QjNk8-GPBXLlllCv5m379Ltm8bptHiK86lgr1r1ER4hpSJ1WicvvlruDy1XNOaWAgzxQxJw9HJu9eSxzga9v-1aknJO-x_jZ2KrvqJGmxWaz_Ebgr9TbVJlWS8j4vIPlRJDJ4nHZb7Fh0Q8Ec0fHTODeMK3CJt1urZlPlkMvKnvI-aI-DLMqxVPSpo5yafXuNi4pbaP5T8Fq6WOFO9m0KwrC4JoPsma1FulTpshnqpG2r179yNUJcXe5z-0cJDV2lqbBFDLZeSRWND632vTtmDDToHzvIpL8NrLtd2fk4dWcYxquOjdZqWlkjR_DBPXIXmDPw30XSgxQIdJF6kQD63GdmX2wLFfbzKBJ_EDYvRhASXcIkWVzAb1TBNTCq9z95lr5DJyv5WHUMh5wiRDwrfxCTEp4YhdFVK5kpTGEomP3BQvi76D5x2cwmL9Qmf_4V925AJHXCNgAfs6qnzdscU8fJQ824BVEMpzQgUMeKA9kGWx1mbTjY2PtD7LlYY7zyFqiD4CSKEVzeM2HB8pm-4qdNwvnMQkmr6PrZoTdMWMRDswGQrCh7a1vB5eFl6dZcNsfl-tzABRhobCCdNUjGWDMNT6Nhqc-ma37tD1z73vjxpIbZIZhoqAPrxN9iAJyE2shMw13bHIORMbmKHl2i1H2wavc60lAloqISvJiuuNPsyk46WKicN7IFmRWYfbpSAUDBtbMTBRFiQNcBoRLtg3bX24BsA5pzMcT33_atrK-rQT__xL-9Nf6A6AFTTrhAwAA]";

```
I also use `PROGMEM` in ESP8266

2. Then you should to add next special logic:
```c
#define ZEN_GET_GUI_COMMAND "zen_get_gui"
#define ZEN_GET_GUI_COMMAND_RESPONSE "zen_set_gui:"

if (strcmp(c, ZEN_GET_GUI_COMMAND) == 0) {
	client.print(ZEN_GET_GUI_COMMAND_RESPONSE);
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
#define ZEN_GET_GUI_COMMAND_RESPONSE "zen_set_gui:"
// ######################

void atClient() {
  while (client.connected()) {
    if (client.available()) {
      char c[(ROOT_SIZE)] = "";
      const uint8_t amount = client.readBytesUntil(READ_BYTES_TERMINATOR, c, (ROOT_SIZE));

      if (strcmp(c, ZEN_GET_GUI_COMMAND) == 0) {
        client.print(ZEN_GET_GUI_COMMAND_RESPONSE);
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
- To modify the search range, go to the settings menu by clicking the gear icon.
6. When a terminal is received from the device, terminal will be added or replaced automatically (if the corresponding setting is enabled) unless you are in Log dialog, in this case you must manually add it.

During the search process, the Locator sends a `zen_get_gui` request to your device and expects a response starting with `zen_set_gui:` followed by the terminal export text.

</details>

<details>
<summary>LOCATOR (SSDP)</summary>

Sometimes SSDP works on Sketch, sometimes not. This is most likely due to a conflict between HTTP (ESP8266WebServer) and server (WiFiServer), you can throw `WiFiServer` away and use HTTP GET or POST requests to send Terminal to App, but i haven't tested this case. Anyway, I still recommend using hardcoded IP addresses in combination with passing them via an HTTP page in station mode (STA MODE).

Make sure your WiFi Server has the correct port that corresponds to the `Port to search` parameter in the locator.

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
#define ZEN_GET_GUI_COMMAND_RESPONSE "zen_set_gui:"
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
        client.print(ZEN_GET_GUI_COMMAND_RESPONSE);
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

The main way to control the environment is Placeholder Resolver `$itemField` command. `zenItem` default commands are deprecated now.

Use `Demo Terminal` from menu to check some App features.

Use the `Send messages directly to the internal commands handler` option on the sender item's settings to rule UI bypassing the receive data handling.

This section is no longer in service. Refer to the data tables in the App itself to get actual info. This section only describes the main concept.

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

#### MCU can set the button color directly in ARGB format
1) Activate in: Settings → Buttons! → Allow to set ARGB color by command as <command button_index uint32_t(color)>
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
- Selecting list items outside the visible area causes the app crash

## Notes
 
- The implementation of a serial port reader may not work very well. On my test stand with Android 5.0 (Lollipop, API 21) data reception from debugger board based on CH32V305F8P6 controller was unstable
- All changes to settings related to connections take effect with a new connection. Reconnect if the connection was open at the time of configuration change
- The specified history size in the History screen or «on-disk» size represents the memory used by Zstd compressed data stored in binary encoding
- History does not occupy RAM, except for temporary buffer data waiting to be written to memory
- Memory writes occur when the application is minimized (stop event), or by the Autosave counter
- The Data Matrix scanner recognizes only application-native images. Do not attempt to scan real (live) barcode photos or images containing other elements besides the barcode
  - Text and drawings below and to the right of the barcode’s black border can be anything. The main point is not to remove the border and to keep the code in the upper left corner
- The Data Matrix library may struggle with terminals larger than 2-3 kilobytes

## Changelogs
Changelogs are maintained in the [Releases section](https://github.com/.../releases).
