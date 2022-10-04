import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useEffect, useState } from 'react';

// FIREBASE IMPORTS 
import { db } from '../Firebase'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

import Logout from './Logout';


// Create database collection
const dbCollection = collection(db, 'Todo Collection')

const TodoList = () => {

    const [input, setInput] = useState('')
    const [todoArr, setTodoArr] = useState([])
    const [updateInput, setUpdateInput] = useState('')
    const [bool, setBool] = useState(false)
    const [indexNum, setIndexNum] = useState('')

    // STATES FOR FIREBASE 
    const [pageRefresh, setPageRefresh] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const querySnapshot = await getDocs(dbCollection);
            let arr = [];
            querySnapshot.forEach((doc) => {
                arr.push({
                    id: doc.id,
                    value: doc.data().todoValue
                })
            })
            setTodoArr([...arr]);
        }
        getData()
    }, [pageRefresh])


    const AddItem = async () => {
        var obj;
        {
            input !== '' ?
                obj = {
                    todoValue: input,
                }
                :
                alert('Input field is empty')
        }
        await addDoc(dbCollection, obj)
        setPageRefresh(!pageRefresh)
        setInput('')
    }

    const deleteItem = async (index) => {
        const id = todoArr[index].id;
        const deleteData = doc(db, "Todo Collection", id);
        await deleteDoc(deleteData);
        todoArr.splice(index, 1)
        setTodoArr([...todoArr])
    }

    const editBtn = (index) => {
        // setBool(true)
        setIndexNum(index)
        setUpdateInput(todoArr[index].value);
    }

    const updateTodo = async (index) => {
        // setBool(false)      
        const id = todoArr[index].id
        const updateData = doc(db, "Todo Collection", id);
        const objToUpdate = { todoValue: updateInput }
        await updateDoc(updateData, objToUpdate)
        todoArr[index].value = updateInput  // OR todoArr.splice(index, 1, { value: updateInput, id });
        setPageRefresh(!pageRefresh)
        setTodoArr([...todoArr])
        setIndexNum('')
    }

    return (

        <div>

            <div>
                <Logout />
            </div>

            <div className='main'>

                <div className='input-container'>
                    <input value={input} type="text" placeholder='Enter Your Todos'
                        onChange={(e) => setInput(e.target.value)} autoFocus />
                    <OverlayTrigger placement='top' overlay={<Tooltip > Add Todo </Tooltip>}>
                        <Button className='gap' variant="primary" onClick={AddItem}>
                            <i className="fa-solid fa-plus"></i> </Button>
                    </OverlayTrigger>
                </div>


                <ul>
                    {todoArr.map((item, index) => {

                        return <li key={index}>
                            <ListGroup className='list-container'>
                                <ListGroup.Item className='single-todo'>
                                    {indexNum === index ?

                                        <div className='align-list-content'>
                                            <input value={updateInput}
                                                onChange={(e) => setUpdateInput(e.target.value)}
                                                className='update-input' placeholder='Edit todo' autoFocus />

                                            <OverlayTrigger placement='top' overlay={<Tooltip> Update Todo </Tooltip>}>
                                                <Button onClick={() => updateTodo(index)}
                                                    className='gap' variant="primary">
                                                    <i className="fa-solid fa-plus"></i>
                                                </Button>
                                            </OverlayTrigger>
                                        </div>


                                        :


                                        <div className='align-list-content'>

                                            <div className='list-innerhtml'>
                                                <div> {item.value} </div>
                                            </div>

                                            <div>

                                                <OverlayTrigger placement='top' overlay={<Tooltip> Edit Todo </Tooltip>}>
                                                    <Button className='gap'
                                                        onClick={() => editBtn(index)}
                                                        variant="primary">
                                                        <i className="fa-solid fa-pen-to-square"></i>
                                                    </Button>
                                                </OverlayTrigger>

                                                <OverlayTrigger placement='top' overlay={<Tooltip > Delete Todo </Tooltip>}>
                                                    <Button className='gap'
                                                        onClick={() => deleteItem(index)}
                                                        variant="danger">
                                                        <i className="fa-solid fa-minus"></i>
                                                    </Button>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                        </li>
                    })}
                </ul>

            </div>


        </div>

    );
}

export default TodoList;