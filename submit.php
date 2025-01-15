<?php
// Sanitize form data
$title = isset($_POST['title']) ? htmlspecialchars($_POST['title']) : '';
$author = isset($_POST['author']) ? htmlspecialchars($_POST['author']) : '';
$message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : '';

// Google Apps Script Web App URL
$googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbw45dV1LFs9m8IkavrszfS30_90JGLrLHlgIz2j-2bLOP-MuPFBsJ8rhvR26rj7m9o1SA/exec';

// Prepare data to send
$data = array(
    'title' => $title,
    'author' => $author,
    'message' => $message
);

// Use cURL to send the data
$ch = curl_init($googleAppsScriptUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));

// Execute the cURL request
$response = curl_exec($ch);

// Check if cURL request was successful
if(curl_errno($ch)) {
    // Handle cURL errors
    echo 'Error with cURL request: ' . curl_error($ch);
} else {
    // Optionally, you could check for a successful response from the Google Apps Script
    if ($response) {
        echo "Form submitted successfully!";
    } else {
        echo "There was an issue submitting the form.";
    }
}

curl_close($ch);
?>
