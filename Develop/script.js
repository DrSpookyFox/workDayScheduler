let hours = [
    {time: "9 am", tasks:['nap']},
    {time: "10 am", tasks:['eat']}
];
let timeblocksContainer = $("#timeblocks");
console.log(timeblocksContainer);


let createHour = function(hour,idx){
    let card = `
        <div id="hour-${idx}"class="hour row card">
            <div class="col-2">${hour.time}</div>
            <div class ="col-8" id="newTask">
                <ul id="tasks-${idx}">
                </ul>
            </div>
            <div class= "col-2">
                <button id="button-${idx}" type="button" class="btn btn-save">Save Task</button>
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

// loop over object properties
$.each(hours, function(hourIdx, hour) {
    console.log(hourIdx, hour);
    // then loop over sub-array
   createHour(hour, hourIdx)

    const tasks = hour.tasks

    tasks.forEach((task,taskIdx) => {
        createListitem(task,hourIdx, taskIdx)
    })
});

$(".input").change(function(e) {
    let newInput = e.target.value

    let inputNumber = e.target.id.split('-')[1]

    let findDiv = $(this).closest(".hour")[0].id

    let hourNumber = findDiv.split('-')[1]

    hours[hourNumber].tasks[inputNumber] = newInput
    
});

var saveTasks = function(hours) {
    localStorage.setItem("hours", JSON.stringify(hours))
  };

    $(".btn-save").click(function(eventData){
    let buttonId = eventData.target.id

    let hourNumber = buttonId.split('-')[1]
    console.log(hourNumber)

    console.log(hours)

    saveTasks(hours)
});
