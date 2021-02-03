import {FlashCard} from "./flashCard.js";
import {QuestionForm} from "./questionForm.js"

export class LearningTopic{
    constructor(topicName){
        this.topicName = topicName;
        this.form = new QuestionForm("", "");
        this.flashCardArray = [];
        this.topicContainer = null;

    }

    drawTopic(host){
        
        this.topicContainer = document.createElement("div");
        host.appendChild(this.topicContainer );
        this.topicContainer.className = "pageContainer";
        

        const topicTitleContainer = document.createElement("div");
        const topicTitle = document.createElement("h1");
        topicTitle.innerHTML = this.topicName;

        const btnDeleteTopic = document.createElement("button");
        btnDeleteTopic.innerHTML = "DELETE";
        btnDeleteTopic.onclick = (ev) => {
          
        
        fetch("https://localhost:5001/Cards/DeleteTopic/"  + this.topicName, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                
            })
        });
        
        this.topicContainer.parentNode.removeChild(this.topicContainer);
          
        };

        topicTitleContainer.className = "topic-title-container";
        topicTitleContainer.appendChild(topicTitle);
        topicTitleContainer.appendChild(btnDeleteTopic);

        this.topicContainer.appendChild(topicTitleContainer);

       
        this.form.drawForm(this.topicContainer);
        this.form.topic = this;
        this.drawCards(this.topicContainer);
       
       
       
       
        // console.log(this);
    }

    drawCards(host){
        const cardsContainer = document.createElement("div");
        cardsContainer.className = "cards-container"
        if(this.flashCardArray!=null){
          
            this.flashCardArray.forEach(element =>{
                element.drawFlashCard(cardsContainer)
                element.topic = this;
            });
            host.appendChild(cardsContainer);
        }
      

        this.topicContainer.appendChild(cardsContainer);

    }

    addCard(newCard){
        this.flashCardArray.push(newCard);
    }

    addCardFromScratch(question, answer){
        const newCard = new FlashCard(question, answer);
        this.flashCardArray.push(newCard);

        const indexOfLast = this.flashCardArray.length - 1;
          
        this.flashCardArray[indexOfLast].drawFlashCard(this.topicContainer.querySelector(".cards-container"));
       // console.log(this.ID);
        // fetch("https://localhost:5001/Cards/WriteTopic" + this.id, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         vrsta: vrsta,
        //         kapacitet: kolicina,
        //         maxKapacitet: this.kapacitet,
        //         tip: tip.value,
        //         x: x,
        //         y: y
        //     })
        // })
    }




}