// Получение элементов
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Функция для отображения задачи в списке
function renderTask (task) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = task.title;

  if (task.completed) {
    span.classList.add('completed');
  }

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-task';
  deleteBtn.textContent = '✖';

  // Добавляем обработчик удаления
  deleteBtn.addEventListener('click', () => {
    deleteTask(task.id, li);
  });

  // Обработчик для отметки задачи как выполненной
  span.addEventListener('click', () => {
    span.classList.toggle('completed');
    updateTaskStatus(task.id, span.classList.contains('completed'));
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Функция для загрузки задач с сервера
async function fetchTasks () {
  try {
    // Показываем индикатор загрузки
    taskList.innerHTML = '<p>Загрузка задач...</p>';

    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const tasks = await response.json();

    // Очищаем список и отображаем задачи
    taskList.innerHTML = '';
    tasks.forEach(task => renderTask(task));
  } catch (error) {
    taskList.innerHTML = '<p>Ошибка при загрузке задач.</p>';
    console.error('Ошибка при загрузке задач:', error);
  }
}


// Вызов функции загрузки при загрузке страницы
document.addEventListener('DOMContentLoaded', fetchTasks);

// Функция добавления задачи
function addTask () {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const newTask = {
      title: taskText,
      completed: false
    };

    createTask(newTask);
    taskInput.value = '';
  }
}

// Обработчик отправки формы
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask();
});

async function createTask (task) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const newTask = await response.json();
    newTask.id = Date.now(); // Генерируем временный ID
    renderTask(newTask);
  } catch (error) {
    console.error('Ошибка при создании задачи:', error);
  }
}

async function deleteTask (id, element) {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE'
    });
    taskList.removeChild(element);
  } catch (error) {
    console.error('Ошибка при удалении задачи:', error);
  }
}

async function updateTaskStatus (id, completed) {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ completed }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Ошибка при обновлении задачи:', error);
  }
}
