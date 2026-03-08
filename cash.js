const cashRegister = {
  total: 0,
  itemCount: 0,
  add(itemCost) {
    this.total += itemCost;
  },
  reset() {
    this.total = 0;
    this.itemCount = 0;
  }
};

function scan() {
  const itemCountInput = document.getElementById("itemCount").value;
  cashRegister.itemCount = parseInt(itemCountInput, 10);

  if (Number.isNaN(cashRegister.itemCount) || cashRegister.itemCount <= 0) {
    alert("Please enter a valid item count (1 or more).");
    return;
  }

  const scannedItemsList = document.getElementById("scannedItems");
  scannedItemsList.innerHTML = "";
  document.getElementById("totalOutput").textContent = "";
  cashRegister.total = 0;

  for (let index = 0; index < cashRegister.itemCount; index += 1) {
    let itemCost;

    while (true) {
      const userInput = prompt(`Enter cost for item ${index + 1}:`);

      if (userInput === null) {
        alert("Scanning cancelled.");
        scannedItemsList.innerHTML = "";
        cashRegister.reset();
        return;
      }

      itemCost = parseFloat(userInput);

      if (!Number.isNaN(itemCost) && itemCost >= 0) {
        break;
      }

      alert("Invalid price. Please enter a valid non-negative number.");
    }

    cashRegister.add(itemCost);

    const listItem = document.createElement("li");
    listItem.textContent = `Item ${index + 1}: $${itemCost.toFixed(2)}`;
    scannedItemsList.appendChild(listItem);
  }
}

function printTotal() {
  const totalOutput = document.getElementById("totalOutput");
  totalOutput.textContent = `Total: $${cashRegister.total.toFixed(2)}`;
}

function resetAll() {
  document.getElementById("itemCount").value = "";
  document.getElementById("scannedItems").innerHTML = "";
  document.getElementById("totalOutput").textContent = "";
  cashRegister.reset();
}

document.getElementById("scanBtn").addEventListener("click", scan);
document.getElementById("showTotalBtn").addEventListener("click", printTotal);
document.getElementById("resetBtn").addEventListener("click", resetAll);