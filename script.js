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
const planTextMonth = document.querySelectorAll(".plan-text-month");
const planTextYear = document.querySelectorAll(".plan-text-year");
const planTextFree = document.querySelectorAll(".plan-text-free");
const divOnlineService = document.querySelector(".div-online-service");
const divLargerStorage = document.querySelector(".div-larger-storage");
const divCustomizableProfile = document.querySelector(
  ".div-customizable-profile"
);
const addonsMonthPrice = document.querySelectorAll(".add-ons-price-month");
const addonsYearPrice = document.querySelectorAll(".add-ons-price-year");
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
var inputAddons = [];

// Step 4
var planPrice = "";
var total = 9;
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
      if (planSelectedValue.value == "Arcade" && monthly.checked) {
        planPrice = "$9/mo";
        total = 9;
      } else if (planSelectedValue.value == "Arcade" && yearly.checked) {
        planPrice = "$90/yr";
        total = 90;
      }
      if (planSelectedValue.value == "Advanced" && monthly.checked) {
        planPrice = "$12/mo";
        total = 12;
      } else if (planSelectedValue.value == "Advanced" && yearly.checked) {
        planPrice = "$120/yr";
        total = 120;
      }
      if (planSelectedValue.value == "Pro" && monthly.checked) {
        planPrice = "$15/mo";
        total = 15;
      } else if (planSelectedValue.value == "Pro" && yearly.checked) {
        planPrice = "$150/yr";
        total = 150;
      }
      summaryPlan.innerHTML = `${planSelectedValue.value} (${billingSelectedValue.value})`;
      summaryPlanPrice.innerHTML = `${planPrice}`;
      formStep[i].style.zIndex = 0;
      formStep[i + 1].style.zIndex = 1;
    }
    // step 3
    if (i == 2) {
      stepNumber[1].classList.remove("active");
      stepNumber[2].classList.remove("active");
      stepNumber[3].classList.add("active");
      summaryAddOnsContainer.innerHTML = inputAddons
        .map(
          (val) => `<div class="summary-add-ons">
      <div class="summary-add-ons-text">${val.title}</div>
      <div class="summary-add-ons-price">${val.price}</div>
    </div>`
        )
        .join("");
      var finalTotal = total + subTotal;
      if (monthly.checked) {
        summaryTotalPrice.innerHTML = `+$${finalTotal}/mo`;
      } else if (yearly.checked) {
        summaryTotalPrice.innerHTML = `+$${finalTotal}/yr`;
      }

      formStep[i].style.zIndex = 0;
      formStep[i + 1].style.zIndex = 1;
    }
    // step 4
    if (i == 3) {
      for (let j = 0; j < buttonContainer.length; j++) {
        buttonContainer[j].style.display = "none";
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
  total = 0;
  stepNumber[3].classList.remove("active");
  stepNumber[1].classList.add("active");
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
    // show yearly plan and add-ons details
    for (let i = 0; i < 3; i++) {
      planTextMonth[i].style.display = "none";
      planTextYear[i].style.display = "block";
      planTextFree[i].style.display = "block";
      addonsMonthPrice[i].style.display = "none";
      addonsYearPrice[i].style.display = "block";
    }
    yearlyLabel.style.color = "#02295a";
    monthlyLabel.style.color = "#9699ab";
    summaryTotaltext.innerHTML = "Total (per year)";
    // reset all months add-ons
    inputAddons = inputAddons.filter((i) => !i.price.includes("mo"))
    if(inputOnline.checked) {
      subTotal -= 1
      inputOnline.checked = false
      divOnlineService.classList.remove("border-active");
    } 
    if(inputLarger.checked) {
      subTotal -= 2
      inputLarger.checked = false
      divLargerStorage.classList.remove("border-active");
    } 
    if(inputCustom.checked) {
      subTotal -= 2
      inputCustom.checked = false
      divCustomizableProfile.classList.remove("border-active");
    } 
    inputAddons = []
  } else if (circle.style.left === "70%") {
    circle.style.left = "30%";
    yearly.checked = false;
    monthly.checked = true;
    // show monthly plan and add-ons details
    for (let i = 0; i < 3; i++) {
      planTextMonth[i].style.display = "block";
      planTextYear[i].style.display = "none";
      planTextFree[i].style.display = "none";
      addonsMonthPrice[i].style.display = "block";
      addonsYearPrice[i].style.display = "none";
    }
    yearlyLabel.style.color = "#9699ab";
    monthlyLabel.style.color = "#02295a";
    summaryTotaltext.innerHTML = "Total (per month)";
    inputAddons = inputAddons.filter((i) => !i.price.includes("yr"))
     // reset all years add-ons
     inputAddons = inputAddons.filter((i) => !i.price.includes("mo"))
     if(inputOnline.checked) {
       subTotal -= 10
       inputOnline.checked = false
       divOnlineService.classList.remove("border-active");
     } 
     if(inputLarger.checked) {
       subTotal -= 20
       inputLarger.checked = false
       divLargerStorage.classList.remove("border-active");
     } 
     if(inputCustom.checked) {
       subTotal -= 20
       inputCustom.checked = false
       divCustomizableProfile.classList.remove("border-active");
     } 
    inputAddons = []
  }
};

// checkbox container step-3
divOnlineService.querySelector("label").onclick = (e) => {
  e.preventDefault();
  if (inputOnline.checked == false) {
    inputOnline.checked = true;
    divOnlineService.classList.add("border-active");
    if (monthly.checked == true) {
      inputAddons.push({ title: inputOnline.value, price: "+$1/mo" });
      subTotal += 1;
    } else if (monthly.checked == false) {
      inputAddons.push({ title: inputOnline.value, price: "+$10/yr" });
      subTotal += 10;
    }
  } else {
    inputOnline.checked = false;
    divOnlineService.classList.remove("border-active");
    if (monthly.checked == true) {
      inputAddons = inputAddons.filter((i) => i.title !== inputOnline.value);
      subTotal -= 1;
    } else if (monthly.checked == false) {
      inputAddons = inputAddons.filter((i) => i.title !== inputOnline.value);
      subTotal -= 10;
    }
  }
};

divLargerStorage.querySelector("label").onclick = (e) => {
  e.preventDefault();
  console.log(e.target);

  if (inputLarger.checked == false) {
    inputLarger.checked = true;
    divLargerStorage.classList.add("border-active");
    if (monthly.checked == true) {
      inputAddons.push({ title: inputLarger.value, price: "+$2/mo" });
      subTotal += 2;
    } else if (monthly.checked == false) {
      inputAddons.push({ title: inputLarger.value, price: "+$20/yr" });
      subTotal += 20;
    }
  } else {
    inputLarger.checked = false;
    divLargerStorage.classList.remove("border-active");
    if (monthly.checked == true) {
      inputAddons = inputAddons.filter((i) => i.title !== inputLarger.value);
      subTotal -= 2;
    } else if (monthly.checked == false) {
      inputAddons = inputAddons.filter((i) => i.title !== inputLarger.value);
      subTotal -= 20;
    }
  }
};

divCustomizableProfile.querySelector("label").onclick = (e) => {
  e.preventDefault();
  if (inputCustom.checked == false) {
    inputCustom.checked = true;
    divCustomizableProfile.classList.add("border-active");
    if (monthly.checked == true) {
      inputAddons.push({ title: inputCustom.value, price: "+$2/mo" });
      subTotal += 2;
    } else if (monthly.checked == false) {
      inputAddons.push({ title: inputCustom.value, price: "+$20/yr" });
      subTotal += 20;
    }
  } else {
    inputCustom.checked = false;
    divCustomizableProfile.classList.remove("border-active");
    if (monthly.checked == true) {
      inputAddons = inputAddons.filter((i) => i.title !== inputCustom.value);
      subTotal -= 2;
    } else if (monthly.checked == false) {
      inputAddons = inputAddons.filter((i) => i.title !== inputCustom.value);
      subTotal -= 20;
    }
  }
};
