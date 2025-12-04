const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

const testCases = [
    { password: 'password', expected: false, reason: 'Too short, no number, no special char' },
    { password: 'password1', expected: false, reason: 'No special char' },
    { password: 'password!', expected: false, reason: 'No number' },
    { password: 'pass', expected: false, reason: 'Too short' },
    { password: 'Password1!', expected: true, reason: 'Meets all criteria' },
    { password: 'strongPassword1@', expected: true, reason: 'Meets all criteria' },
    { password: '12345678!', expected: true, reason: 'Meets all criteria' }
];

console.log('--- Testing Password Validation Rules ---');
console.log('Regex:', passwordRegex);
console.log('-----------------------------------------');

testCases.forEach(({ password, expected, reason }) => {
    const isValid = passwordRegex.test(password);
    const result = isValid === expected ? 'PASS' : 'FAIL';
    console.log(`Password: "${password}" | Expected: ${expected} | Actual: ${isValid} | Result: ${result}`);
    if (result === 'FAIL') {
        console.log(`  -> Reason for test case: ${reason}`);
    }
});
