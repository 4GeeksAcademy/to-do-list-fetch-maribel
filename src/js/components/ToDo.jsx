import { useEffect, useState } from "react"

function ToDo() {
    const [list, setList] = useState([])

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

        await fetch("https://playground.4geeks.com/todo/users/marin", {
			method: "POST", 
			body: JSON.stringify(newTask), 
			headers: { "Content-type": "application/json" } 
		})

    getData()

	}

    async function putTask(element) {
        let task = {
            "label": element.label,
            "is_done": true
        }
        await fetch(`https://playground.4geeks.com/todo/users/marin${element.id}`, {
            method: "PUT",
            body: JSON.stringify(task),
            headers: { "Content-type": "application/json" }
        })
    getData()

    }


    async function deleteTask(id) {
        await fetch(`https://playground.4geeks.com/todo/users/marin${id}`, {
            method: "DELETE",
        })

    }

    useEffect(()=> {   //Muestra las tareas en cada recarga sin necesidad del button
        getData()
    }, [])

    console.log(list)

    return (

        <div className="text-center">


            <button onClick={() => (getData())}>
                Traer la info
            </button>
            {
                list.map((e, i) => {
                    return (
                        <li key={i}>
                            {e.label}
                            <input 
                        type="text"
                        value={list}
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="Preparar la comida">
                        </input>
                            <button type="button" onClick={() => (deleteTask(e.id))}>X</button>
                        </li>

                    )
                })

            }

        </div>


    )

}

export default ToDo
