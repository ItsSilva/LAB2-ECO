//Display Posts Button
const postButtonDisplay = document.getElementById("post-button");
postButtonDisplay.style.display = "none";
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
//GET
document.getElementById("fetch-button").addEventListener("click", fetchData);
async function fetchData() {
  try {
    const response = await fetch("http://localhost:3004/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const formContainer = document.querySelector(".form-container");
    formContainer.style.display = "none";

    const buttonPostPage = document.querySelector("#fetch-button");
    buttonPostPage.style.display = "none";

    const postButtonDisplay = document.getElementById("post-button");
    postButtonDisplay.style.display = "block";

    renderData(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
//Display form
document.getElementById("post-button").addEventListener("click", () => {
  const formContainer = document.querySelector(".form-container");
  formContainer.style.display = "block";

  const buttonPostPage = document.querySelector("#fetch-button");
  buttonPostPage.style.display = "block";

  const postButtonDisplay = document.getElementById("post-button");
  postButtonDisplay.style.display = "none";

  const container = document.getElementById("post-container");
  container.innerHTML = "";
});
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

    const formContainer = document.querySelector(".form-container");
    formContainer.style.display = "none";

    const postButtonDisplay = document.getElementById("post-button");
    postButtonDisplay.style.display = "block";

    fetchData();
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
