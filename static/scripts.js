// Validating add new todo
function validate_add_todo(event) {
    event.preventDefault(); // Prevent form submission
    var todo = document.getElementById('new-todo').value;
    if(todo === '') {
        alert("Please enter a todo");
        return false; // Prevent form submission if input is empty
    }

    document.getElementById('add-todo-form').submit(); // Submit the form
    return true; // Allow form submission if todo is entered
}

// Add event listeners to trash icons
document.querySelectorAll('.trash-icon').forEach(function(icon) {
    icon.addEventListener('click', function() {
        var todo_id = this.closest('.todos-container').getAttribute('data-id');
        delete_todo(todo_id);
    });
});

// Function to handle deleting a todo
function delete_todo(todo_id) {
    console.log('Attempting to delete todo with id: ', todo_id);

    fetch(`/delete-todo/${todo_id}`, {
        method: 'POST'  // Using POST to trigger the route for deletion
    })
    .then(response => {
        if (response.ok) {
            console.log('Todo deleted successfully');
            document.querySelector(`.todos-container[data-id='${todo_id}']`).remove();
        } else {
            console.error('Failed to delete todo');
        }
    })
    .catch(error => {
        console.error('Error in deletion:', error);
    });
}

// Search functionality for todos
document.getElementById('search-todo').addEventListener('keydown', function() {
    var search_term = this.value.toLowerCase(); // Get the search term
    var todos = document.querySelectorAll('.todo_item'); // All todo items

    // Iterate through each todo item and check if it matches the search term
    todos.forEach(function(todo) {
        var todo_text = todo.querySelector('.task-text').textContent.toLowerCase(); // Get the text of the todo

        if (todo_text.includes(search_term)) {
            todo.style.display = 'block'; // Show if matches
        } else {
            todo.style.display = 'none'; // Hide if doesn't match
        }
    });
});

console.log('scripts.js loaded');
