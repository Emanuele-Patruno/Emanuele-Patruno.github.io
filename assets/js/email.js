function sendMail() {
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        company: document.getElementById("company").value,
        message: document.getElementById("message").value,
    };

    const serviceID = "service_frpdiio";
    const templeateID = "template_r4n7jo8";

    emailjs.send(serviceID, templeateID, params)
        .then(
            res => {
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("company").value = "";
                document.getElementById("message").value = "";
                console.log(res);
                alert("Thank you for your message, I will contact you as soon as possible!")
            })
        .catch((err) => console.log(err));
}


