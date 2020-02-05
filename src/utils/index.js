export const getNameInitials = (user) => {
    if (!user) {
        return 'NO';
    }
    const firstName = ''
    const lastName = ''
    const username = ''
    const displayName = user.displayName

    if (firstName && lastName) {
        return firstName.charAt(0) + lastName.charAt(0);
    } else if (firstName) {
        return firstName.charAt(0)
    } else if (lastName) {
        return lastName.charAt(0);
    } else if (username) {
        return username.charAt(0);
    } else if (displayName) {
        return displayName.charAt(0);
    } else {
        return 'NN';
    }
};
