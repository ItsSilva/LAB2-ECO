document.getElementById("fetch-button").addEventListener("click", fetchData);

//GET
async function fetchData() {
  try {
    const response = await fetch("http://localhost:3004/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    renderData(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
//FORM
const form = document.getElementById("post-form").addEventListener(
  "submit",
  (e = (e) => {
    e.preventDefault();
    const formData = {
      title: document.getElementById("title").value,
      body: document.getElementById("body").value,
      img: document.getElementById("img").value,
    };
    postData(formData);
  })
);
//POST
const postData = async (formData) => {
  try {
    const response = await fetch("http://localhost:3004/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
//RENDER
const renderData = (data) => {
  const container = document.getElementById("post-container");
  container.innerHTML = "";

  data.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.body}</p>
    <img src="${post.img}" alt="${post.title}">
    <button id="delete-button" onclick="deleteData('${post.id}')">Delete</button>
    `;
    container.appendChild(postElement);
  });
};
//DELETE
const deleteData = async (id) => {
  try {
    const response = await fetch(`http://localhost:3004/posts/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    fetchData();
  } catch (error) {
    console.log(error);
  }
};
