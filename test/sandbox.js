const twoNumbers = (num1, num2) => {
    if (num1 && num2) {
        if (num1 === num2) {
        return 'two numbers are equal'
        } else if (num1 > num2) {
        return num1 - num2
        } else if (num1 < num2) {
        return num1 + num2
        }
    } 
    else {
    return 'missing numbers'
    }
}

module.exports = {
    twoNumbers
} 