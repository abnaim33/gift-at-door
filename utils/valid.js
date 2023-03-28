const valid = (name, email, pass, confirm_pass) => {
    if (!name || !email || !pass) return "Please add all fields"

    if (!validateEmail(email)) return 'Invalid email.'

    if (pass.length < 8) return 'Password must be at least 8 characters'

    if (pass != confirm_pass) return 'confirm password did not match'

}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export default valid

