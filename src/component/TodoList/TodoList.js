import React, {Component} from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  render() {
    const {items, clearList, handleDelete, handleEdit} = this.props;
    return (
      <div>
        <ul className="list-group my-3">
          {items.map(item => {
            return (
              <TodoItem
                key={item.id}
                title={item.title}
                category={item.category}
                notes={item.notes}
                handleDelete={() => handleDelete(item.id)}
                handleEdit={() => handleEdit(item.id)}
              />
            );
          })}

          <button
            type="button"
            className="btn btn-danger btn-block text-capitalize mt-5"
            onClick={clearList}>
            Clear List
          </button>
        </ul>
      </div>
    );
  }
}

export default TodoList;
