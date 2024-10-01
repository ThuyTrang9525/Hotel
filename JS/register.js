function togglePassword(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const eyeIcon = document.getElementById(`eye-icon-${fieldId}`);
    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.setAttribute("name", "eye-off-outline");
    } else {
        passwordField.type = "password";
        eyeIcon.setAttribute("name", "eye-outline");
    }
}