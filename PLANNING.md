# Brainstorming
- car that holds distance to an obstacle w/ ultrasonic sensor
- make the PID tuneable wirelessly
- ~~probably host a website via GitHub pages that can then connect to a websocket or BT serial the AirLift is hosting~~
- ~~too much bandwidth-too many protocols to host site on board~~
- ~~https://learn.adafruit.com/adafruit-metro-m4-express-airlift-wifi/circuitpython-ble~~
- ~~WebSerial~~
- after a bunch of research into what the AirLift boards can do, there's a bunch of complications:
  - I can't figrure out how to make the BLE thing pairable, plus i'm not sure that even if I could I would be able to get a native serial port
  - Ideally we would just host a websocket server, but there's no websocket server library for airlift, only stuff that runs direct on ESP32
  - However, there *is* a WebSocket client library for AirLift
  - The catch is that it's for C++, not CircuitPython
  - Because the AirLift protocol is nearly identical to Arduino's WiFiNINA system, there's a lot more stuff in C++ that will work
  - ~~(still no WebSocket server tho)~~
  - ~~so:~~
    - ~~we're gonna have the Metro, programmed in c++, attach to a websocket and allow configuration and talk over it with [ArduinoHttpClient](https://github.com/arduino-libraries/ArduinoHttpClient/blob/master/src/WebSocketClient.h)~~
    - ~~we're gonna have a Python program running on a computer that hosts a websocket and runs a ui using [PySimpleGui](https://realpython.com/pysimplegui-python/) and a [live-updating MatPlotLib graph](https://pythonprogramming.net/live-graphs-matplotlib-tutorial/) for PID tuning~~
    - ~~and we're gonna *hope* that websockets, especially weird local ones, don't get blocked by the firewall, because they look *awfully similar* to how games might be trying to run multiplayer~~
  - [HERE'S A WIFININA WEBSOCKET SERVER](https://github.com/khoih-prog/WebSockets2_Generic/blob/master/examples/Generic/WiFiNINA/SAMD/SAMD-Server/SAMD-Server.ino)
  - So, back to the original plan:
    - Host a website (probably on GitHub Pages) that can connect to a websocket
    - Over that websocket, control the PID tunings and send back data for...
    - a live-updating graph to visualize the PID tuning (using [chart.js](https://www.chartjs.org/)?)
# Schedule
|Date|Milestones|
|---|---|
04/21|Proof of concept - websocket communication;
04/27|All CAD done and fabricated
04/28|"dead bug" circuit and basic PID controller
05/05|PID wireless interface
05/12|Integration with fabricated car v1
05/19|Integration hell (stretch goal: add compass and 2nd PID loop for antidrift)
06/02|Docs complete