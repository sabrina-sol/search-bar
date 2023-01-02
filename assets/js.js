function calculate_age(birthday) {
    let now = new Date();
    let birthday_date = new Date(birthday);
    // 2023 - 1994 = 29
    let age = now.getFullYear() - birthday_date.getFullYear();
    if (birthday_date.getMonth() > now.getMonth()) {
        age--
        return age.toString();
    } if (birthday_date.getMonth() == now.getMonth()) {
        if (birthday_date.getDay() > now.getDay()) {
            age--
            return age.toString();
        }
    }
    return age;
}

let age = calculate_age("1994-01-03");
console.log(age);