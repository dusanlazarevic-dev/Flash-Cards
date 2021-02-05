import {FlashCard} from "./flashCard.js";
import {LearningTopic} from "./learningTopic.js";
import {QuestionForm} from "./questionForm.js"
import {TopicAdder} from "./topicAdder.js";

const ta = new TopicAdder();
ta.drawAdder(document.body);


const authorList = [];


// 

///
fetch("https://localhost:5001/cards/GetAuthors").then(p=>{
    p.json().then(data=>{
            data.forEach((a => authorList.push(a.name)));
        })
});




///

fetch("https://localhost:5001/cards/GetTopic").then(p=>{
    p.json().then(data=>{
            data.forEach(topic => {
                const topic1 = new LearningTopic(topic.topicName);
                topic1.drawTopic(document.body, authorList);

                topic.cards.forEach((element,index) => {
                    topic1.addCardFromScratch(element.question, element.answer, element.author.name);
                    
                });
               
             
            });
        })
});






