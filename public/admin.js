//Buttons
let addButton = document.querySelector('#add-book')
let deleteButton = document.querySelector('#delete-book')

//List books
async function renderBooks() {
    
    let response = await fetch('http://localhost:3001/listBooks');
    let data = await response.json();
    let list = document.querySelector('#book-list');
    let newHTML = '<ul>';
    data.forEach(book => {
        newHTML += `<li>${book.id}: ${book.title} (${book.year}) </li>`
    })
    
    newHTML += '</ul>'
    list.innerHTML = newHTML;
    
}
    

//Add a book 
addButton.addEventListener('click', async () => {

    let id = await assignedId();

    let dateToSend = {
        id: id,
        title: document.querySelector('#add-title').value,
        year: document.querySelector('#add-year').value,
        description: document.querySelector('#add-description').value,
        quantity: document.querySelector('#add-quantity').value,
        imageURL: document.querySelector('#add-imageURL').value,
    }
    
    await fetch('http://localhost:3001/addBook', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
                },
        body: JSON.stringify(dateToSend)     
    })

    document.querySelector('#add-title').value = '';
    document.querySelector('#add-year').value = '';
    document.querySelector('#add-description').value = '';
    document.querySelector('#add-quantity').value = '';
    document.querySelector('#add-imageURL').value = '';
      

    await renderBooks();
})


//Delete a book
deleteButton.addEventListener('click', async () => {

    let bookId = document.querySelector('#delete-id').value;

    await fetch(`http://localhost:3001/removeBook/${bookId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    document.querySelector('#delete-id').value = '';
    
    await renderBooks();


})

renderBooks();