import {FlashCard} from "./flashCard.js";
import {LearningTopic} from "./learningTopic.js";
import {QuestionForm} from "./questionForm.js"


export class TopicAdder{
    constructor(){
        this.miniContainer = null;
    }


drawAdder(host){
    const container = document.createElement("div");
    container.className = "topic-adder-container";
    this.miniContainer = container;
    host.appendChild(container);

    const heading = document.createElement("h1");
    heading.innerHTML = "Add new topic";
    container.append(heading);


    const tbxNewTopic = document.createElement("textarea");
    tbxNewTopic.maxLength = 35;
    tbxNewTopic.placeholder = "Max 35 characters";
    const btnNewTopic = document.createElement("button");
    btnNewTopic.innerHTML = "Create";
    
     container.appendChild(tbxNewTopic);
    container.appendChild(btnNewTopic);
   

    btnNewTopic.onclick = (ev) =>{
       if(tbxNewTopic.value)
       {
        fetch("https://localhost:5001/Cards/WriteTopic/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "topicName": tbxNewTopic.value
              })
        })
        const newTopic = new LearningTopic(tbxNewTopic.value);
        newTopic.drawTopic(this.miniContainer.parentNode);
       }
       else{
           alert("Topic can not be empty!");
       }
    }
    

}


    
}