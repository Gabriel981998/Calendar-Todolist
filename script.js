let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];



const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');


const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const print= document.getElementById('print');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
  clicked = date;
 

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';

  }
  
backDrop.style.display='block';
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  
  });

  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;
var array=JSON.stringify(events)
  calendar.innerHTML = '';
  
  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);
    

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
      
    }

    calendar.appendChild(daySquare);    
  }
}





function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
    
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}


function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}





initButtons();
load();


/*
(print to screen!!)
var array=JSON.stringify(events);
print.innerHTML=array;

*/

/*


(ALERT Message!!!!)
  for(i =0;i<events.length;i++){
    alert(events[i].title+" Will be on "+events[i].date);

  }

*/

events ;
 



buildTable(events)



$('th').on('click', function(){
   var column = $(this).data('colname')
   var order = $(this).data('order')
   var text = $(this).html()
   text = text.substring(0, text.length - 1);
   
   
   
   if (order == 'desc'){
    events   = events .sort((a, b) => a[column] > b[column] ? 1 : -1)
      $(this).data("order","asc");
      text += '&#9660'
   }else{
    events  = events .sort((a, b) => a[column] < b[column] ? 1 : -1)
      $(this).data("order","desc");
      text += '&#9650'
   }

  $(this).html(text)
  buildTable(events )
  })


 

  
function buildTable(data){
  var table = document.getElementById('myTable')
  table.innerHTML = ''
  for (var i = 0; i < data.length; i++){
      var coltitle = `title-${i}`
      var coldate = `date-${i}`
     

      var row = `<tr>
                      <td>${data[i].title}</td>
                      <td>${data[i].date}</td>
                     
                  
                 </tr>`
      table.innerHTML += row
  }
}

function show(){
document.getElementById('table-striped').style.display="block";
}










