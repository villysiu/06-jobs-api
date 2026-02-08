import {
    inputEnabled,
    setDiv,
    message,
    setToken,
    token,
    enableInput,
} from "./index.js";

import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";

let categoriesDiv = null;
let categoriesTable = null;
let categoriesTableHeader = null;

export const handleCategories = () => {
    categoriesDiv = document.getElementById("categories");
    const logoff = document.getElementById("logoff");
    const addCategory = document.getElementById("add-category");
    categoriesTable = document.getElementById("categories-table");
    categoriesTableHeader = document.getElementById("categories-table-header");

    categoriesDiv.addEventListener("click", async (e) => {
        if (inputEnabled && e.target.nodeName === "BUTTON") {
            if(e.target === addCategory) {
                showAddEdit(null);
            } 
            else if(e.target === logoff) {
                setToken(null);
                message.textContent = "You have been logged off.";
                categoriesTable.replaceChildren([categoriesTableHeader]);
                showLoginRegister();
            }
            else if(e.target.classList.contains("editButton")) {
                message.textContent = "";
                showAddEdit(e.target.dataset.id);
            }
            else if(e.target.classList.contains("deleteButton")) {
                message.textContent = "";
                deleteCategory(e.target.dataset.id);
            }
               
        }
    });
};
export const deleteCategory = async (categoryId) => {
    try {
        const response = await fetch(`/api/v1/categories/${categoryId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            message.textContent = "The category entry deleted";
        } 
        else {
            const data = await response.json();
            message.textContent = data.message || "Delete failed";
            
        }
        showCategories();
    } catch (err) {
        console.log(err);
        message.textContent = "A communications error has occurred.";
        showCategories();
    }  
}
export const showCategories = async () => {
    try {
        enableInput(false);

        const response = await fetch("/api/v1/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        let children = [categoriesTableHeader];

        if (response.status === 200) {
            if (data.count === 0) {
                categoriesTable.replaceChildren(...children); // clear this for safety
            } 
            else {
                for (let i = 0; i < data.categories.length; i++) {
                    let rowEntry = document.createElement("tr");

                    let editButton = `<td><button type="button" class="editButton" data-id=${data.categories[i]._id}>edit</button></td>`;
                    let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.categories[i]._id}>delete</button></td>`;
                    let rowHTML = `
                        <td>${data.categories[i].title}</td>
                        <td>${data.categories[i].description}</td>
                        <td>${data.categories[i].imageUrl}</td>
                        <div>${editButton}${deleteButton}</div>`

                    rowEntry.innerHTML = rowHTML;
                    children.push(rowEntry);
                }
                categoriesTable.replaceChildren(...children);
            }     
        } 
        else {
            message.textContent = data.message;
        }
    } catch (err) {
        console.log(err);
        message.textContent = "A communication error occurred.";
    }
    enableInput(true);
    setDiv(categoriesDiv);
};