import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showCategories } from "./categories.js";

let addEditDiv = null;
let title = null;
let description = null;
let imageUrl = null;
let addingCategory = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-category");
  title = document.getElementById("title");
  description = document.getElementById("description");
  imageUrl = document.getElementById("imageUrl");
  addingCategory = document.getElementById("adding-category");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingCategory) {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/categories";

        if (addingCategory.textContent === "update") {
          method = "PATCH";
          url = `/api/v1/categories/${addEditDiv.dataset.id}`;
        }

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: title.value,
              description: description.value,
              imageUrl: imageUrl.value,
            }),
          });

          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
              // a 200 is expected for a successful update
              message.textContent = "The job entry was updated.";
            } else {
              // a 201 is expected for a successful create
              message.textContent = "The job entry was created.";
            }

            title.value = "";
            description.value = "";
            imageUrl.value = "";

            showCategories();
          } else {
            console.log(data.message);
            message.textContent = data.message;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }

        enableInput(true);
      } 
      else if (e.target === editCancel) {
        message.textContent = "";
        showCategories();
      }
    }
  });
};


export const showAddEdit = async (categoryId) => {
  if (!categoryId) {
    title.value = "";
    description.value = "";
    imageUrl.value = "";
    addingCategory.textContent = "add";
    message.textContent = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/categories/${categoryId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        title.value = data.category.title;
        description.value = data.category.description;
        imageUrl.value = data.category.imageUrl;
        addingCategory.textContent = "update";
        message.textContent = "";
        addEditDiv.dataset.id = categoryId;

        setDiv(addEditDiv);
      } else {
        // might happen if the list has been updated since last display
        message.textContent = "The category entry was not found";
        showCategories();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showCategories();
    }

    enableInput(true);
  }
};




