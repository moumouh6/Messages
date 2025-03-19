// side barre

    // Fonction pour gérer l'affichage de la barre de navigation
function toggleNav() {
        document.getElementById("sidebar").classList.toggle("active"); // Ajouter ou supprimer la classe active
    }


 // Fonction pour gérer l'affichage des messages de chat et RH
const typeButtons = document.querySelectorAll("input[name='type']");
const chatMessagesContainer = document.getElementById("chat-message"); // Correction ici
const rhMessagesContainer = document.getElementById("rh-messages");

typeButtons.forEach(button => {
    button.addEventListener("change", function () {
        if (this.value === "RH") {
            chatMessagesContainer.style.display = "none";
            rhMessagesContainer.style.display = "block";
        } else {
            rhMessagesContainer.style.display = "none";
            chatMessagesContainer.style.display = "block";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const messagesContainer = document.querySelector(".chat-box");
    const chatHeader = document.querySelector(".chat-header .username");
    const chatAvatar = document.querySelector(".chat-header .avatar img");
    const recentMessages = document.querySelectorAll(".message.supconvo");
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");

    let activeContact = "Nesrine Fettal";
    let chatData = JSON.parse(localStorage.getItem("chatMessages")) || {};

    // Fonction pour charger les messages du contact actif
    function loadMessages() {
        messagesContainer.innerHTML = "";
        if (chatData[activeContact]) {
            chatData[activeContact].forEach(msg => {
                const messageDiv = document.createElement("div");
                messageDiv.classList.add("message", msg.sender === "me" ? "sent" : "received");
                messageDiv.innerHTML = `
                    <div class="message-content">
                        <span class="timestamp">${msg.time}</span>
                        <p class="msg-chat">${msg.text}</p>
                    </div>
                `;
                messagesContainer.appendChild(messageDiv);
            });
        }
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Quand on clique sur un message récent, changer le contact actif
    recentMessages.forEach(msg => {
        msg.addEventListener("click", function () {
            activeContact = this.dataset.name;
            chatHeader.innerText = activeContact;
            chatAvatar.src = this.dataset.avatar;
            loadMessages();
        });
    });

    // Envoi d'un message et stockage dans localStorage
    // Fonction d'envoi de message
   function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === "") return;

    const messageData = {
        text: messageText,
        sender: "me",
        time: new Date().toLocaleTimeString()
    };

    if (!chatData[activeContact]) {
        chatData[activeContact] = [];
    }
    chatData[activeContact].push(messageData);
    localStorage.setItem("chatMessages", JSON.stringify(chatData));

    messageInput.value = "";
    loadMessages();
}

    // Ajout de l'écouteur d'événement au bouton d'envoi
    sendButton.addEventListener("click", sendMessage);
    
    // Écouteur pour envoyer un message en appuyant sur "Enter"
   messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) { // Vérifie que la touche Enter est pressée sans Shift
        event.preventDefault(); // Empêche le saut de ligne
        sendMessage(); // Appelle la fonction pour envoyer le message
    }
   });




    loadMessages();
});

    
   


