from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)
tasks = ["buy groceries"]

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        new_todo = request.form['new_task']
        if new_todo:
            tasks.append(new_todo)
            return redirect(url_for('home'))
    return render_template('index.html', todos=tasks)

@app.route('/delete_todo/<int:todo_id>', methods=['POST'])
def delete_todo(todo_id):
    print(f"Attempting to delete todo with id: {todo_id}")
    
    if 0 <= todo_id < len(tasks):  # Check if todo_id is valid
        tasks.pop(todo_id)  # Remove the todo from the list
        print(f"Todo with id {todo_id} deleted.")
        return redirect(url_for('home'))  # Redirect to the home page
    else:
        print(f"Error: Todo with id {todo_id} does not exist.")
        return redirect(url_for('home'))  # If invalid, just return

if __name__ == '__main__':
    app.run(debug=True)
