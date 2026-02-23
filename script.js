let  interviewList = [];
let rejectedList = []
let currentStatus = 'all'

let total = document.getElementById("total");
let interview = document.getElementById("interview");
let rejected = document.getElementById("rejected");
let jobs = document.getElementById("jobs")
const nogob = document.querySelector(".nogob");

let allBtn = document.getElementById("all-btn");
let interviewBtn = document.getElementById("interview-btn");
let rejectedBtn = document.getElementById("rejected-btn");

const allCards = document.getElementById("all-cards")
const mainContainer =document.querySelector('main')
const selectJob = document.getElementById("select-job")

function calculateCount(){
    total.innerText = allCards.children.length;
    interview.innerText =interviewList.length;
    rejected.innerText = rejectedList.length;

    if (currentStatus === 'all-btn'||currentStatus==='all'){
        jobs.innerText = allCards.children.length;
    } else if (currentStatus === 'interview-btn'){
        jobs.innerText = interviewList.length;
    } else if (currentStatus ==='rejected-btn'){
        jobs.innerText =rejectedList.length;
    }
}
calculateCount()



function buttonStyle(id) {
   allBtn.classList.add('bg-gray-100', 'text-white')
    interviewBtn.classList.add('bg-gray-100', 'text-white')
   rejectedBtn.classList.add('bg-gray-100', 'text-white')

    allBtn.classList.remove('bg-blue-800', 'text-white')
    interviewBtn.classList.remove('bg-blue-800', 'text-white')
    rejectedBtn.classList.remove('bg-blue-800', 'text-white')

    const selected = document.getElementById(id)

    currentStatus = id
    console.log(currentStatus);

    selected.classList.remove('bg-gray-100', 'text-white')
    selected.classList.add('bg-blue-800', 'text-white')


    if (id == 'interview-btn') {
        allCards.classList.add('hidden');
       selectJob.classList.remove('hidden')
        renderInterview()
     }else if (id == 'all-btn') {
        allCards.classList.remove('hidden');
        selectJob.classList.add('hidden')}
     else if (id == 'rejected-btn') {
       allCards.classList.add('hidden');
        selectJob.classList.remove('hidden')
        renderRejected()
    }

    if (id === 'interview-btn') {
        renderInterview(); 
    } else if (id === 'all-btn') {
        nogob.classList.add('hidden'); 
    }
calculateCount();
     }

    


mainContainer.addEventListener('click', function(event){
   
if(event.target.classList.contains('interview-btn')){

const parentNode = event.target.parentNode.parentNode;

const skil = parentNode.querySelector(".skil").innerText;
const skilName = parentNode.querySelector(".skil-name").innerText;
const salary = parentNode.querySelector(".salary").innerText;
const apliedName = parentNode.querySelector(".aplied").innerText;
const detali = parentNode.querySelector(".detali").innerText;

parentNode.querySelector(".aplied").innerText= 'Applied'





const statusElement = parentNode.querySelector(".aplied");
statusElement.innerText = 'Applied';


statusElement.classList.remove('text-black', 'bg-red-500', 'text-white');
statusElement.classList.add('bg-green-500', 'text-white', 'px-3', 'py-1', 'rounded', 'inline-block', 'w-fit');

const cardContainer = event.target.closest('.py-4.border');

cardContainer.classList.remove('border-l-red-600', 'border-l-[8px]');
cardContainer.classList.add('border-l-[8px]', 'border-l-green-600', 'transition-all');


const cardInfo = {
    skil,
    skilName,
    salary,
    apliedName:'Applied',
    detali
}

const skilExist = interviewList.find(i => i.skil == cardInfo.skil);
if(!skilExist ){
    interviewList.push(cardInfo); 
}

   rejectedList = rejectedList.filter(i => i.skil !== cardInfo.skil);
   
if (currentStatus == 'rejected-btn') {
            renderRejected();
        }

calculateCount()

}

else if(event.target.classList.contains('rejected-btn')){

const parentNode = event.target.parentNode.parentNode;

const skil = parentNode.querySelector(".skil").innerText;
const skilName = parentNode.querySelector(".skil-name").innerText;
const salary = parentNode.querySelector(".salary").innerText;
const apliedName = parentNode.querySelector(".aplied").innerText;
const detali = parentNode.querySelector(".detali").innerText;

parentNode.querySelector(".aplied").innerText = 'Rejected'
const cardInfo = {
    skil,
    skilName,
    salary,
    apliedName :'Rejected',
    detali
}
const statusElement = parentNode.querySelector(".aplied");
statusElement.innerText = 'Rejected';


statusElement.classList.remove('text-black', 'bg-green-500', 'text-white');
statusElement.classList.add('bg-red-500', 'text-white', 'px-3', 'py-1', 'rounded', 'inline-block', 'w-fit');



const cardContainer = event.target.closest('.py-4.border');

cardContainer.classList.remove('border-l-green-600', 'border-l-[8px]');
cardContainer.classList.add('border-l-[8px]', 'border-l-red-600', 'transition-all');

const skilExist = rejectedList.find(i=> i.skil==cardInfo.skil)
if(!skilExist ){
    rejectedList.push(cardInfo);
}


interviewList = interviewList.filter(i => i.skil !== cardInfo.skil);
 if (currentStatus == 'interview-btn') {
            renderInterview();
        }

calculateCount()

}
})




function renderInterview(){

    selectJob.innerHTML = ''

    if(interviewList.length === 0) {
        nogob.classList.remove('hidden');
    } else {
        nogob.classList.add('hidden');
    }
  
    
  for(let item of interviewList){
   
let div = document.createElement('div');
div.className = 'py-4 m-3 p-1 rounded-2xl border border-green-400 border-l-[8px] border-l-green-600 bg-green-100 shadow-sm';
div.innerHTML = `
<div class="flex justify-between">
  <div class="card-body ">
    <h2 class="skil text-black font-bold">${item.skil}</h2>
    <p class="skil-name text-gray-400">${item.skilName}</p>
    <p class="salary text-gray-400">${item.salary}</p>
    <p class=" aplied  cursor-pointer font-semibold rounded-md text-white bg-green-600 w-1/12 text-center">${item.apliedName}</p>
    <p class="detali text-gray-800 ">${item.detali}</p>
    <div class="card-actions ">
      <button class="interview-btn btn btn-outline btn-accent">interview</button>
      <button class="rejected-btn btn btn-outline btn-error">Rejected</button>
    </div>
  </div>
  
<div class="p-4">
    <p onclick="deleteItem('${item.skil}', 'interview')" class="cursor-pointer bg-white shadow-md rounded-md p-2 hover:text-red-600 transition-all">
        <i class="fa-regular fa-trash-can"></i>
    </p>
</div>
  </div>

  `
  selectJob.appendChild(div)
  }  
}

function renderRejected(){

    selectJob.innerHTML = ''

    if ( rejectedList.length === 0) {
        nogob.classList.remove('hidden'); 
    }else {
        nogob.classList.add('hidden');
    }
    

  for(let rejected of  rejectedList){
    

let div = document.createElement('div');
div.className = 'py-4 m-3 p-1 rounded-2xl border border-red-400 border-l-[8px] border-l-red-600  shadow-sm bg-red-100';
div.innerHTML = `
<div class="flex justify-between">
  <div class="card-body ">
    <h2 class="skil text-black font-bold">${rejected.skil}</h2>
    <p class="skil-name text-gray-400">${rejected.skilName}</p>
    <p class="salary text-gray-400">${rejected.salary}</p>
    <p class=" aplied  cursor-pointer font-semibold  rounded-md text-white bg-red-600 w-1/12 text-center">${rejected.apliedName}</p>
    <p class="detali text-gray-800 ">${rejected.detali}</p>
    <div class="card-actions ">
      <button class="interview-btn btn btn-outline btn-accent">interview</button>
      <button class="rejected-btn btn btn-outline btn-error">Rejected</button>
    </div>
  </div>
  <div class="p-4">
    <p onclick="deleteItem('${rejected.skil}', 'rejected')" class="cursor-pointer bg-white shadow-md rounded-md p-2 hover:text-red-600 transition-all">
        <i class="fa-regular fa-trash-can"></i>
    </p>
</div>
  </div>
  `

  selectJob.appendChild(div)
  }  
}



function deleteItem(name, type) {
    if (type === 'interview') {
        interviewList = interviewList.filter(item => item.skil !== name);
        renderInterview();
    } else if (type === 'rejected'){
        rejectedList = rejectedList.filter(item => item.skil !== name);
        renderRejected();
    }
    calculateCount();
}



function deleteMainCard(event){
    const card = event.target.closest('.card');

    if (card) {
        card.remove();
        calculateCount();
        const allCardsContainer =document.getElementById("all-cards");
        if (allCardsContainer.children.length=== 0) {
            nogob.classList.remove('hidden');
        }
    }
}