const form = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");

window.onload = function() {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.forEach(function(expense) {
    displayExpense(expense);
  });
};

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  const expense = { amount, description, category };

  displayExpense(expense);
  saveExpenseToLocalStorage(expense);

  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
});

function displayExpense(expense) {
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.innerHTML = `${expense.amount} - ${expense.description} (${expense.category})
    <button class="btn btn-warning btn-sm float-end me-2 editBtn">Edit</button>
    <button class="btn btn-danger btn-sm float-end deleteBtn">Delete</button>`;

  expenseList.appendChild(li);
}

function saveExpenseToLocalStorage(expense) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

expenseList.addEventListener("click", function(e) {
  if (e.target.classList.contains("deleteBtn")) {
    e.target.parentElement.remove();
    deleteExpenseFromLocalStorage(e.target.parentElement);
  }

  if (e.target.classList.contains("editBtn")) {
    const li = e.target.parentElement;
    const amount = li.textContent.split(" - ")[0];
    const description = li.textContent.split(" - ")[1].split("(")[0].trim();
    const category = li.textContent.split("(")[1].split(")")[0];

    document.getElementById("amount").value = amount;
    document.getElementById("description").value = description;
    document.getElementById("category").value = category;

    li.remove();
    deleteExpenseFromLocalStorage(li);
  }
});

function deleteExpenseFromLocalStorage(li) {
  const amount = li.textContent.split(" - ")[0];
  const description = li.textContent.split(" - ")[1].split("(")[0].trim();
  const category = li.textContent.split("(")[1].split(")")[0];

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses = expenses.filter(expense =>
    expense.amount !== amount || expense.description !== description || expense.category !== category
  );
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
