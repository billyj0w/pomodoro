import React, {useState, useEffect} from 'react'
import './ToDo.css'

function ToDo() {
    const [newTask, setNewTask] = useState('');
    const [itemsList, setItemsList] = useState([]);
    const [isActive, setIsActive] = useState(true)

    const handleTaskInput = (e) => {
        const inputTask = e.target.value
        setNewTask(inputTask);
    }

    function handleAddItem(e) {
        e.preventDefault();
        if (!newTask) {
            return
        }
        setItemsList([...itemsList, newTask])
        setNewTask('');
    } 
    const exluirItem  = (e) => {
        let id = e.currentTarget.id
        const itemCopy = Array.from(itemsList)
        itemCopy.splice(id, 1);
        setItemsList(itemCopy)
    }
    
    const concluido = (e) => {
        setIsActive(!isActive)  
        var li = document.getElementById(e.target.id)
        isActive ? li.classList.add('concluido') : li.classList.remove('concluido')
    }
    

    React.useEffect(()=>{
        const items = JSON.parse(localStorage.getItem('itemsList'));
        if(items){
            setItemsList(items)
        }
    }, [])

    React.useEffect(()=>{
        localStorage.setItem('itemsList', JSON.stringify(itemsList))
    },[itemsList])

    return (
        <div className='toDo'>
            <div>
                <input
                    value={newTask}
                    onChange={handleTaskInput}
                    placeholder='new task' />

                <button
                    onClick={handleAddItem}
                >Add Task</button>
            </div>
            <ul className='itemsList'>
                {itemsList.map((item, index) => (
                    <li key={index} id={index} className='item'>{item} 
                    
                        <button id={index} onClick={concluido}>concluir</button>
                        <button id={index} onClick={exluirItem}>excluir</button>
                    </li>
                ))}
            </ul>
            {/* <p>{tasks.map((task) => (<p>{task}</p>))}</p> */}
        </div>
    )
}

export default ToDo