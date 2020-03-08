const actionBtn = document.getElementById("action-button");
// new item
const makeWorkout = document.getElementById("make-new");
// clear all items
const clear = document.getElementById("clear-all");
// delete an item
const results = document.getElementById("results");

const status = document.getElementById("status");

function getResults() {
    clearTodos();
    fetch("/all")
        .then(function(response) {
            if (response.status !== 200) {
                console.log("Error, Status Code: " + response.status);
                return;
            }
            response.json().then(function(data) {
                newTodoSnippet(data);
            });
        })
        .catch(function(err) {
            console.log("Fetch Error :-S", err);
        });
}

function newTodoSnippet(res) {
    for (var i = 0; i < res.length; i++) {
        let data_id = res[i]["_id"];
        let exercise = res[i]["exercise"];
        let todoList = document.getElementById("results");
        snippet = `
      <p class="data-entry">
      <span class="dataExercise btn btn-success m-1 shadow-sm" data-id=${data_id}>${exercise}</span>
      <span onClick="delete" class="delete" data-id=${data_id}>x</span>
      </p>`;
        todoList.insertAdjacentHTML("beforeend", snippet);
    }
}

function clearTodos() {
    const todoList = document.getElementById("results");
    todoList.innerHTML = "";
}

function resetExerciseAndWorkout() {
    const workout = document.getElementById("workout");
    workout.value = "";
    const exercise = document.getElementById("exercise");
    exercise.value = "";
}

function updateExerciseAndWorkout(data) {
    const workout = document.getElementById("workout");
    workout.value = data.workout;
    const exercise = document.getElementById("exercise");
    exercise.value = data.exercise;
}

getResults();

clear.addEventListener("click", function(e) {
    if (e.target.matches("#clear-all")) {
        element = e.target;
        data_id = element.getAttribute("data-id");
        fetch("/clearall", {
                method: "delete"
            })
            .then(function(response) {
                if (response.status !== 200) {
                    console.log("Looks like there was a problem. Status Code: " + response.status);
                    return;
                }
                clearTodos();
            })
            .catch(function(err) {
                console.log("Fetch Error :-S", err);
            });
    }
});

results.addEventListener("click", function(e) {
    if (e.target.matches(".delete")) {
        element = e.target;
        data_id = element.getAttribute("data-id");
        fetch("/delete/" + data_id, {
                method: "delete"
            })
            .then(function(response) {
                if (response.status !== 200) {
                    console.log("Looks like there was a problem. Status Code: " + response.status);
                    return;
                }
                element.parentNode.remove();
                resetExerciseAndWorkout();
                let newButton = `
      <button id='make-new'>Submit</button>`;
                actionBtn.innerHTML = newButton;
            })
            .catch(function(err) {
                console.log("Fetch Error :-S", err);
            });
    } else if (e.target.matches(".dataExercise")) {
        element = e.target;
        data_id = element.getAttribute("data-id");
        status.innerText = "●"
        fetch("/find/" + data_id, { method: "get" })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                updateExerciseAndWorkout(data);
                let newButton = `<button id='updater' data-id=${data_id}>Update</button>`;
                actionBtn.innerHTML = newButton;
            })
            .catch(function(err) {
                console.log("Fetch Error :-S", err);
            });
    }
});

actionBtn.addEventListener("click", function(e) {
    if (e.target.matches("#updater")) {
        updateBtnEl = e.target;
        data_id = updateBtnEl.getAttribute("data-id");
        const exercise = document.getElementById("exercise").value;
        const workout = document.getElementById("workout").value;
        fetch("/update/" + data_id, {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    exercise,
                    workout
                })
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                element.innerText = exercise
                resetExerciseAndWorkout();
                let newButton = `<button class="btn btn-success" id='make-new'>Submit</button>`;
                actionBtn.innerHTML = newButton;
                status.innerText = '●';
            })
            .catch(function(err) {
                console.log("Fetch Error :-S", err);
            });
    } else if (e.target.matches("#make-new")) {
        element = e.target;
        data_id = element.getAttribute("data-id");
        fetch("/submit", {
                method: "post",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    exercise: document.getElementById("exercise").value,
                    workout: document.getElementById("workout").value,
                    created: Date.now()
                })
            })
            .then(res => res.json())
            .then(res => newTodoSnippet([res]));
        resetExerciseAndWorkout();
    }
});
