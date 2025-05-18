document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordToggles = document.querySelectorAll('.password-toggle');

    // Password toggle functionality
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // Real-time validation for password match
    confirmPasswordInput.addEventListener('input', function() {
        if (passwordInput.value !== this.value) {
            this.classList.add('input-error');
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        } else {
            this.classList.remove('input-error');
            document.getElementById('confirmPasswordError').textContent = '';
        }
    });

    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Reset all error states
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.classList.remove('input-error');
        });
        
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.textContent = '';
        });

        // Get form values
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const gender = document.querySelector('input[name="gender"]:checked');
        const dob = document.getElementById('dob').value;
        const phone = document.getElementById('phone').value.trim();
        const country = document.getElementById('country').value;
        const terms = document.getElementById('terms').checked;
        
        let isValid = true;

        // Validate Full Name
        if (!fullName) {
            document.getElementById('fullName').classList.add('input-error');
            document.getElementById('fullNameError').textContent = 'Full Name is required';
            isValid = false;
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            document.getElementById('email').classList.add('input-error');
            document.getElementById('emailError').textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            document.getElementById('email').classList.add('input-error');
            document.getElementById('emailError').textContent = 'Please enter a valid email';
            isValid = false;
        }

        // Validate Password
        if (!password) {
            passwordInput.classList.add('input-error');
            document.getElementById('passwordError').textContent = 'Password is required';
            isValid = false;
        } else if (password.length < 8) {
            passwordInput.classList.add('input-error');
            document.getElementById('passwordError').textContent = 'Password must be at least 8 characters';
            isValid = false;
        }

        // Validate Confirm Password
        if (!confirmPassword) {
            confirmPasswordInput.classList.add('input-error');
            document.getElementById('confirmPasswordError').textContent = 'Please confirm your password';
            isValid = false;
        } else if (password !== confirmPassword) {
            confirmPasswordInput.classList.add('input-error');
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
            isValid = false;
        }

        // Validate Gender
        if (!gender) {
            document.getElementById('genderError').textContent = 'Please select your gender';
            isValid = false;
        }

        // Validate Date of Birth
        if (!dob) {
            document.getElementById('dob').classList.add('input-error');
            document.getElementById('dobError').textContent = 'Date of Birth is required';
            isValid = false;
        }

        // Validate Phone Number
        const phoneRegex = /^\d{10}$/;
        if (!phone) {
            document.getElementById('phone').classList.add('input-error');
            document.getElementById('phoneError').textContent = 'Phone Number is required';
            isValid = false;
        } else if (!phoneRegex.test(phone)) {
            document.getElementById('phone').classList.add('input-error');
            document.getElementById('phoneError').textContent = 'Please enter a valid 10-digit phone number';
            isValid = false;
        }

        // Validate Country
        if (!country) {
            document.getElementById('country').classList.add('input-error');
            document.getElementById('countryError').textContent = 'Please select your country';
            isValid = false;
        }

        // Validate Terms and Conditions
        if (!terms) {
            document.getElementById('termsError').textContent = 'You must agree to the Terms and Conditions';
            isValid = false;
        }

        // If form is valid, show success and reset
        if (isValid) {
            // Show success animation
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-check"></i>';
            submitBtn.style.backgroundColor = 'var(--success-color)';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<span class="btn-text">Registration Successful!</span>';
                submitBtn.style.pointerEvents = 'none';
                
                // In a real application, you would submit the form here
                // form.submit();
                
                // Reset form after 2 seconds (for demo purposes)
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = '<span class="btn-text">Register Now</span><i class="fas fa-arrow-right btn-icon"></i>';
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.pointerEvents = '';
                    
                    // Reset floating labels
                    document.querySelectorAll('.floating-label input').forEach(input => {
                        input.nextElementSibling.style.transform = '';
                    });
                }, 2000);
            }, 500);
        }
    });

    // Add focus effects for better UX
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('label').style.color = 'var(--primary-color)';
            if (this.parentElement.querySelector('.input-icon')) {
                this.parentElement.querySelector('.input-icon').style.color = 'var(--primary-color)';
            }
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.querySelector('label').style.color = '';
            if (this.parentElement.querySelector('.input-icon')) {
                this.parentElement.querySelector('.input-icon').style.color = '';
            }
        });
    });
});