class Chatbox {
    constructor() {
        this.args = {
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.getElementById('btn-0'),
            partyButton: document.getElementById('btn-1'),
            singButton: document.getElementById('btn-2'),
            thirdButton: document.getElementById('btn-3'),
            fourthButton: document.getElementById('btn-4')
        };
		
        this.hasPartied = false;
        this.hasNothing = false;
        this.hasSung = false;

        this.missions = [
          "You need to fix the positronic ramscop so we can enter hyperspace again.",
          "Please hand me the Dyson spheere manipulator.",
          "The Shkadov replicant has escaped the ship. Find and eliminate it.",
          "Your mission is to remotely repair the Lofstrom loop in the cargo bay."
        ];

        this.messages = [];
    }

    display() {
        const {chatBox, sendButton, partyButton, singButton, thirdButton, fourthButton} = this.args;

		    this.howMayIHelp(chatBox);
		
        sendButton.addEventListener('click', () => this.onSendButton(chatBox));
        partyButton.addEventListener('click', () => this.party(chatBox));
        singButton.addEventListener('click', () => this.sing(chatBox));
        thirdButton.addEventListener('click', () => this.nothing(chatBox));
        fourthButton.addEventListener('click', () => this.mission(chatBox));

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox);
            }
        });
    }
	
   /**
    * @param {string} param
    * @return {number}
    */
    onSendButton(chatbox) {
        let textField = chatbox.querySelector('input');
        let text = textField.value.trim();

        if (text === "") return;
		
        // length of message must not exceed 35 characters
        if (text.length > 35){
          let response = { name: "Sam", message: "Your message is too long. I am NOT reading that!" };
          this.pushMessageToInterface(chatbox, response);
          textField.value = '';
          return;
		    }
		
        // check for cross-site scripting
        let xss =["<", "script", "http", "%"];
        if (xss.some(el => text.toLowerCase().includes(el))){
          let response = { name: "Sam", message: "Tricky tricky... ;)" };
          this.pushMessageToInterface(chatbox, response);
          textField.value = '';
          return;
        }

        let user_message = { name: "User", message: text};
        this.pushMessageToInterface(chatbox, user_message);
        this.getResponse(chatbox, textField, text);
    }

    pushMessageToInterface(chatbox, message){
      this.messages.push(message);
      this.updateChatText(chatbox);
    }
	
	  howMayIHelp(chatbox){
        let messagText = "I am an ultra intelligent AI operator trained through state-of-the-art machine learning. Feel free to ask me anything!"
        let message = { name: "Sam", message: messagText };
        this.messages.push(message);
        let html = '<div class="messages__item messages__item--visitor">' + messagText + '</div>';
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
	  }
	
    party(chatbox){
        if (!this.hasPartied){
            this.hasPartied = true;
            let response = { name: "Sam", message: "You gotta make do... :/"};
            this.pushMessageToInterface(chatbox, response);
        }
    }
	
	sing(chatbox){
		  if (!this.hasSung){
			    this.hasSung = true;
			    let audio = new Audio('static/audio/Lacrimosa.mp3');
			    audio.play();
          let response = { name: "Sam", message: "Ohh no.... you can't actually stop the chatbot from singing once you start it. So good luck!"};
          this.pushMessageToInterface(chatbox, response);
		  }
	}
	
	nothing(chatbox){
		  if (!this.hasNothing){
			    this.hasNothing = true;
          let response = { name: "Sam", message: "This button doesn't actually do anything. But 3 buttons felt like too little."};
          this.pushMessageToInterface(chatbox, response);
		}
	}
	
	mission(chatbox){
	    let response_text;
		  if (this.missions == null){
			    return;
		  } else if (this.missions.length == 0){
          response_text = "Please finish your current missions.";
			    this.missions = null;
		  } else if (this.missions.length == 1) {
          response_text = this.missions[0];
			    this.missions = [];
		  } else {
			    let mission_nr = Math.floor(Math.random() * this.missions.length);
			    response_text = this.missions[mission_nr];
			    this.missions.splice(mission_nr, 1);
		  }
		
		  let resonse = { name: "Sam", message: response_text };
		  this.messages.push(resonse);
		  this.updateChatText(chatbox);
	}
	
	getResponse(chatbox, textField, text){
	    fetch('http://127.0.0.1:5000/predict', {
          method: 'POST',
          body: JSON.stringify({ message: text }),
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json'
          },
      })
      .then(r => r.json())
      .then(r => {
          let messageText = r.answer.split("$");
          let message = { name: "Sam", message: messageText[0]};
          this.messages.push(message);
          this.updateChatText(chatbox);
          textField.value = '';
      }).catch((error) => {
          console.error('Error:', error);
          textField.value = '';
      });
	}

  updateChatText(chatbox) {
      let html = '';
      this.messages.slice().reverse().forEach(function(item, index) {
          if (item.name === "Sam")	
              html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
          else
              html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
      });

      const chatmessage = chatbox.querySelector('.chatbox__messages');
      chatmessage.innerHTML = html;
  }
}

var chatbox = new Chatbox();
chatbox.display();

// A list of all possible colors
const COLORS = ["red", "blue", "green", "yellow", "pink", "purple"];
// Defines the particle number
const PARTICLES_NUMBER = 50;

function createParticle(x, y) {
  const element = document.createElement("div");
  element.style.width = "30px";
  element.style.height = "30px";
  element.style.border = "1px solid black";
  // The elements are in absolute position
  element.style.position = "absolute";
  element.style.top = `${y}px`;
  element.style.left = `${x}px`;
  // We want our cursor to be centered in the square
  element.style.transform = "translate(-50%, -50%)";
  // Get a color randomly
  element.style.backgroundColor =
    COLORS[Math.floor(Math.random() * COLORS.length)];

  const animation = element.animate(
    [
      {
        // Math.random() - 0.5 returns integer between -0.5 and 0.5
        transform: `translate(${(Math.random() - 0.5) * 500}px, ${
          (Math.random() - 0.5) * 500
        }px) rotate(${Math.random() * 520}deg)`,
        // We want to reduce the opacity until 0
        opacity: 0
      }
    ],
    1500
  );

  // Remove the particle at the end of animation
  animation.finished.then(() => element.remove());
  document.body.appendChild(element);
}

document.getElementById('btn-1').addEventListener("click", (e) => {
  // Get the position of the cursor in the document
  const { clientX: x, clientY: y } = e;

  // Create multiple particles
  for (let i = 0; i < PARTICLES_NUMBER; i++) {
    createParticle(x, y);
  }
});
























































