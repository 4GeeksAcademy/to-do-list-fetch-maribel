import { useEffect, useState } from "react"

function ToDo (){
    const [list, setList] = useState([])

    async function getData() {
        let response = await fetch("https://playground.4geeks.com/todo/users/maria")
        let data = await response.json()
        setList(data.todos)
    }

    // useEffect(()=> {   //Muestra las tareas en cada recarga sin necesidad del button
    //     getData()
    // }, [])

console.log(list)

    return(

        <div className="text-center">

        
            <button onClick={()=>(getData())}>
                Traer la info
            </button>
             {
                list.map((e, i)=> {
                    return (

                        <li key={i}>
                            {e.label}
                        </li>

                    )
                })

            }

        </div>


    )

}

export default ToDo
