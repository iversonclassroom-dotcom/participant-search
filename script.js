let data = [];

// Fetch data from participants.json when the page loads
fetch('participants.json?v=' + Date.now())
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
    s(); // <--- Automatically trigger search as soon as JSON finishes loading!
  })
  .catch(error => console.error('Error loading JSON data:', error));

function s() {
  let q = document.getElementById('q').value.toLowerCase().trim();
  let o = document.getElementById('out');
  o.innerHTML = '';

  // If search box is empty, stop and show nothing
  if (!q) return;

  // Filter records matching search query
  let filtered = data.filter(item => 
    Object.values(item).some(val => String(val).toLowerCase().includes(q))
  );

  // Render top 20 matching results
  filtered.slice(0, 20).forEach(item => {
    let card = document.createElement('div');
    card.className = 'card';
    
    let htmlContent = '';
    for (let key in item) {
      htmlContent += `<div><b>${key}:</b> ${item[key] ?? ''}</div>`;
    }
    
    card.innerHTML = htmlContent;
    o.appendChild(card);
  });
}
