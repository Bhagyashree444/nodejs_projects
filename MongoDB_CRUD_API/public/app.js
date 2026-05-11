let deleteForms = document.querySelectorAll(".delete-form");

for (let form of deleteForms) {
    form.addEventListener("submit", function (event) {
        let confirmed = confirm("Are you sure you want to delete this chat?");

        if (!confirmed) {
            event.preventDefault(); // stops form submission
        }
    });
}

