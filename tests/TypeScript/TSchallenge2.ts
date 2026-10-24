
//Write a program to calculate the sum of the first 10 natural numbers using a while loop. 
let sum = 0;
let i = 1;
while(i <=10)
{
    sum = sum + i;
    i = i + 1;
}
console.log('Sum of first 10 naturl numbers:', sum);

//Write a program to calculate the factorial of a given number using a while loop

let num: number = 10;
let fact: number = 1;
let j: number = num;
while(j > 1){
    fact = fact * j;
    j = j -1;
}
console.log("Factorial of", num, "is:", fact);

//Write a program to reverse a given number using a while loop.
let num1: number = 1234;
let rev: number = 0;
while(num1 > 0){
    let digit = num1 % 10;
    rev = rev * 10 + digit;
    num1 = Math.floor(num1/10);
}
console.log('Reversed number is:', rev);

//Write a program to check if a given number is a prime number using a while loop. 
let primeNumber: number = 29;
let isPrime: boolean = true;
let k = 2;
while(k*k <= primeNumber){
    if(primeNumber%2 === 0){
        isPrime = false;
        break;
    }
    k = k+1;
}
console.log(primeNumber, "is", isPrime ? " a prime number": "not a prime number");

//Write a program to find the largest digit in a given number using a while loop. 
let numberTocheck: number = 3456789;
let largestNumber: number = 0;
while(numberTocheck > 0){
    let digit: number = numberTocheck % 10;
    if(digit > largestNumber){
        largestNumber = digit;
    }
    numberTocheck = Math.floor(numberTocheck/10);
}
console.log("largest Digit is:", largestNumber);

//Write a program to check if a given number is a palindrome using a while loop. 
let numberToreverse: number = 34567;
let rev1 = 0;
let originalNumber:number = numberToreverse;
while(numberToreverse > 0){
    let digit = numberToreverse % 10;
    rev1 = rev1 * 10 + digit;
    numberToreverse = Math.floor(numberToreverse/10);
}
console.log("reversed number is:", rev1);
if(rev1 === originalNumber){
    console.log(originalNumber, "is a palindrome");
}else{
    console.log(originalNumber, "is not a bloody palindrome");
}

//Find duplicate values in an array.
const productIds: number[] = [101, 102, 103, 101, 104, 102, 105, 101];

for (let i = 0; i < productIds.length; i++){
    let count = 0;
for(let j=0; j< productIds.length; j++){
    if(productIds[i] === productIds[j]){
        count++;
    }
}
    if(count > 1){
        console.log(productIds[i], 'occurs', count, 'times');
    }
}

//Find the largest number in an array.
const numbers: number[] = [12, 45, 7, 89, 23, 56];
let largest = 0;
for(let i=0; i<numbers.length; i++){
    if(largest < numbers[i]){
        largest = numbers[i];
    }
}
console.log("Largest number is: ", largest);

//Find the smallest number in an array.
const numbers1: number[] = [34, 12, 67, 5, 29, 18];
let smallest = numbers1[0];
for(let i=1; i<numbers1.length; i++){
    if(smallest > numbers1[i]){
        smallest = numbers1[i];
    }
}
console.log("Smallest Number is: ", smallest);

//Write a program to count how many numbers are greater than or equal to 60
const scores: number[] = [45, 80, 32, 90, 67, 80, 55];
let count = 0;
for(let i=0; i<scores.length; i++){
    if(scores[i] >= 60){
        count++
    }
}
console.log('Number of passing scores:', count);

