console.log("hello world");
const search = document.getElementById("search");
const matchlist = document.getElementById("match-list");

const searchList = async (searchitem) => {
  //   const res = await fetch(
  //     "https://corona-virus-world-and-india-data.p.rapidapi.com/api_india",
  //     {
  //       method: "GET",
  //       headers: {
  //         "x-rapidapi-key": "4a6b3f0c97mshd186f8234f0fd73p1b5688jsnde1e707ffbad",
  //         "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
  //       },
  //     }
  //   );
  const res = await fetch("states.json");
  const states = await res.json();
  console.log(states);
  /////
  let matches = states.filter((state) => {
    const regx = new RegExp(`^${searchitem}`, "gi");
    return state.name.match(regx) || state.code.match(regx);
  });
  if (searchitem.length === 0) {
    matches = [];
    matchlist.innerHTML = "";
  }

  outputhtml(matches);
};
const outputhtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) =>
          `
  <div class="card card-body mb-1" >
  <h4>${match.name}
  <span class="text-primary"><small>${match.code}</small></span></h4>
  </div>
  
  `
      )
      .join("");
    matchlist.innerHTML = html;
  }
};

search.addEventListener("input", () => searchList(search.value));

//old code
// fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api_india", {
//   method: "GET",
//   headers: {
//     "x-rapidapi-key": "4a6b3f0c97mshd186f8234f0fd73p1b5688jsnde1e707ffbad",
//     "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
//   },
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
