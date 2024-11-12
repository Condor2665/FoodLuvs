const dropArea = document.getElementById('dropArea');

// Prevent default behavior (Prevent file from being opened)
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

// Get the save button element
const saveButton = document.getElementById('saveButton');
const confirmationModal = document.getElementById('confirmationModal');
const closeButton = document.querySelector('.close-button');
const confirmButton = document.getElementById('confirmButton');
const cancelButton = document.getElementById('cancelButton');

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

// Remove highlight when item is no longer dragging over
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

// Handle drop event
dropArea.addEventListener('drop', handleDrop, false);

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight() {
    dropArea.classList.add('highlight');
}

function unhighlight() {
    dropArea.classList.remove('highlight');
}

function handleDrop(e) {
    const data = e.dataTransfer.getData('text/plain');
    const draggableElement = document.querySelector(`[data-id='${data}']`);
    dropArea.appendChild(draggableElement);
}

// Make items draggable
document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', dragStart, false);
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', this.dataset.id);
}

// Add click event listener to the save button
saveButton.addEventListener('click', () => {
    confirmationModal.style.display = 'block';
});

// Add click event listener to the close button
closeButton.addEventListener('click', () => {
    confirmationModal.style.display = 'none';
});

// Add click event listener to the cancel button
cancelButton.addEventListener('click', () => {
    confirmationModal.style.display = 'none';
});

// Add click event listener to the confirm button
confirmButton.addEventListener('click', () => {
    confirmationModal.style.display = 'none';
    handleSave();
});

// Define the handleSave function
function handleSave() {
    // localStorage.setItem('items', dropArea.innerHTML); need to fix when variable/object created for schedule
    console.log('Save button clicked');
}

// Close the modal if the user clicks outside of it
window.addEventListener('click', (event) => {
    if (event.target == confirmationModal) {
        confirmationModal.style.display = 'none';
    }
});