let balanceDiv = document.getElementById("balanceDiv");
let loanButton = document.getElementById("loanButton");
let payDiv = document.getElementById("payDiv");
let bankButton = document.getElementById("bankButton");
let workButton = document.getElementById("workButton");
let pcFeaturesDiv = document.getElementById("pcFeaturesDiv");
let pcTitleDiv = document.getElementById("pcTitleDiv");
let pcDescriptionDiv = document.getElementById("pcDescriptionDiv");
let pcPriceDiv = document.getElementById("pcPriceDiv");
let buyPCButton = document.getElementById("buyPCButton");
let loanModal = document.getElementById("loanModal");
let dropDownItem = document.getElementById("dropDownItem");
let defaultOption = document.createElement('option');
let image = document.createElement('image');
let loanDiv = document.getElementById('loanDiv');


let moneyFormat = Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK'});
let amountToLoan = 0.0;
let bankBalance = 10000.0
let bankBalance1 = ""
let lastLoan = false; //number of loans
let bankBalance2 =""
let salaryBalance = 28000;
let loanBalance=0;
let pcPrice =0;
let pcStock = 0;
let pcName = ""

const balanceDivFunc =(salaryBalance)=>{
  bankBalance2 = moneyFormat.format(bankBalance)
  const html = `<p>${bankBalance2}</p>`;
  balanceDiv.insertAdjacentHTML("beforeend", html)
  }

balanceDivFunc(salaryBalance)


function loan() {
    amountToLoan = Number(prompt("Enter an amount to loan: "));
    
    if(!isNaN(amountToLoan)){
      if (amountToLoan > (2*Number(salaryBalance)) ){
        return alert("Cannot loan more than double of your bank balance!")
      }
      if(lastLoan > 1){
        return alert("Must repay last loan!")
      }
      document.getElementById("loanDiv").innerHTML ="Loan Balance: " +moneyFormat.format(amountToLoan)
       
      loanBalance = amountToLoan;
      document.getElementById("loanButton").disabled = true
      document.getElementById("repayButton").hidden = false
      lastLoan = true;
    }   
    else{alert("Only numbers are allowed!");lastLoan = false;}
}



function bankTheSalary(){
  if(lastLoan === true){
    if(salaryBalance === 0){
      alert("You have no money!")
    }
    else{
    bankBalance1 =loanBalance+(salaryBalance*0.9)
    bankBalance2 = moneyFormat.format(bankBalance1)

    loanBalance =loanBalance+(salaryBalance*0.1)
    let loanBalance1 = moneyFormat.format(loanBalance)
    salaryBalance = 0;
    loanDiv.innerHTML = loanBalance1
    balanceDiv.innerHTML = bankBalance2
    bankBalance = bankBalance1
  }
  }
  else{
    bankBalance =bankBalance+salaryBalance
    bankBalance2 = moneyFormat.format(bankBalance)
    salaryBalance = 0; 
    console.log(bankBalance2)
    
    balanceDiv.innerHTML = bankBalance2
  }
  payDiv.innerHTML = moneyFormat.format(salaryBalance);
}

document.getElementById("bankButton").addEventListener("click", bankTheSalary)

function repayLoan(){
  if(salaryBalance === 0 || salaryBalance<loanBalance){
    alert("Not enough money!")
  }
  else{
   bankBalance1 = moneyFormat.format((bankBalance+salaryBalance)-(loanBalance))

    let mathFunc = bankBalance-loanBalance
  mathFunc = salaryBalance-mathFunc

   loanBalance =  moneyFormat.format(0)
   loanDiv.innerHTML = loanBalance
   salaryBalance = 0; 
   balanceDiv.innerHTML = bankBalance1
   payDiv.innerHTML = moneyFormat.format(salaryBalance);
   
   document.getElementById("loanButton").disabled = false
   document.getElementById("repayButton").hidden = true
   lastLoan = false;
   document.getElementById("loanDiv").innerHTML =""
  }
}

function increasePayBalance(){
  salaryBalance = salaryBalance+100
  document.getElementById("payDiv").innerHTML =moneyFormat.format(salaryBalance)
}

function payDivFunc (salaryBalance) {
  salaryBalance= moneyFormat.format(salaryBalance)
  const html = `<p>${salaryBalance}</p>`;
  payDiv.insertAdjacentHTML("beforeend", html)
  return salaryBalance
}

payDivFunc(salaryBalance)

let selected = "";
let oneItem =""
let toOBject = new Object()
let products=[]


fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
 .then(response=>  response.json())
 .then(data=> products = data)
 .then(products => addProducts(products)).catch(error => console.log("ERROR: "+error))
     



function addProducts  (products) {
    products.forEach(oneProduct => addProductsToOption(oneProduct))
}

function addProductsToOption (oneProduct){
  let option = document.createElement('option');
  option.value = oneProduct.id
  option.appendChild(document.createTextNode(oneProduct.title))
  document.getElementById("dropDownItem").appendChild(option) 
}

function changeInfo (e){
  let selectedProduct = products[e.target.selectedIndex-1];
  document.getElementById('pcContainer').hidden = false
  document.getElementById("featureh5").hidden = false
  console.log(selectedProduct.specs)
  document.getElementById('pcFeaturesDiv').innerHTML  =selectedProduct.specs.map( (e,) => ("- "+e+"<br>") ).join('');

  document.getElementById('pcTitleDiv').innerText = selectedProduct.title;
  document.getElementById('pcDescriptionDiv').innerText = selectedProduct.description;
  document.getElementById('pcPriceDiv').innerText = selectedProduct.price+" NOK";
  document.getElementById('laptopStock').innerText = "Stock: "+selectedProduct.stock;
  pcPrice =  selectedProduct.price
  pcStock = selectedProduct.stock
  pcName = selectedProduct.title
  document.getElementById('image').src = `https://noroff-komputer-store-api.herokuapp.com/${selectedProduct.image}`;

}  

document.getElementById("dropDownItem").addEventListener("change", changeInfo)
//Fill missing image with other image
document.getElementById('image').addEventListener("error", ()=>{
  document.getElementById('image').src = `https://comnplayscience.eu/app/images/notfound.png`;
})


function buyPC(){
  if(pcStock===0){
    
      alert("No more PC avaliable")
    }
  else if(bankBalance >= pcPrice &&  pcStock>=1){
    bankBalance = bankBalance-pcPrice
    balanceDiv.innerHTML =moneyFormat.format(bankBalance)
    pcStock = pcStock-1
    document.getElementById('laptopStock').innerText = "Stock: "+pcStock;
    alert("Congratulations! You just bought a "+pcName)
  }

  
  else{
    alert("Not enough money in Bank!")
  }
}