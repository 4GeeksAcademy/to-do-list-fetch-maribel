import { useEffect, useState } from "react"

function ToDo() {
    const [list, setList] = useState([])
    const [taskTitle, setTaskTitle] = useState("")

    async function getData() {

        try {
            let response = await fetch("https://playground.4geeks.com/todo/users/marin")
            console.log(response)
            if (response.status >= 200 && response.status < 400) {
                let data = await response.json()
                setList(data.todos)
            } else {
                console.log(`Error llamando a playground.4geeks.com - error ${response.status}`)
            }

        } catch (error) {
            console.log(error)
        }
    }

    async function createTask(event) {
        event.preventDefault()

        const newTask = {
            "label": taskTitle,
            "is_done": false
        }

        await fetch("https://playground.4geeks.com/todo/todos/marin", {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: { "Content-type": "application/json" }
        })

        setTaskTitle("")

        getData()

    }

    async function updateTask(element) {
        let task = {
            "label": element.label,
            "is_done": true
        }
        await fetch(`https://playground.4geeks.com/todo/todos/users/marin/${element.id}`, {
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

            <form onSubmit={(e) => createTask(e)}>
                <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Preparar la comida">
                </input>

                <button type="submit">Añadir Tasks </button>

            </form>

            <div className="text-center">
                {
                    list.map((task, i) => {
                        return (
                            <span key={i} onClick={() => (e)}>
                                <li >
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
