export function handleFormSubmit() {
    document.getElementById('form-content').addEventListener('submit', async function (e) {
        e.preventDefault(); 

        const formData = new FormData(this);
        const data = {
            title: formData.get('title'),
            author: formData.get('author'),
            message: formData.get('message')
        };

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbzxt4Q4H-k1w2qhYAf0nbk9LJbQwx51pVGWbVrtpEacqonuIJdl139N_Ey-hauacgpwoQ/exec', {  // Replace with your deployed URL
                method: 'POST',
                body: new URLSearchParams(data),
            });

            if (response.ok) {
                alert('Form submitted successfully!');
            } else {
                alert('Error submitting form!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error with the submission.');
        }
    });
}

