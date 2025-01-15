export function updateTitle() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const formTitle = document.getElementById('form-title');

    const title = titleInput.value || 'Untitled';
    const author = authorInput.value || 'Unknown';
    formTitle.textContent = `${title} by ${author}`;
}

// Function to initialize the title input event listeners
export function initTitleUpdate() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');

    titleInput.addEventListener('input', updateTitle);
    authorInput.addEventListener('input', updateTitle);
}

// Function to handle the minimize button
export function handleMinimize() {
    const minimizeBtn = document.getElementById('minimize-btn');
    const formContent = document.getElementById('form-content');
    let isMinimized = false;

    minimizeBtn.addEventListener('click', () => {
        isMinimized = !isMinimized;
        formContent.style.display = isMinimized ? 'none' : 'block';
    });
}