document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const summaryBtn = document.getElementById('summary-btn');
    const summaryDiv = document.getElementById('summary');

    loadTasks();

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addTodoItem(todoInput.value);
        todoInput.value = '';
        saveTasks();
    });

    summaryBtn.addEventListener('click', () => {
        showSummary();
    });

    function addTodoItem(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <div class="flex space-x-2">
                <button class="complete-btn bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700">Complete</button>
                <button class="delete-btn bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700">Delete</button>
            </div>
        `;
        todoList.appendChild(li);

        const completeBtn = li.querySelector('.complete-btn');
        const deleteBtn = li.querySelector('.delete-btn');

        completeBtn.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        deleteBtn.addEventListener('click', () => {
            todoList.removeChild(li);
            saveTasks();
        });
    }

    function saveTasks() {
        const tasks = Array.from(todoList.children).map((item) => {
            const taskText = item.querySelector('span').textContent;
            const isCompleted = item.classList.contains('completed');
            return { taskText, isCompleted };
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach((task) => {
            addTodoItem(task.taskText);
            if (task.isCompleted) {
                const li = todoList.lastChild;
                li.classList.add('completed');
            }
        });
    }

    function showSummary() {
        const allTasks = Array.from(todoList.children).map((item, index) => {
            const taskText = item.querySelector('span').textContent;
            const isCompleted = item.classList.contains('completed');
            return `${index + 1}. ${taskText} - ${isCompleted ? 'Completed' : 'Not Completed'}`;
        }).join('\n');
        summaryDiv.textContent = allTasks ? `All Tasks:\n${allTasks}` : 'No tasks available';
        summaryDiv.style.display = 'block';
    }
});
