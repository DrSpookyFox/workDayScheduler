let now = moment().hour();
let timeblocksContainer = $("#timeblocks");

let compareTime = function(currentTime, calendarTime) {
    if (calendarTime < currentTime) {
        return 'past'
    } else if (currentTime === calendarTime)
    {
        return 'present'
    } else if (currentTime < calendarTime){
        return 'future'
    }
};

let createHourCard = function(hour,idx){
    let card = `
        <div id="hour-${idx}" class="hour row card ${hour.priority}">
            <div class="col-2">${hour.time}</div>
            <div class ="col-8" id="newTask">
                <ul id="tasks-${idx}">
                </ul>
            </div>
            <div class= "col-2">
                <button id="button-${idx}" type="button" class="btn saveBtn">Save Task</button>
            </div>
        </div>
            `
    timeblocksContainer.append(card)
}

let createListitem = function(task, ulIdx, taskIdx) {
    console.log($('#tasks'))

    let textInput = `<li>
        <input type="text" class="input" id=input-${taskIdx} value="${task}"></input>
    </li>` 

    $(`#tasks-${ulIdx}`).append(textInput)
}



const saveTasks = function(hours) {
    console.log('official hours', hours)
    localStorage.setItem("hours", JSON.stringify(hours))
  };
  
let hours = [
    {time: "9 am", tasks:[''], hour:9}, 
    {time: "10 am", tasks:[''], hour:10},
    {time: "11 am", tasks:[''], hour:11},
    {time: "12 pm", tasks:[''], hour:12},
    {time: "1 pm", tasks:[''], hour:13},
    {time: "2 pm", tasks:[''], hour:14},
    {time: "3 pm", tasks:[''], hour:15},
    {time: "4 pm", tasks:[''], hour:16},
    {time: "5 pm", tasks:[''], hour:17},
    {time: "6 pm", tasks:[''], hour:18},
    {time: "7 pm", tasks:[''], hour:19}
];

const init = (officialHours) => {
    // Create Hour Property
    $.each(officialHours, function(idx, hour) {
        hour.priority = compareTime(now, hour.hour)
        console.log('hour',hour)
    });
    
    // loop over object properties
    $.each(officialHours, function(hourIdx, hour) {
        console.log(hourIdx, hour);
        // then loop over sub-array
       createHourCard(hour, hourIdx)
    });
    
    $.each(officialHours, function(hourIdx,hour) {
        const tasks = hour.tasks
    
        tasks.forEach((task, taskIdx) => {
            createListitem(task, hourIdx, taskIdx)
        })
    })
    
    $(".input").change(function(e) {
        let newInput = e.target.value
    
        let inputNumber = e.target.id.split('-')[1]
    
        let findDiv = $(this).closest(".hour")[0].id
    
        let hourNumber = findDiv.split('-')[1]
    
        officialHours[hourNumber].tasks[inputNumber] = newInput
        
    });
    
    $(".saveBtn").click(function(eventData){
        let buttonId = eventData.target.id
    
        let hourNumber = buttonId.split('-')[1]
        console.log(hourNumber)
    
        // iterate through the officialHours Array
        // and remove the property called priority from each hour
        $.each(officialHours, function(index, hour){
            delete hour.priority

        })
        saveTasks(officialHours)
    });
    
}

// Check if local storage already has hours, if not, populate the hours with the hour template (hour array), 
//if so, pull in the hours data into a variable called officialHours
if (localStorage.getItem("hours") !== null ){
    // get hours from local storage and save to a new variable called officialHours
    let officialHours = JSON.parse(localStorage.getItem("hours"))
    init(officialHours)
    console.log('offical hours', officialHours)
} else if (localStorage.getItem("hours") === null ){
    // take hours and put it inside of local storage
    localStorage.setItem("hours", JSON.stringify(hours))
    let officialHours = JSON.parse(localStorage.getItem("hours"))
    init(officialHours)
}

