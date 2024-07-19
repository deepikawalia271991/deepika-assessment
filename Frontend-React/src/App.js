import React, { useState, useEffect } from 'react'
import './App.css'
import AddTodoItem from './components/AddTodoItem'
import TodoItems from './components/TodoItems'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Image, Alert, Container, Row, Col } from 'react-bootstrap'
import { fetchTodo, markCompleted, postTodo } from './api/todoService'

const App = () => {
  const [description, setDescription] = useState('')
  const [items, setItems] = useState([])

  useEffect(() => {
    getItems();
  }, [])
 //moved the code for add todo and get todo to components folder
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }
// get all todo list items
  const getItems = async () => {
    try {

      const { status, data } = await fetchTodo();
      if (status === 200 && data.length > 0) {
        setItems(data);
      }
      else {
        toast("No todos available");
      }
    } catch (error) {
      toast("Unable to get Todos");
    }
  }

// add new todo handler
  const handleAdd = async () => {
    try {

      const { status, data } = await postTodo(description, false);
      if (status === 201 && data.id) {
        getItems();
        toast("Todo added succesfully!");
      }
    } catch (error) {
      toast("Unable to add Todo");
      console.error(error)
    }
  }

  function handleClear() {
    setDescription('')
  }
// mark the todo complete
  const handleMarkAsComplete = async (item) => {
    try {
      const completedItem = { ...item, isCompleted: true };
      const { status, data } = await markCompleted(completedItem);
      if (status === 200 && data.isCompleted) {
        getItems()
        toast("Todo completed succesfully!");
      }
    } catch (error) {
      toast("Unable to mark completed");
      console.error(error)
    }
  }

  return (
    <div className="App">
      <ToastContainer position="top-center" />

      <Container>
        <Row>
          <Col>
            <Image src="clearPointLogo.png" fluid rounded />
          </Col>
        </Row>
        <Row>
          <Col>
            <Alert variant="success">
              <Alert.Heading>Todo List App</Alert.Heading>
              Welcome to the ClearPoint frontend technical test. We like to keep things simple, yet clean so your
              task(s) are as follows:
              <br />
              <br />
              <ol className="list-left">
                <li>Add the ability to add (POST) a Todo Item by calling the backend API</li>
                <li>
                  Display (GET) all the current Todo Items in the below grid and display them in any order you wish
                </li>
                <li>
                  Bonus points for completing the 'Mark as completed' button code for allowing users to update and mark
                  a specific Todo Item as completed and for displaying any relevant validation errors/ messages from the
                  API in the UI
                </li>
                <li>Feel free to add unit tests and refactor the component(s) as best you see fit</li>
              </ol>
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col>
            <AddTodoItem description={description} handleDescriptionChange={handleDescriptionChange} handleAdd={handleAdd} handleClear={handleClear} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <TodoItems items={items} getItems={getItems} handleMarkAsComplete={handleMarkAsComplete} />
          </Col>
        </Row>
      </Container>
      <footer className="page-footer font-small teal pt-4">
        <div className="footer-copyright text-center py-3">
          © 2021 Copyright:
          <a href="https://clearpoint.digital" target="_blank" rel="noreferrer">
            clearpoint.digital
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
