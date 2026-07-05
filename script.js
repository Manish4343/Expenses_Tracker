let transactions = [];

//This is help for add use description, amount, type.
function addTransaction() {
  let desc = document.getElementById("desc").value;
  let amount = document.getElementById("amount").value;
  let type = document.getElementById("type").value;

  if(desc === "" || amount === "") return;

  amount = Number(amount);

    // 👉 Current balance calculate
  let balance = 0;
  transactions.forEach(t => {
    if(t.type === "income") {
      balance += t.amount;
    } else {
      balance -= t.amount;
    }
  });

   // 🔥 MAIN LOGIC to see that there is not enough balance
  if(type === "expense" && balance - amount < 0) {
    showMessage("❌ Not enough balance");
    return;
  }

  let transaction = {
    id: Date.now(),
    desc: desc,
    amount: Number(amount),
    type: type
  };

  transactions.push(transaction);
// 🔥 MAIN LOGIC to see that there is balance added.
//   showMessage("✅ Transaction added","Success");
//   updateUI();

// ✅ new (SMART MESSAGE)
if(type === "income") {
  showMessage(`✅ ₹${amount} credited`, "success");
} else {
  showMessage(`💸 ₹${amount} debited`, "error");
}

updateUI();
}
//this for transaction detail and also show the balance and also update all transaction of credit and also debit.
function updateUI() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  let balance = 0;

  transactions.forEach((t) => {
    let li = document.createElement("li");

    if(t.type === "income") {
      balance += t.amount;
      li.classList.add("income");
    } else {
      balance -= t.amount;
      li.classList.add("expense");
    }

    li.innerHTML = `
      ${t.desc} - ₹${t.amount}
      <button onclick="deleteTransaction(${t.id})">delete transactions</button>
    `;

    list.appendChild(li);
  });

  document.getElementById("balance").innerText = "Balance: ₹" + balance;

  saveData();
  }

function saveData() {
  localStorage.setItem("data", JSON.stringify(transactions));
}

  


function loadData() {
  let data = localStorage.getItem("data");
  if(data) {
    transactions = JSON.parse(data);
    updateUI();
  }
}
loadData();

//This function is used to save and load data

//update msg box
function showMessage(msg, type="error") {
  let box = document.getElementById("message");
  box.innerText = msg;
  box.style.color = type === "success" ? "lightgreen" : "red";

  // 3 sec baad message hata do
  setTimeout(() => {
    box.innerText = "";
  }, 3000);
}

//This method is used for delete the transaction.
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateUI();
}

//Update UI ke bahar ye code save data and load
//   function saveData() {
//   localStorage.setItem("data", JSON.stringify(transactions));
// }

// function loadData() {
//   let data = localStorage.getItem("data");
//   if(data) {
//     transactions = JSON.parse(data);
//     updateUI();
//   }
// }