const popperEl = document.getElementById("popper");
let popperInstance;
var datam = "ram";

/////////fetch api data
fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api_india", {
  method: "GET",
  headers: {
    "x-rapidapi-key": "4a6b3f0c97mshd186f8234f0fd73p1b5688jsnde1e707ffbad",
    "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
  },
})
  .then((response) => response.json())
  .then((data) => {
    datam = data;
    main();
  })
  .catch((err) => {
    console.error(err);
  });
///

const getHex = (value) => {
  return value.toString(16).padStart(2, "0");
};

const getColor = (ratio) => {
  const color1 = "4d0404";
  const color2 = "ffffff";

  if (!isFinite(ratio)) {
    return "#" + color1;
  }

  const r = Math.ceil(
    parseInt(color1.substring(0, 2), 16) * ratio +
      parseInt(color2.substring(0, 2), 16) * (1 - ratio)
  );
  const g = Math.ceil(
    parseInt(color1.substring(2, 4), 16) * ratio +
      parseInt(color2.substring(2, 4), 16) * (1 - ratio)
  );
  const b = Math.ceil(
    parseInt(color1.substring(4, 6), 16) * ratio +
      parseInt(color2.substring(4, 6), 16) * (1 - ratio)
  );

  return "#" + getHex(r) + getHex(g) + getHex(b);
};

// 2019 Belgian population by province
// const data = {
//   BEL2: 1344241,
//   BEL3: 874048,
//   BEL3474: 1208542,
//   BEL3475: 1146175,
//   BEL3476: 494325,
//   BEL3477: 284638,
//   BEL3478: 1515064,
//   BEL3479: 1195796,
//   BEL3480: 1857986,
//   BEL3481: 1106992,
//   BEL3482: 403599,
// };\
const data = {
  AN: 128108,
  UT: 17305,
  CT: 925,
  TG: 29208,
  AP: 125108,
  AR: 3753,
  AS: 51403,
  BR: 9627,
  CH: 24895,
  DH: 232,
  DD: 232,
  DL: 6731,
  GA: 8216,
  GJ: 20087,
  HR: 9974,
  HP: 9484,
  JK: 28423,
  JH: 6239,
  KA: 268275,
  KL: 167980,
  LD: 1160,
  MP: 11344,
  MH: 188027,
  MN: 9016,
  ML: 5797,
  MZ: 3097,
  NL: 4819,
  OR: 71071,
  PY: 8783,
  PB: 24454,
  RJ: 21550,
  SK: 4240,
  TN: 257463,
  TS: 29208,
  TR: 6404,
  UP: 19438,
  UK: 17305,
  WB: 44441,
};

function main() {
  let data2 = datam;
  console.log(data2);
  // console.log(states);
  // onGeneratedRow(sates, data);
  fetch("india.svg")
    .then((response) => response.text())
    .then((image) => {
      let startOfSvg = image.indexOf("<svg");
      startOfSvg = startOfSvg >= 0 ? startOfSvg : 0;

      const draw = SVG(image.slice(startOfSvg)).addTo("#map").size("100%");

      // get maximum value among the supplied data
      const max = Math.max(...Object.values(data));
      console.log(max);
      for (const region of draw.find("path")) {
        const regionValue = data[region.id()];

        if (isFinite(regionValue)) {
          // color the region based on it's value with respect to the maximum
          region.fill(getColor(regionValue / max));

          // show region value as a label
          draw
            .text(`${region.attr("name")}`)
            .font({
              size: "0.65em",
            })
            .center(region.cx(), region.cy());
        }

        // show region data when clicking on it
        region.on("click", () => {
          alert(`${region.attr("name")} (${region.id()}): ${regionValue}`);
        });

        region.on("mouseover", () => {
          popperEl.innerHTML = `${region.attr(
            "name"
          )} (${region.id()})<b style="color:red"> active cases:</b><b> ${regionValue}</b>`;
          popperEl.style.visibility = "visible";
          popperInstance = Popper.createPopper(region.node, popperEl, {
            placement: "bottom",
          });
        });

        region.on("mouseleave", () => {
          popperEl.style.visibility = "hidden";
        });
      }
    });
}
