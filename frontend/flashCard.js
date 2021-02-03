export class FlashCard{
    constructor(question, answer){
        this.question = question;
        this.answer = answer;
        this.cardContainer = null;
        
    }

   

    drawFlashCard(host){

        const cardElement = document.createElement("div");
    
        cardElement.className = "flash-card";
        cardElement.dataset.answerVisibility = false;
        host.appendChild(cardElement);

        this.cardContainer = cardElement

        const cardQuestion = document.createElement("p");
        cardQuestion.innerHTML = this.question;
        cardQuestion.className = "card-question";
        cardElement.appendChild(cardQuestion);
               
        const revealLink = document.createElement("a");
        revealLink.innerHTML = "Show/Hide Answer";
        revealLink.setAttribute("href", "#");
        revealLink.addEventListener("click", this.showOrHide);
        cardElement.appendChild(revealLink);
 
        cardElement.appendChild(document.createElement("br"));
       
        const cardAnswer = document.createElement("p");
        cardAnswer.style.display = "none";
        cardAnswer.className = "card-answer";
        cardAnswer.innerHTML = this.answer;
        cardElement.appendChild(cardAnswer);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "DELETE";
        deleteButton.onclick = (ev)=>{
            this.deleteCard();
        }
        cardElement.appendChild(deleteButton);

        const editButton = document.createElement("button");
        editButton.innerHTML = "EDIT";
        editButton.onclick = (ev)=>{
            this.editCard();
        }
        cardElement.appendChild(editButton);

        
        

    }

     showOrHide(){
         const flashCard = this.parentNode;
         const answer = this.parentNode.childNodes[3];

         if(flashCard.dataset.answerVisibility == "false")
        {
            answer.style.display = "block";
            flashCard.dataset.answerVisibility = "true";
        }
        else
        {
            
            answer.style.display = "none";
            flashCard.dataset.answerVisibility = "false";
        }
        
    }

    deleteCard(){
        const topicName = (this.cardContainer.parentNode.parentNode.querySelector("h1").innerHTML);
        console.log(topicName);
        fetch("https://localhost:5001/Cards/DeleteCard/"  + topicName, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "question": this.question,
                "answer": this.answer
            })
        });
        
        parent = this.cardContainer.parentNode;
        parent.removeChild(this.cardContainer);
          
        // fetch("https://localhost:5001/Cards/DeleteTopic/"  + this.topicName, {
        //     method: "DELETE",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
                
        //     })
        // });

      
    
    }

    editCard(){
        const form = (this.cardContainer.parentNode.parentNode.querySelector(".new-question"));

        const questionText = form.querySelector(".question-text");
        questionText.value  = this.question;

        const answerText = form.querySelector(".answer-text");
        answerText.value  = this.answer;
        
    }

    updateCard(question, answer){
        this.question = question;
        this.answer = answer;
    }

}