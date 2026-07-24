let data = [];

// Fetch data from participants.json and render initial list once loaded
fetch('participants.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
    s(); // Call search function to display initial list on page load
  })
  .catch(error => console.error('Error loading JSON data:', error));

function s() {
  let q = document.getElementById('q').value.toLowerCase().trim();
  let o = document.getElementById('out');
  o.innerHTML = '';

  // If search query exists, filter records; otherwise, use full data set
  let filtered = q 
    ? data.filter(item => Object.values(item).some(val => String(val).toLowerCase().includes(q)))
    : data;

  // Render top 20 items
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
