
//Write a program to calculate the sum of the first 10 natural numbers using a while loop. 
let sum = 0;
let i = 1;
while(sum <=10)
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