const dropArea = document.getElementById('dropArea');

    // Prevent default behavior (Prevent file from being opened)
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

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

