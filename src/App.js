import React, {Component} from 'react';
//import { Container, Button, Link } from 'react-floating-action-button';
import TodoInput from '../src/component/TodoInput/TodoInput';
import TodoList from '../src/component/TodoList/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../src/component/Header/Header';
import AddIcon from '../src/component/floating button/floating';
import uuid from 'uuid';
import {Col, Row, Container} from 'react-bootstrap';
import {Button, Link} from 'react-floating-action-button';
import Modal from '../src/component/Modal/Modal';

let todoList = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : [];
console.log(todoList);
class App extends Component {
  state = {
    items: todoList,
    id: uuid(),
    item: '',
    item_notes: '',
    category: '',
    editItem: false,
    show: false,
  };

  showModal = () => {
    this.setState({show: true});
  };

  hideModal = () => {
    this.setState({show: false});
  };
  handleChange = e => {
    this.setState({
      item: e.target.value,
    });
  };

  handleChangeNotes = e => {
    this.setState({
      item_notes: e.target.value,
    });
  };

  handleChangeCategory = e => {
    this.setState({
      category: e.target.value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const newItem = {
      id: this.state.id,
      title: this.state.item,
      notes: this.state.item_notes,
      category: this.state.category,
    };

    const updateItems = [...this.state.items, newItem];
    this.setState({
      items: updateItems,
      item: '',
      item_notes: '',
      category: '',
      id: uuid(),
      editItem: false,
    });

    todoList.push(newItem);
    console.log(todoList);
    localStorage.setItem('items', JSON.stringify(todoList));
  };

  clearList = () => {
    this.setState({
      items: [],
    });

    localStorage.clear();
  };

  handleDelete = id => {
    // const filteredItems = this.state.items.filter(item => item.id !== id);
    const deleteItem = JSON.parse(localStorage.getItem('items')).find(
      item => item.id === id
    );

    const filteredItems = JSON.parse(localStorage.getItem('items')).filter(
      item => item.id !== id
    );

    this.setState({
      items: filteredItems,
    });

    // localStorage.setItem('deleteItem', deleteItem);
    // // console.log(JSON.parse(localStorage.getItem('deleteItem')));
    // localStorage.removeItem('deleteItem');
    // console.log(localStorage);
  };

  handleEdit = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id);

    const selectedItem = this.state.items.find(item => item.id === id);
    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      item_notes: selectedItem.notes,
      category: selectedItem.category,
      editItem: true,
      id: id,
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Container>
          <Row className="mt-5">
            <Col lg={12} md={12} sm={12}>
              <h2>My Todo List</h2>
              <TodoList
                items={this.state.items}
                clearList={this.clearList}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
              />
            </Col>
          </Row>
        </Container>
        {/* <AddIcon /> */}
        <div>
          <Container>
            <Modal show={this.state.show} handleClose={this.hideModal}>
              <TodoInput
                item={this.state.item}
                item_notes={this.state.item_notes}
                handleChange={this.handleChange}
                handleChangeNotes={this.handleChangeNotes}
                handleChangeCategory={this.handleChangeCategory}
                handleSubmit={this.handleSubmit}
                editItem={this.state.editItem}
              />
            </Modal>
          </Container>
          <Container>
            <Button
              tooltip="Create New Schedule"
              icon="fas fa-plus"
              rotate={true}
              onClick={this.showModal}
            />
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
