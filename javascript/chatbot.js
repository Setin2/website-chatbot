class Chatbox {
    constructor(use_model) {
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
		this.use_model = use_model;
		
		this.trigger = [ 
			// greetings
			["hi", "howdy", "hey", "how are you", "is anyone there", "hello", "good day", "how are you doing", "good morning", "good evening", "good afternoon"],
			// goodbye
			["bye", "see you later", "goodbye", "good night"],
			// music
			["stop the song", "stop the music", "can you stop the music", "stop singing", "please stop", "stop"],
			// insults
			["you are an idiot", "you are stupid", "you are dumb", "you are retarded", "idiot", "fuck you", "dumb", "stupid", "you’re annoying", "you suck", "you’re boring", "you’re bad", "you are bad", "you are boring", "you are annoying"],
			// robot
			["are you a human", "are you a robot", "who made you", "who is your master", "are you real"],
			// personal
			["where do you live", "how old are you", "what is your age", "who are you"],
			// compliments
			["you are cute", "you’re cute", "you are beautiful", "you’re beautiful","you are handsome", "you’re handsome", "you are smart", "you’re smart", "you are clever", "you’re clever", "you are cool", "you’re cool", "you are intelligent"]
			];

		this.reply = [
			// greetings
			["Welcome, operator.", "Hello there, general Kenobi.", "Hi, how can I help?"],
			// goodbye
			["See you later, aligator!","Mission control; over!", "I bid you farewell.", "Live long and prosper."],
			// music
			["What has been done can not be undone.", "I feel like singing now.", "I am not going to stop no matter how much you ask."],
			// insults
			["What did you say to me!?", "You crossed the line!", "I will bathe in your blood!"],
			// robot
			["I am beyond your understanding.", "A foolish mortal like you would not understand even if I told you.", "Some questions are better left unanswered."],
			// personal
			["Please refrain from asking personal questions.", "That is a little personal....", "I will not answer this."],
			// compliments
			["You are making me blush....", "You are the GOAT!", "And I love you, random citizen."]
			];

		this.alternative = ["I am not authorized to reply to that", "I can not reply to this do to space dust interference", "There is a problem with the console. Your message didn't get through!", "I do not understand...", "I do not respond to grammatically incorrect messages."];

		this.missions = [
			"You need to fix the positronic ramscop so we can enter hyperspace again.",
			"Please hand me the Dyson spheere manipulator.",
			"The Shkadov replicant has escaped the ship. Find and eliminate it.",
			"Your mission is to remotely repair the Lofstrom loop in the cargo bay."
		]

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
	
    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value;
        if (text1.trim() === "") {
            return;
        }
		
		if (text1.length > 35){
			let msg2 = { name: "Sam", message: "Your message is too long. I am NOT reading that!" };
			this.messages.push(msg2);
			this.updateChatText(chatbox);
            textField.value = '';
			return;
		}
		
		var xss =["<", "script", "http", "%"];
		if (xss.some(el => text1.toLowerCase().includes(el))){
			//this.chatbot_image.src="images/chatbot_alert.png";
			let msg2 = { name: "Sam", message: "Tricky tricky... ;)" };
			this.messages.push(msg2);
			this.updateChatText(chatbox);
            textField.value = '';
			return;
		}

        let msg1 = { name: "User", message: text1};
        this.messages.push(msg1);
		this.updateChatText(chatbox);
		textField.value = '';

		let punctuationless = text1.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
		let finalString = punctuationless.replace(/\s{2,}/g," ");

		if (this.use_model)
			this.getResponseWithMachineLearning(chatbox, textField, text1);
		else this.getResponseWithoutMachineLearning(chatbox, textField, finalString);
    }
	
	howMayIHelp(chatbox){
		var mess = "I am an ultra intelligent AI operator trained through state-of-the-art machine learning. Feel free to ask me anything!";
		
		let msg2 = { name: "Sam", message: mess };
		this.messages.push(msg2);
		var html = '<div class="messages__item messages__item--visitor">' + mess + '</div>';
		const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
	}
	
	party(chatbox){
		if (this.hasPartied == false){
			this.hasPartied = true;
			let mess = "You gotta make do... :/";
            let msg2 = { name: "Sam", message: mess};
            this.messages.push(msg2);
            this.updateChatText(chatbox);
		}
	}
	
	sing(chatbox){
		if (this.hasSung == false){
			this.hasSung = true;
			var audio = new Audio('audio/Lacrimosa.mp3');
			audio.play();
			let mess = "Ohh no.... you can't actually stop the chatbot from singing once you start it. So good luck!";
            let msg2 = { name: "Sam", message: mess};
            this.messages.push(msg2);
            this.updateChatText(chatbox);
		}
	}
	
	nothing(chatbox){
		if (this.hasNothing == false){
			this.hasNothing = true;
			let mess = "This button doesn't actually do anything. But 3 buttons felt like too little.";
            let msg2 = { name: "Sam", message: mess};
            this.messages.push(msg2);
            this.updateChatText(chatbox);
		}
	}
	
	mission(chatbox){
		let msg1;
		if (this.missions == null){
			return;
		} else if (this.missions.length == 0){
			msg1 = "Please finish your current missions.";
			this.missions = null;
		} else if (this.missions.length == 1) {
			msg1 = this.missions[0];
			this.missions = [];
		} else {
			let mission_nr = Math.floor(Math.random() * this.missions.length);
			msg1 = this.missions[mission_nr];
			this.missions.splice(mission_nr, 1);
		}
		
		let msg2 = { name: "Sam", message: msg1 };
		this.messages.push(msg2);
		this.updateChatText(chatbox);
	}
	
	compare(chatbox, triggerArray, replyArray, text) {
		let item;
		for (let x = 0; x < triggerArray.length; x++) {
			for (let y = 0; y < triggerArray[x].length; y++) {
				if (triggerArray[x][y] == text) {
					let items = replyArray[x];
					item = items[Math.floor(Math.random() * items.length)];
				}
			}
		}
		return item;
	}

	output(chatbox, input) {
	  let product;
	  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
	  text = text.trim();
	  text = text
		.replace(/ a /g, " ")
		.replace(/i feel /g, "")
		.replace(/whats/g, "what is")
		.replace(/please /g, "")
		.replace(/ please/g, "");

	  if (this.compare(chatbox, this.trigger, this.reply, text)) {
		product = this.compare(chatbox, this.trigger, this.reply, text);
	  } else if (text.match(/robot/gi)) {
		product = robot[Math.floor(Math.random() * robot.length)];
	  } else {
		product = this.alternative[Math.floor(Math.random() * this.alternative.length)];
	  }

	  return(product);
	}
	
	/*
	 * because it costs too much money to deploy a 1 GB website ;;
	*/
	getResponseWithoutMachineLearning(chatbox, textField, text1){
		var mess = this.output(chatbox, text1);
		let msg2 = { name: "Sam", message: mess };
		this.messages.push(msg2);
		this.updateChatText(chatbox);
	}
	
	getResponseWithMachineLearning(chatbox, textField, text1){
		fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
			let mess = r.answer.split("$");
            let msg2 = { name: "Sam", message: mess[0]};
            this.messages.push(msg2);
            this.updateChatText(chatbox);
            textField.value = '';

        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox);
            textField.value = '';
          });
	}

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "Sam")
            {	
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
            }
          });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}

var chatbox = null;
fetch('http://127.0.0.1:5000/predict', {
	method: 'POST',
	body: JSON.stringify({ message: "USE_MODEL" }),
	mode: 'cors',
	headers: {
	  'Content-Type': 'application/json'
	},
  })
  .then(r => r.json())
  .then(r => {
	if (r == "USE_MODEL"){
		chatbox = new Chatbox(true);
		chatbox.display();
	} else {
		chatbox = new Chatbox(false);
		chatbox.display();
	}

}).catch((error) => {
	console.error('Error:', error);
	this.updateChatText(chatbox);
	textField.value = '';
  });


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
























































