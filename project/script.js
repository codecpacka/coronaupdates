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
    Gujrat();
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

function main() {
  // let data2 = datam;
  // for (key in data2) {
  //   console.log(data2[key]);
  // }
  // console.log(states);
  // onGeneratedRow(sates, data);
  console.log(datam);
  fetch("india.svg")
    .then((response) => response.text())
    .then((image) => {
      let startOfSvg = image.indexOf("<svg");
      startOfSvg = startOfSvg >= 0 ? startOfSvg : 0;

      const draw = SVG(image.slice(startOfSvg)).addTo("#map").size("100%");

      // get maximum value among the supplied data
      // const max = Math.max(...Object.values(data));
      const data = Object.values(datam.state_wise);
      const max = Math.max.apply(
        Math,
        data.map(function (o) {
          return o.active;
        })
      );
      console.log(max);
      for (const region of draw.find("path")) {
        // const regionValue = data[region.id()];
        // console.log(data);
        const currentStateData = data.find(function (obj) {
          if (obj.statecode === region.id()) {
            // console.log(obj.statecode);

            return true;
          }
        });
        if (currentStateData && currentStateData.hasOwnProperty("active")) {
          const regionValue = currentStateData.active;
          const confirmed = currentStateData.confirmed;
          const deaths = currentStateData.deaths;
          const recovered = currentStateData.recovered;

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
            alert(
              `${region.attr(
                "name"
              )} (${region.id()}) :  Active Cases : ${regionValue} , Confirm Cases : ${regionValue} , Deaths Cases : ${deaths} , Recovered Cases: ${recovered}`
            );
          });

          region.on("mouseover", () => {
            popperEl.innerHTML = `<b>${region.attr(
              "name"
            )} (${region.id()})</b><p style="color:orange"><b> Active Cases : ${regionValue} </b></p></b><p style="color:red"><b> Confirm Cases : ${confirmed} </b></p> <p style="color:yellow"><b>Deaths Cases : ${deaths} </b></p> <p style="color:green"><b>Recovered Cases: ${recovered}</b></p>`;
            popperEl.style.visibility = "visible";
            popperInstance = Popper.createPopper(region.node, popperEl, {
              placement: "bottom",
            });
          });

          region.on("mouseleave", () => {
            popperEl.style.visibility = "hidden";
          });
        }
      }
    });
}

function Gujrat() {
  // let data2 = datam;
  // for (key in data2) {
  //   console.log(data2[key]);
  // }
  // console.log(states);
  // onGeneratedRow(sates, data);
  console.log(datam);
  fetch("gujrat.svg")
    .then((response) => response.text())
    .then((image) => {
      let startOfSvg = image.indexOf("<svg");
      startOfSvg = startOfSvg >= 0 ? startOfSvg : 0;

      const draw = SVG(image.slice(startOfSvg)).addTo("#gujrat");

      // get maximum value among the supplied data
      // const max = Math.max(...Object.values(data));
      const data = Object.values(datam.state_wise.Gujarat);
      const max = Math.max.apply(
        Math,
        data.map(function (o) {
          return o.active;
        })
      );
      console.log(max);
      for (const region of draw.find("path")) {
        // const regionValue = data[region.id()];
        console.log(data);
        const currentStateData = data.find(function (obj) {
          if (obj.statecode === region.id()) {
            return true;
          }
        });
        if (currentStateData && currentStateData.hasOwnProperty("active")) {
          const regionValue = currentStateData.active;
          const confirmed = currentStateData.confirmed;
          const deaths = currentStateData.deceased;
          const recovered = currentStateData.recovered;

          if (isFinite(regionValue)) {
            // color the region based on it's value with respect to the maximum
            region.fill(getColor(regionValue / max));

            // show region value as a label
            draw
              .text(`${region.attr("id")}`)
              .font({
                size: "0.65em",
              })
              .center(region.cx(), region.cy());
          }

          // show region data when clicking on it
          region.on("click", () => {
            alert(
              `${region.attr(
                "name"
              )} (${region.id()}) :  Active Cases : ${regionValue} , Confirm Cases : ${regionValue} , Deaths Cases : ${deaths} , Recovered Cases: ${recovered}`
            );
          });

          region.on("mouseover", () => {
            popperEl.innerHTML = `<b>${region.attr(
              "name"
            )} (${region.id()})</b><p style="color:orange"><b> Active Cases : ${regionValue} </b></p></b><p style="color:red"><b> Confirm Cases : ${regionValue} </b></p> <p style="color:yellow"><b>Deaths Cases : ${deaths} </b></p> <p style="color:green"><b>Recovered Cases: ${recovered}</b></p>`;
            popperEl.style.visibility = "visible";
            popperInstance = Popper.createPopper(region.node, popperEl, {
              placement: "bottom",
            });
          });

          region.on("mouseleave", () => {
            popperEl.style.visibility = "hidden";
          });
        }
      }
    });
}
