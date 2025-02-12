document.getElementById('trip-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const tripName = document.getElementById('trip-name').value;
    const participants = document.getElementById('participants').value.split(',').map(p => p.trim());
    const expenses = document.getElementById('expenses').value.split('\n').map(line => {
      const [description, amount, paidBy] = line.split(',').map(item => item.trim());
      return { description, amount: parseFloat(amount), paidBy };
    });
  
    // Calculate expense split
    const result = calculateExpenseSplit(participants, expenses);
  
    // Display results
    const resultsOutput = document.getElementById('results-output');
    resultsOutput.innerHTML = `<h3>${tripName}</h3><pre>${JSON.stringify(result, null, 2)}</pre>`;
  });
  
  function calculateExpenseSplit(participants, expenses) {
    const balances = {};
    participants.forEach(p => balances[p] = 0);
  
    expenses.forEach(expense => {
      const amountPerPerson = expense.amount / participants.length;
      participants.forEach(p => {
        if (p === expense.paidBy) {
          balances[p] += expense.amount - amountPerPerson;
        } else {
          balances[p] -= amountPerPerson;
        }
      });
    });
  
    return balances;
  }