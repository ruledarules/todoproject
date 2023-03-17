console.log(axios)

const theList = document.getElementById("todo-list")
const theForm = document["todo-form"]
const button = document.querySelectorAll(".delete")

//  -       -   This is a function dedicated to getting the data    -   -   -
function access() {
    axios.get("https://api.vschool.io/seansproject/todo/")
    .then(response => {
        // console.log(response.data)
        handleTodo(response.data)
    })
    .catch(error => {
        console.log(error)
    })}
//      -       -     This function places the items on the DOM     -       -
    function handleTodo(todos){
        console.log(todos, "test")
        emptyBox()
        // todos.map(todo => {
        //     console.log(todo.title)
        //     const title = document.createElement("h1")
        //     title.textContent = todo.title
        //     theList.appendChild(title)
        //     let xBox = document.createElement("input")
        //     xBox.setAttribute("type", "checkbox")
        //     title.appendChild(xBox)
        //     checkedBox(xBox)
        
        // })
        for(i = 0; i < todos.length; i ++){
            let main = todos[i].title 
            let description = todos[i].description
            console.log(main)
            // console.log(description)
            // console.log(todos.data[i].title)
            let h2 = document.createElement("h2")
            // let h4 = document.createElement("p")
            h2.textContent = main
            // h4.textContent = description
            theList.appendChild(h2)
            // h2.append(h4)
            let xBox = document.createElement("input")
            xBox.setAttribute("type", "checkbox")
            h2.append(xBox)
            const remove = document.createElement("button")
            remove.innerText = "Remove"
            remove.classList.add("delete")
            h2.appendChild(remove)
            //checkedBox(xBox)

            let toggleCompletion = !todos[i].completed
            let todoId = todos[i]._id
            let todoComplete = todos[i].completed
            
            if(todoComplete === true) {
                h2.style.textDecoration = "line-through"
                xBox.checked = true
            }

            xBox.addEventListener("click", function (){
                // const makeComplete = {
                //     completed: todos[i].completed
                // }

                console.log(todoId, "COMPLETED TODO?")
                axios.put("https://api.vschool.io/seansproject/todo/" + todoId, {completed: toggleCompletion} )
                .then(answer =>{
                    console.log(answer.data)
                }) 
                .catch(miss => console.log(miss))
                access()
            })

            remove.addEventListener("click", function(event){
                event.preventDefault()
                console.log("clicking")
                console.log(todoId + " selected ID")
                axios.delete("https://api.vschool.io/seansproject/todo/" + todoId)
                    .then(() => access())
                    .catch(error => console.log(error))
                    // access()
            })
        }
    }
//  -   -   function to append the data to the DOM  -   -   -
theForm.addEventListener("submit", function(e){
    e.preventDefault()
    // let addition = theForm.newDo.value
    const newTodo = {
        title: theForm.newDo.value,
        //description: theForm.description.value,
        // imgUrl: theForm.imgUrl.value
    }
    theForm.newDo.value = ""
    
    axios.post("https://api.vschool.io/seansproject/todo/", newTodo)
    .then(res => access())
    .catch(error => console.log(error))
    // .then(answer => console.log(answer))
    // alert(addition)
})

emptyBox = () => {
    let theBox = document.getElementById("todo-list")
    while (theBox.firstChild){
        theBox.removeChild(theBox.firstChild)
    }
}


checkedBox = (item) =>{
    if(item.checked){
        console.log("got it")
    }
}
/* 1.I  need to add buttons to the list
    2.I need to be able to individually select the buttons
    3. I then need to make a function click event for those buttons
    4. I cant hard code the ID I want so I will have to make a function that 
    makes contact with the ID that I want to grab. */

//  -   -   For the remove buttons  -   -

// for(x = 0; x < button.length; x++){
//     button[x].addEventListener("click", function(){
//     console.log("clicked")
// })
// }

