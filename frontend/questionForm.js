import { FlashCard } from "./flashCard.js";

export class QuestionForm{
    constructor(question, answer){
        this.question = question;
        this.answer = answer;
        this.formContainer = "";
    }

    drawForm(host, authorNamesList){

        this.formContainer = document.createElement("div");
        this.formContainer.className = "new-question";

       

     
        host.appendChild(this.formContainer);

        const authorLabel = document.createElement("label");
        authorLabel.innerHTML = "Author:";
        this.formContainer.appendChild(authorLabel);

       
        const authorDropdown = document.createElement("select");
        authorDropdown.className = "author-dropdown-list";
    

        authorNamesList.forEach(authorName =>{
            const option = document.createElement("option");
      	  option.text = authorName;
      	  option.value = authorName;
      	  authorDropdown.add(option);

            });
        this.formContainer.appendChild(authorDropdown);

        const questionLabel = document.createElement("label");
        questionLabel.innerHTML = "Question";
        this.formContainer.appendChild(questionLabel);

        const questionText = document.createElement("textarea");
        questionText.className = "question-text";
        questionText.placeholder = "Maximum 100 characters";
        questionText.maxLength = 100;
       // questionText.addEventListener("input", this.switchFormMode);
        questionText.addEventListener("change", this.switchFormMode);
        this.formContainer.appendChild(questionText);

        
      

        const answerLabel = document.createElement("label");
        answerLabel.innerHTML = "Answer";
       
        this.formContainer.appendChild(answerLabel);

        const answerText = document.createElement("textarea");
        answerText.className = "answer-text"
        answerText.placeholder = "Maximum 100 characters";
        answerText.maxLength = 100;
        this.formContainer.appendChild(answerText);

       
        const saveButton = document.createElement("button");
        saveButton.innerHTML = "SAVE";
        saveButton.onclick = (ev)=>{
            if(answerText.value && questionText.value)
            {
                this.createOrModifyCard();
            }
            else
            {
                alert("question or answer can't be empty!");
            }
        };
        this.formContainer.appendChild(saveButton);

        const newButton = document.createElement("button");
        newButton.innerHTML = "NEW";
        newButton.onclick= (ev)=>{
            authorDropdown.style.display = "initial";
            questionText.value = "";
            authorLabel.display = "initial";
            answerText.value = "";
        }
        this.formContainer.appendChild(newButton);

    }

    switchFormMode(){
     
     
            
    }

    createOrModifyCard(){
        

        const questionText = this.formContainer.querySelector(".question-text");
   
        
        const authorDropdown = this.formContainer.querySelector(".author-dropdown-list");

        const answerText = this.formContainer.querySelector(".answer-text");
  
        
        this.question = questionText.value ;
        this.answer = answerText.value ;

        const elementIndex = this.topic.flashCardArray.findIndex(looper => looper.question === questionText.value );
        const cardContainer = this.formContainer.parentNode.querySelector(".cards-container");

       
        if(elementIndex < 0){ //we are adding new card
        
           
            this.topic.addCardFromScratch(this.question, this.answer, authorDropdown.options[authorDropdown.selectedIndex].value);

            fetch("https://localhost:5001/Cards/WriteCard/" + this.topic.topicName, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "question": this.question,
                    "answer": this.answer  ,
                    "author": {
                        "name": authorDropdown.options[authorDropdown.selectedIndex].value
                      }                   
                  })
            });

           
        }
        else{ // we are updating existing card
          
            this.topic.flashCardArray[elementIndex].answer = questionText.value;
            const cardList = cardContainer.querySelectorAll(".flash-card");
           
            const outdatedAnswer = cardList[elementIndex].querySelector(".card-answer");
            outdatedAnswer.innerHTML = this.answer;

            fetch("https://localhost:5001/Cards/ModifyCard/" + this.topic.topicName, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "question": this.question,
                    "answer": this.answer
                  })
            });
        }
     
    }
}