import countryLocales from './countryLocales';

const attachTab = (tabId, ipData) => {
  chrome.debugger.attach({ tabId: tabId }, '1.3', function () {
    if (!chrome.runtime.lastError) {

      chrome.debugger.sendCommand(
        { tabId: tabId },
        'Emulation.setLocaleOverride',
        { locale: countryLocales[ipData.countryCode].locale }
      );

      chrome.debugger.sendCommand(
        { tabId: tabId },
        'Emulation.setTimezoneOverride',
        { timezoneId: ipData.timezone }
      );

      chrome.debugger.sendCommand(
        { tabId: tabId },
        'Emulation.setGeolocationOverride',
        {
        latitude: ipData.lat,
        longitude: ipData.lon,
        accuracy: 1,
        }
      );

      chrome.debugger.sendCommand(
        { tabId: tabId },
        'Emulation.setUserAgentOverride',
        {
          userAgent:
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.69',
        }
        // { acceptLanguage: "en-CA" },
        // { platform: "WebTV OS" }
      );
    }
  });
};

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {

  chrome.debugger.getTargets((results) => {

    let result = results.find((obj) => {
      return obj.tabId === tabId;
    });

    if (!result.attached) {
      fetch('http://ip-api.com/json/')
      .then(response => response.json())
      .then(ipData => attachTab(tabId, ipData));
    }

  });
});

// Detects if there are posts for current url
// chrome.tabs.onCreated.addListener((tab) => {
//   console.log(tab.id)
//   attachTab(tab.id);
// });

// chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
//   console.log(tabId)
// });

// chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
//   chrome.debugger.attach({ tabId: tabId }, "1.3", function () {
//     if (!chrome.runtime.lastError) {
//       // console.log("attached debugger to tab: " + tabId);
//       // // https://chromedevtools.github.io/devtools-protocol/tot/ - "geolocation"

//       chrome.debugger.sendCommand(
//         { tabId: tabId },
//         "Emulation.setTimezoneOverride",
//         { timezoneId: "Asia/Shanghai" }
//       );
//     }
//   });
// });


      // chrome.debugger.sendCommand(
      //   { tabId: tabId },
      //   "Emulation.setAutomationOverride",
      //   {
      //     enabled:
      //       true,
      //   },
      // );