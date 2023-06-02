// DOM elements
const buttonNext = document.querySelectorAll(".btn-next");
const prevButton = document.querySelectorAll(".btn-prev");
const formStep = document.querySelectorAll(".form-step");
const form = document.querySelector("form");
const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");
const buttonRadio = document.querySelector(".btn-radio");
const switchBilling = document.querySelector(".switch-billing");
const circle = document.querySelector(".circle");
const yearly = document.getElementById("yearly");
const monthly = document.getElementById("monthly");
const yearlyLabel = document.querySelector(".yearly");
const monthlyLabel = document.querySelector(".monthly");
const inputOnline = document.getElementById("online-service");
const inputCustom = document.getElementById("customizable-profile");
const inputLarger = document.getElementById("larger-storage");
const errorName = document.querySelector(".error-name");
const errorEmail = document.querySelector(".error-email");
const errorPhone = document.querySelector(".error-phone");
const summaryPlan = document.querySelector(".summary-plan-text h3");
const summaryPlanPrice = document.querySelector(".summary-plan-price");
const summaryAddOnsContainer = document.querySelector(
  ".summary-add-ons-container"
);
const summaryTotaltext = document.querySelector(".summary-total-text");
const summaryTotalPrice = document.querySelector(".summary-total-price");
const changePlan = document.querySelector(".change-plan");
const stepNumber = document.querySelectorAll(".step-number");
const buttonContainer = document.querySelectorAll(".btn-container");

// Input initializations
// Step 1
var validName = false;
var validEmail = false;
var validPhone = false;

// Step 2
circle.style.left = "30%";
yearly.checked = false;
monthly.checked = true;

// Step 3
var inputAddons = [{ title: "", price: "" }];

// Step 4
var planPrice = "";
var total = 0;
var subTotal = 0;

for (let i = 0; i < stepNumber.length; i++) {
  var computedStyle = window.getComputedStyle(formStep[i]);
  var zIndex = computedStyle.zIndex;
  if (window.getComputedStyle(formStep[i]).zIndex == 1) {
    stepNumber[i].classList.add("active");
  }
}

// Next step switch
for (let i = 0; i < buttonNext.length; i++) {
  buttonNext[i].onclick = (e) => {
    e.preventDefault();
    // step 1 validation

    if (i == 0) {
      stepNumber[0].classList.remove("active");
      stepNumber[1].classList.add("active");
      var regexName = /[\S\s]+[\S]+/;
      var testName = regexName.test(inputName.value);
      if (testName == false) {
        errorName.style.opacity = 1;
        inputName.style.border = "1px solid #ed3548";
        validName = false;
      } else {
        errorName.style.opacity = 0;
        inputName.style.border = "1px solid #9699ab";
        validName = true;
      }
      var regexEmail =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      var testEmail = regexEmail.test(inputEmail.value);
      if (testEmail == false) {
        errorEmail.style.opacity = 1;
        inputEmail.style.border = "1px solid #ed3548";
        validEmail = false;
      } else {
        errorEmail.style.opacity = 0;
        inputEmail.style.border = "1px solid #9699ab";
        validEmail = true;
      }
      var regexPhone = /^\+(?:[0-9] ?){6,14}[0-9]$/;
      var testPhone = regexPhone.test(inputPhone.value);
      if (testPhone == false) {
        errorPhone.style.opacity = 1;
        inputPhone.style.border = "1px solid #ed3548";
        validPhone = false;
      } else {
        errorPhone.style.opacity = 0;
        inputPhone.style.border = "1px solid #9699ab";
        validPhone = true;
      }
    }
    if (
      i == 0 &&
      validName == true &&
      validEmail == true &&
      validPhone == true
    ) {
      
      formStep[i].style.zIndex = 0;
      formStep[i + 1].style.zIndex = 1;
      
    }
    // step 2
    if (i == 1) {
      stepNumber[1].classList.remove("active");
      stepNumber[2].classList.add("active");
      var planSelectedValue = document.querySelector(
        'input[name="plan"]:checked'
      );
      var billingSelectedValue = document.querySelector(
        'input[name="billing"]:checked'
      );
      if (planSelectedValue.value == "Arcade") {
        planPrice = "$9/mo";
        total = 9;
      }
      if (planSelectedValue.value == "Advanced") {
        planPrice = "$12/mo";
        total = 12;
      }
      if (planSelectedValue.value == "Pro") {
        planPrice = "$15/mo";
        total = 15;
      }
      summaryPlan.innerHTML = `${planSelectedValue.value} (${billingSelectedValue.value})`;
      summaryPlanPrice.innerHTML = `${planPrice}`;
      formStep[i].style.zIndex = 0;
      formStep[i + 1].style.zIndex = 1;
    }
    // step 3
    if (i == 2) {
      stepNumber[2].classList.remove("active");
      stepNumber[3].classList.add("active");
      const mappedArray = Array.from(inputAddons.keys())
        .map((index) => {
          const adjustedIndex = index + 1;
          return inputAddons[adjustedIndex];
        })
        .filter((value) => value !== undefined);

      summaryAddOnsContainer.innerHTML = mappedArray
        .map(
          (val, index) => `<div class="summary-add-ons">
    <div class="summary-add-ons-text">${val.title}</div>
    <div class="summary-add-ons-price">${val.price}</div>
  </div>`
        )
        .join("");
      var finalTotal = total + subTotal;
      summaryTotalPrice.innerHTML = `+$${finalTotal}/mo`;
      formStep[i].style.zIndex = 0;
      formStep[i + 1].style.zIndex = 1;
    }
    // step 4
    if (i == 3) {
      for(let j = 0; j < buttonContainer.length; j++) {
        buttonContainer[j].style.display = "none"
      }
      stepNumber[3].classList.remove("active");
      formStep[i].style.zIndex = 0;
      formStep[i + 1].style.zIndex = 1;
    }
  };
}

// Previous step switch
for (let i = 0; i < prevButton.length; i++) {
  prevButton[i].onclick = (e) => {
    e.preventDefault();
    formStep[i + 1].style.zIndex = 0;
    formStep[i].style.zIndex = 1;
    stepNumber[i + 1].classList.remove("active");
    stepNumber[i].classList.add("active");
  };
}

// Change plan
changePlan.onclick = (e) => {
  e.preventDefault();
  stepNumber[3].classList.remove("active");
  stepNumber[1].classList.add("active")
  total = 0;
  formStep[3].style.zIndex = 0;
  formStep[1].style.zIndex = 1;
};

// Billing switch
summaryTotaltext.innerHTML = "Total (per month)";
switchBilling.onclick = (e) => {
  e.preventDefault();
  if (circle.style.left === "30%") {
    circle.style.left = "70%";
    yearly.checked = true;
    monthly.checked = false;
    yearlyLabel.style.color = "#02295a";
    monthlyLabel.style.color = "#9699ab";
    summaryTotaltext.innerHTML = "Total (per year)";
  } else if (circle.style.left === "70%") {
    circle.style.left = "30%";
    yearly.checked = false;
    monthly.checked = true;
    yearlyLabel.style.color = "#9699ab";
    monthlyLabel.style.color = "#02295a";
    summaryTotaltext.innerHTML = "Total (per month)";
  }
};

// Step 3 checkbox switch
inputOnline.addEventListener("change", (event) => {
  const checkParent = inputOnline.parentNode;
  console.log(checkParent);
  if (event.currentTarget.checked) {
    checkParent.classList.add("border-active");
    inputAddons.push({ title: inputOnline.value, price: "+$1/mo" });
    subTotal += 1;
  } else {
    checkParent.classList.remove("border-active");
    inputAddons = inputAddons.filter((i) => i.title !== inputOnline.value);
    subTotal -= 1;
  }
});
inputCustom.addEventListener("change", (event) => {
  const checkParent = inputCustom.parentNode;
  if (event.currentTarget.checked) {
    checkParent.classList.add("border-active");
    inputAddons.push({ title: inputCustom.value, price: "+$2/mo" });
    subTotal += 2;
  } else {
    checkParent.classList.remove("border-active");
    inputAddons = inputAddons.filter((i) => i.title !== inputCustom.value);
    subTotal -= 2;
  }
});
inputLarger.addEventListener("change", (event) => {
  const checkParent = inputLarger.parentNode;
  if (event.currentTarget.checked) {
    checkParent.classList.add("border-active");
    inputAddons.push({ title: inputLarger.value, price: "+$2/mo" });
    subTotal += 2;
  } else {
    checkParent.classList.remove("border-active");
    inputAddons = inputAddons.filter((i) => i.title !== inputLarger.value);
    subTotal -= 2;
  }
});

// Step 4 content

form.onsubmit = (e) => {
  e.preventDefault();
  alert("form sbmited");
};
