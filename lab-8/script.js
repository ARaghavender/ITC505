document.addEventListener('DOMContentLoaded', function() {
    // Function to escape HTML characters to prevent XSS
    function avoidFromHtmlInputs(input) {
        return input
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    // Function to escape SQL characters to prevent SQL Injection
    function preventSqlInput(input) {
        return input.replace(/'/g, "''").replace(/\\/g, "\\\\");
    }

    // Function to validate the form
    function validateForm() {
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();
        const textarea = document.getElementById('qualifications').value.trim();
        const dateOfBirth = document.getElementById('dob').value.trim();

        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check if fields are empty (only required fields)
        if (firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '') {
            alert('Please fill out all required fields.');
            return false;
        }

        // Validate email format
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return false;
        }

        // Sanitize inputs
        const sanitizedFirstName = avoidFromHtmlInputs(firstName);
        const sanitizedLastName = avoidFromHtmlInputs(lastName);
        const sanitizedEmail = avoidFromHtmlInputs(email);
        const sanitizedPassword = preventSqlInput(password); // SQL injection prevention
        const sanitizedConfirmPassword = preventSqlInput(confirmPassword); // SQL injection prevention
        const sanitizedTextarea = avoidFromHtmlInputs(textarea);

        // Show success message in a modal
        const modal = document.getElementById('success-modal');
        const closeButton = document.querySelector('.close-button');
        
        modal.style.display = 'block';

        closeButton.onclick = function() {
            modal.style.display = 'none';
            setTimeout(() => {
                window.location.reload(); // Reload the page after closing the modal
            }, 100); // Small delay to ensure the modal is hidden first
        };

        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                setTimeout(() => {
                    window.location.reload(); // Reload the page after clicking outside the modal
                }, 100); // Small delay to ensure the modal is hidden first
            }
        };

        // Log sanitized inputs for demonstration
        console.log({
            firstName: sanitizedFirstName,
            lastName: sanitizedLastName,
            email: sanitizedEmail,
            password: sanitizedPassword,
            confirmPassword: sanitizedConfirmPassword,
            textarea: sanitizedTextarea,
            dateOfBirth: dateOfBirth
        });

        // Prevent form from submitting to see the modal
        return false; // Set to true if you want to submit the form data to a server
    }

    // Attach the validation function to the form submit event
    document.getElementById('registration-form').addEventListener('submit', function(event) {
        if (!validateForm()) {
            event.preventDefault(); // Prevent form from submitting if validation fails
        }
    });
});
