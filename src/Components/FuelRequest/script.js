document.addEventListener('DOMContentLoaded', function() {
    const gallonsInput = document.getElementById('gallonsRequested');
    const dateInput = document.getElementById('dateRequested');
    const totalPriceInput = document.getElementById('totalPrice');
    const getQuoteButton = document.getElementById('getQuoteButton');
  
    // Update total price when gallons requested input changes
    gallonsInput.addEventListener('input', function() {
      updateTotalPrice();
    });
  
    // Update total price when date requested input changes
    dateInput.addEventListener('input', function() {
      updateTotalPrice();
    });
  
    // Function to update total price
    function updateTotalPrice() {
      const gallonsRequested = parseFloat(gallonsInput.value);
      const totalPrice = gallonsRequested * 0.50;
      totalPriceInput.value = '$' + totalPrice.toFixed(2);
    }
  
    // Initialize total price on page load
    updateTotalPrice();
  
    // Event listener for Get Quote button
    getQuoteButton.addEventListener('click', function() {
      fetch('/getQuote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gallonsRequested: gallonsInput.value,
          deliveryDate: dateInput.value
        })
      })
      .then(response => response.json())
      .then(data => {
        const pricePerGallon = data.pricePerGallon;
        totalPriceInput.value = '$' + (pricePerGallon * gallonsInput.value).toFixed(2);
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
      });
    });
  });
