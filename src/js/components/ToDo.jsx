import { useEffect, useState } from "react"

function ToDo() {
    const [list, setList] = useState([])
    const [input, setInput] = useState("")

    async function getData() {

        try {
            let response = await fetch("https://playground.4geeks.com/todo/users/marin")
            let data = await response.json()
            setList(data.todos)
        } catch (error) {
            console.log(error)
        }
    }

    async function postTask(event) {
        event.preventDefault()

        const newTask = {
            "label": input,
            "is_done": false
        }

        await fetch("https://playground.4geeks.com/todo/todos/marin", {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: { "Content-type": "application/json" }
        })

        setInput("")

        getData()

    }

    async function putTask(element) {
        let task = {
            "label": element.label,
            "is_done": true
        }
        await fetch(`https://playground.4geeks.com/todo/todos/users/marin${element.id}`, {
            method: "PUT",
            body: JSON.stringify(task),
            headers: { "Content-type": "application/json" }
        })
        getData()

    }


    async function deleteTask(id) {
        await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: "DELETE",
        })
        getData()
    }

    useEffect(() => {   //Muestra las tareas en cada recarga sin necesidad del button
        getData()
    }, [])



    return (

        <div className="text-center">

            <form onSubmit={(e) => postTask(e)}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Preparar la comida">
                </input>

                <button type="submit">Añadir Tasks </button>

            </form>

            <div className="text-center">
            {
                list.map((task) => {
                    return (
                      <span onClick={() =>(e)}>

                        <li key={task.id}>
                            {task.label}
                            <button type="button" onClick={() => deleteTask(task.id)}> X </button>
                        </li>
                       </span>
                    )
                })

            }
            </div>

        </div>


    )

}

export default ToDo
