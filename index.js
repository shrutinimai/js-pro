const API_URL = 'https://crudcrud.com/api/21b2ddb854974903948c7f0c3a321fb5/bookings';  

function addBooking() {
    const userName = document.getElementById("userName").value.trim();
    const seatNumber = document.getElementById("seatNumber").value.trim();

    if (!userName || !seatNumber) {
        alert("Please enter both user name and seat number.");
        return;
    }

    fetch(API_URL, {
        method: 'POST',  
        headers: {
            'Content-Type': 'application/json',  
        },
        body: JSON.stringify({ userName, seat: seatNumber })  
    })
    .then(response => response.json())
    .then(data => {
        alert("Booking added!");
        updateDetails();  
    })
    .catch(error => alert("Error adding booking: " + error));

    document.getElementById("userName").value = "";
    document.getElementById("seatNumber").value = "";
}

function updateDetails() {
    fetch(API_URL)
        .then(response => response.json())  
        .then(bookings => {
            const detailsList = document.getElementById("detailsList");
            detailsList.innerHTML = "";  

            bookings.forEach(booking => {
                const listItem = document.createElement("li");
                listItem.innerHTML = "<b>" + booking.userName + "</b> " + "<b>" + booking.seat + "</b>";

                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.onclick = () => editBooking(booking._id);

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.onclick = () => deleteBooking(booking._id);

                listItem.appendChild(editButton);
                listItem.appendChild(deleteButton);
                detailsList.appendChild(listItem);
            });

            const totalBooked = bookings.length;
            document.querySelector("p").textContent = "Total Booked: " + totalBooked;
        })
        .catch(error => alert("Error fetching bookings: " + error));
}

function editBooking(id) {
    const newUserName = prompt("Enter new user name:");
    const newSeatNumber = prompt("Enter new seat number:");

    if (!newUserName || !newSeatNumber) {
        alert("Both fields are required to update.");
        return;
    }

    fetch(API_URL + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: newUserName, seat: newSeatNumber })
    })
    .then(response => response.json())  
    .then(updatedBooking => {
        alert("Booking updated!");
        updateDetails();  
    })
    .catch(error => alert("Error updating booking: " + error));
}

function deleteBooking(id) {
    fetch(API_URL + '/' + id, { method: 'DELETE' })  
        .then(() => {
            alert("Booking deleted!");
            updateDetails();  
        })
        .catch(error => alert("Error deleting booking: " + error));
}

function findSlot() {
    const seatNumber = document.getElementById("findSlot").value.trim();

    if (!seatNumber) {
        alert("Please enter a seat number to search.");
        return;
    }

    fetch(API_URL + '?seat=' + seatNumber)  
        .then(response => response.json()) 
        .then(bookings => {
            const detailsList = document.getElementById("detailsList");
            detailsList.innerHTML = ""; 

            const booking = bookings.find(b => b.seat === seatNumber);

            if (booking) {
                detailsList.innerHTML = "<b>" + booking.userName + "</b> " + "<b>" + booking.seat + "</b>";
            } else {
                detailsList.innerHTML = "<b>Seat " + seatNumber + " is Not Booked.</b>";
            }
        })
        .catch(error => alert("Error finding seat: " + error));
}
