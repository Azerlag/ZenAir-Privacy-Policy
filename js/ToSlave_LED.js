function ToSlave_LED(DATA) {
    fetch(`http://192.168.1.3/${DATA}`, {
        mode: 'no-cors',
    });
}
