const API_KEY = import.meta.env.VITE_NASA_API_KEY;

document.querySelector("#app").innerHTML = "<p>loading...</p>";


document.querySelector("#datepicker").addEventListener("change", () => {
  const date = document.querySelector("#datepicker").value;
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)
.then(response => response.json()).then(data => {
  let media

  if(data.media_type === "image") {
    media = `<img src="${data.url}" style="width: 300px; height: 200px;">`
  } else if (data.url.includes("youtube")){
    media = `<iframe src="${data.url}"></iframe>`
  } else {
    media = `<video src="${data.url}" controls></video>`
  }

document.querySelector("#app").innerHTML = `
  <h1>${data.title}</h1>
  ${media}
  <p>${data.explanation}</p>
  `;
})
.catch(e => {
  document.querySelector("#app").innerHTML = `<p>Error: ${e}</p>`
})
})




