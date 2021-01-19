const noble = require("@abandonware/noble");

const { isRubik } = require("./rubik/utils");
const { RUBIK_SERVICE, RUBIK_NOTIFY_CHARACTERISTIC } = require('./rubik/constants')

noble.on("stateChange", async (state) => {
  if (state === "poweredOn") {
    console.log("Rotate your cube to start...");
    await noble.startScanningAsync();
  }
});

noble.on("discover", async (peripheral) => {
  if (isRubik(peripheral)) {
    const {
      advertisement: { localName },
    } = peripheral;
    console.log("Discovered:", localName);

    await peripheral.connectAsync();

    const { characteristics: [notifyCharacteristic] } = await peripheral.discoverSomeServicesAndCharacteristicsAsync([RUBIK_SERVICE], [RUBIK_NOTIFY_CHARACTERISTIC]);

    console.log("Found notify characteristic:", RUBIK_NOTIFY_CHARACTERISTIC);
    await notifyCharacteristic.subscribeAsync();
    notifyCharacteristic.on('data', (data) => {
      console.log('data', data);
    });
  }
});

process.on("uncaughtException", function (err) {
  console.log(err);
  process.exit(1);
});

process.on("unhandledRejection", function (err) {
  console.log(err);
  process.exit(1);
});
