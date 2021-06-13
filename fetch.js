console.log("this is fetch api");
const area = document.getElementsByClassName("posts");
// console.log(area);

////for get request
// fetch("https://jsonplaceholder.typicode.com/posts")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

///for post request
let post = () => {
  console.log("post function is running");
  data = `{

    "userId": 9009,
"title": "title is undefined",
"body":"this is helpful json" 
  }`;
  params = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: data,
  };
  fetch("https://jsonplaceholder.typicode.com/posts", params)
    .then((response) => response.json())
    .then((data) => console.log(data));
};
post();
