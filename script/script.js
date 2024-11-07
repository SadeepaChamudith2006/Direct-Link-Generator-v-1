async function generateLink() {
    const fileInput = document.getElementById('photoUpload');
    const file = fileInput.files[0];
    const apiKey = '2567d8d22a747c447cf6ebe0743e16ae';  // Replace with your ImgBB API key

    if (!file) {
        alert('Please select an image file.');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    const loadingSpinner = document.getElementById('loadingSpinner');
    const linkBox = document.getElementById('linkBox');
    const photoLinkInput = document.getElementById('photoLink');

    // Show loading spinner and hide previous link box
    loadingSpinner.style.display = 'block';
    linkBox.style.display = 'none';

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if (data.success) {
            const photoLink = data.data.url;
            photoLinkInput.value = photoLink;
            linkBox.style.display = 'block';
        } else {
            alert('Upload failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while uploading.');
    } finally {
        // Hide loading spinner once request completes
        loadingSpinner.style.display = 'none';
    }
}

function copyLink() {
    const photoLinkInput = document.getElementById('photoLink');
    photoLinkInput.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
}

function viewImage() {
    const photoLink = document.getElementById('photoLink').value;
    if (photoLink) {
        window.open(photoLink, '_blank');
    } else {
        alert('No link available. Please upload an image first.');
    }
}