App in Google Play: https://play.google.com/store/apps/details?id=com.gang_tracker.arduinowifi

## Changelogs
<details>
<summary>1.43 → 1.632</summary>

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
