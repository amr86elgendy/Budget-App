class UI {
  constructor () {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  submitBudgetForm() {
    const value = this.budgetInput.value;
    if (value === "" || value < 0) {
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerHTML = `<p>This Field Cannot Be Empty Or Negative Value</p>`;
      setTimeout(() =>
        this.budgetFeedback.classList.remove("showItem")
      , 2000)
    } else {
      this.budgetAmount.innerText = value;
      this.budgetInput.value = "";
      this.showBalance();
    }
  }
  // Show Balance
  showBalance() {
    const budget = this.budgetAmount.innerText;
    const expense = this.totalExpense();
    const total = parseInt(budget) - parseInt(expense);
    this.balanceAmount.innerText = total;
    if (total > 0) {
      this.balance.classList.remove("showRed", "showBlack");
      this.balance.classList.add("showGreen");
    } else if (total === 0) {
      this.balance.classList.remove("showRed", "showGreen");
      this.balance.classList.add("showBlack");
    } else {
      this.balance.classList.remove("showGreen", "showBlack");
      this.balance.classList.add("showRed");
    }
  }
  // Submit Expense Form
  submitExpenseForm() {
    const expenseTitle = this.expenseInput.value;
    const expenseAmount = this.amountInput.value;
    if (expenseTitle === "" || expenseAmount === "" || expenseAmount < 0) {
      this.expenseFeedback.classList.add("showItem");
      this.expenseFeedback.innerHTML = `<p>This Field Cannot Be Empty Or Negative Value</p>`;
      setTimeout(() =>
        this.expenseFeedback.classList.remove("showItem")
      , 2000)
    } else {
      this.expenseInput.value = "";
      this.amountInput.value = "";
      let expense = {
        title: expenseTitle, amount: parseInt(expenseAmount), id: this.itemID
      };
      this.itemList.push(expense);
      this.itemID++;
      this.addExpense(expense);
      this.showBalance();
    }
  }
  // Add Expense
  addExpense(expense) {
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-action list-group-item-light d-flex justify-content-between";
    li.innerHTML = `
      <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
      <h5 class="expense-amount mb-0 list-item">$${expense.amount}</h5>
      <div class="expense-icons list-item">
        <span class="mr-1" data-id="${expense.id}">
          <i class="fas fa-edit"></i>
        </span>
        <span class="ml-1" data-id="${expense.id}">
          <i class="fas fa-trash"></i>
        </span>
      </div>
    `;
    this.expenseList.appendChild(li);
  }
  // Total Expense
  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce((acc, curr) => {
        acc += curr.amount;
        return acc;
      }, 0)
    }
    this.expenseAmount.innerText = total;
    return total;
  }
  // Edit Expense
  editExpense(el) {
    const id = parseInt(el.dataset.id);
    el.parentElement.parentElement.remove();
    
    let expense = this.itemList.filter(item => item.id === id);
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;

    this.itemList = this.itemList.filter(item => item.id !== id);
    this.showBalance();
  }
  // Delete Expense
  deleteExpense(el) {
    const id = parseInt(el.dataset.id);
    el.parentElement.parentElement.remove();

    this.itemList = this.itemList.filter(item => item.id !== id);
    this.showBalance();
  }
}

/* -------------------------------------------------- */


// Event Listeners 
function eventListeners() {
  // New Instance Of UI Class
  const ui = new UI();
  
  ui.budgetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    ui.submitBudgetForm();
  });
  ui.expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    ui.submitExpenseForm();
  });
  ui.expenseList.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-edit")) {
      ui.editExpense(e.target.parentElement);
    } else if (e.target.classList.contains("fa-trash")) {
      ui.deleteExpense(e.target.parentElement);
    }
  })
}


document.addEventListener("DOMContentLoaded", eventListeners)

