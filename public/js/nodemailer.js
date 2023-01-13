document.querySelector('.google-email-send-btn').addEventListener("click", async (event) => {
    event.preventDefault();
    const { sender, receiver, subject, content } = event.target.parentNode.elements;

    const response = await fetch('/api/nodemailer/send', {
        method: 'POST',
        body: JSON.stringify({ sender: sender.value, receiver: receiver.value.split(","), subject:subject.value, content: content.value }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
          alert("Sent")

          // reset value in input elements
          receiver.value = '';
          subject.value = '';
          content.value ='';
      } else {
        alert('Failed');
      }
})

function senderFunc(event){
    event.preventDefault();
    console.log(event.target)
}