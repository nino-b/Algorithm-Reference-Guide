/** 
 * # Problem
 * You hash a string of r characters into m slots by treating it as a radix-128 number and then using the division method. 
 * You can represent the number m as a 32-bit computer word, but the string of r characters, treated as a radix-128 number, takes many words. 
 * How can you apply the division method to compute the hash value of the character string without using more than a constant number of words 
 * of storage outside the string itself?
*/




/**
 * A function that generates a Hash Value.
 * A string parameter is converted into base-128 number.
 * In base-128 system, to shift one number to the left by one digit, we need to multiply the number by 128.
 * And then add ASCII value of the character.
 * To visualize, let's use base-10 example, number '459':
 * - '9' occupies the 'ones' place (10^0 = 1),
 * - '5' occupies the 'tens' place (10^1 = 10),
 * - '4' occupies the 'hundreds' place (10^2 = 100).
 * So, in decimal system each place value index is power of 10. And to shift to the next value, we need to multiply the number by 10.
 * Thus, in case of base-128 system, we need to multiply the number by 128.
 * Division by tableLength ensures that returned hash will not exceed 32-bit (because tableLength holds 32 bits as computer word).
 *
 * @param {string} string
 * @param {number} tableLength
 * @throws {Error} if input type is not a 'string', program will throw an error.
 * @return {number}
 */
function hash (string, tableLength) {
    if (typeof string !== 'string') throw new Error('Please enter a valid string!');
    if (typeof tableLength !== 'number') throw new Error('Please enter a valid number!');
    let hash = 0;

    for (let i = 0; i < string.length; i++) {
        hash = (hash * 128 + string.charCodeAt(i)) % tableLength;
    }
    return hash;
}

const arr = ['veryLongString789', 'alsoVeryLongString0', 'theLongestStringInThisArray99'];
const tableLength = 7;

arr.forEach(el => {
    console.log(hash(el, tableLength));
})