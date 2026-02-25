const btns = document.querySelectorAll("button");

for(let btn of btns)
{
    btn.addEventListener("click", () => {
        //prints on browser console as it is a part of html code
        //present in ejs (instagram2.ejs)
        console.log("Button was Clicked"); 
    })
}