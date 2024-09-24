import React, { useState } from 'react';//Hook that allows you to add state to functional components.

const TodoList = () => { //todos: An array that holds the to-do items.inputValue: A string that holds the current input value from the text box.
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);//track the index of the todo  edited


    //event handlers.This function updates inputValue as the user types in the input field.
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    /**Add Todo Handler: This function: Prevents the default form submission.Checks if the input is not empty.
     * Adds a new to-do item to the todos array.Resets the input field. */
    const addTodo = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        if (editIndex !== null) {
            // Update existing todo
            const updatedTodos = todos.map((todo, index) =>
                index === editIndex ? { ...todo, text: inputValue } : todo
            );
            setTodos(updatedTodos);
            setEditIndex(null); // Reset edit index
        } else {
            // Add new todo
            setTodos([...todos, { text: inputValue, completed: false }]);
        }
        
        setInputValue('');
    };


/**Toggle Completion Handler: This function toggles the completed state of a to-do item when its corresponding button is clicked. */
    const toggleTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    /**Remove Todo Handler: This function removes a to-do item from the list by filtering out the item at the specified index. */
    const removeTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    const startEdit = (index) => {
        setInputValue(todos[index].text); // Set inputValue to the todo text
        setEditIndex(index); // Set the index of the todo being edited
    };


    return (
        <div>
           
            <h1>To-Do List</h1>
            <form onSubmit={addTodo}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Add a brand new task"
                />
                <button type="submit"> ADD</button>
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.text}
                        <button onClick={() => toggleTodo(index)}>Toggle </button>
                        <button onClick={() => removeTodo(index)}>Remove</button>
                        <button onClick={() => startEdit(index)}>Edit</button>
                    </li>
                ))}
            </ul>
           
        </div>
    );
};

export default TodoList;
