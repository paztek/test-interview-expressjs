const todos = [
    {
        id: 1,
        label: 'Do the laundry',
        done: false,
    },
    {
        id: 2,
        label: 'Feed the cat',
        done: false,
    },
    {
        id: 3,
        label: 'Refactor stuff',
        done: true,
    },
];

let sequenceId = 3;

/**
 * Retrieve a todo by its ID.
 * Be careful that the ID needs to be a number
 */
exports.findById = (id) => {
    return todos.find((t) => t.id === id) || null;
}

/**
 * Return all the todos
 */
exports.findAll = () => {
    return todos;
}

/**
 * Create a todo
 */
exports.create = (todo) => {
    sequenceId++;
    todo.id = sequenceId;
    todos.push(todo);

    return todo;
}

/**
 * Update a todo.
 * Return the updated todo
 */
exports.update = (todo) => {
    const existingTodo = todos.find((t) => t.id === todo.id);

    if (!existingTodo) {
        throw new Error(`Todo ${todo.id} not found`);
    }

    existingTodo.label = todo.label;
    existingTodo.done = todo.done;

    return existingTodo;
}

/**
 * Delete a todo
 */
exports.delete = (todo) => {
    const existingTodo = todos.find((t) => t.id === todo.id);

    if (!existingTodo) {
        throw new Error(`Todo ${todo.id} not found`);
    }

    const index = todos.indexOf(existingTodo);

    todos.splice(index, 1);
}

/**
 * Delete a todo by its ID
 */
exports.deleteById = (id) => {
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
        throw new Error(`Todo ${id} not found`);
    }

    todos.splice(index, 1);
}
