export {};

//1. Check if a character is uppercase.

let value = "A"
    if(value >= 'A' && value <= 'Z')
    {
        console.log(`${value} is a uppercase letter`);
    }

//2. Check if a number is a multiple of 10.

let num = 100;
if(num %10 === 0)
{
    console.log(`${num} is a multiple of 10`);
}

//If else condition:
//3. Check if a person is a teenager (age between 13 and 19).
let age = 25;
if(age >= 13 && age <= 19)
{
    console.log(`The person age is ${age} he is a teenager`)
}
else
{
    console.log(`The person age is ${age} he is not a bloody teenager`)
}

//4. Compare two numbers and print the larger one
let num1 = 69;
let num2 = 169;
if(num1 > num2)
{
    console.log(`${num1} is the largest number`);
}
else{
    console.log(`${num2} is the largest number`);
}

//5. Check if a number is positive, negative, or zero.
let number = 0;
if(number > 0)
{
    console.log(`${number} is a positive number`);
}
else if(number < 0){
    console.log(`${number} is a negative number`);
}
else{
    console.log(`${number} is a ZERO`);
}

//6. Check if a person is eligible for a senior citizen discount (age >= 60).
let age1 = 59;
if(age1 >= 60){
    console.log(`your are is ${age1} you are eligible for senior citizen discount`);
}
else
{
    console.log(`your age is ${age1} you are not above 60 so not elegible`);
}

//Nested if else:
//7. Check if a number is positive and even.
let num5 = -69;
if(num5 > 0){
    if(num5 %2 === 0)
    {
        console.log(`${num5} is positive and even`);
    }
    else{
        console.log(`${num5} is positive but odd number`);
    }
}else{
    console.log(`${num5} is a negative number`);
}

//8. Check if a character is an uppercase vowel.
let ch = 'Z';
if(ch >= 'A' && ch <= 'Z'){
    if(ch === 'A' || ch === 'E' || ch === 'I' || ch === 'O' || ch === 'U'){
        console.log(`${ch} is a uppercase vowel`);
    }
    else{
        console.log(`${ch} is not a uppercase vowel`);
    }
}else{
    console.log(`${ch} is not an uppercase character`);
}

//9. Find the largest of three numbers.
let a = 30;
let b = 40;
let c = 69;
if(a >= b && a >= c)
{
    console.log(`${a} is the greatest number`);
}
else if(b >= a && b >= c){
    console.log(`${b} is the greatest number`);
}
else{
    console.log(`${c} is the greatest number`);
}

//10. Check if a number is a multiple of both 5 and 10.
let num3 = 99;
if(num3 % 5 === 0){
    if(num3 % 10 === 0){
        console.log(`${num3} is multiple of both 5 and 10`);
    }
    else{
        console.log(`${num3} is not multiple of both 5 and 10`);
    }
} else {
    console.log(`${num3} is not a multiple of both 5 and 10`);
}

//11. Check if a character is a vowel or consonant.
let ch3 = 'Z';
if(ch3 === 'a' || ch3 === 'e' || ch3 === 'i' || ch3 === 'o' || ch3 === 'u'){
    console.log(`${ch3} is a vowel`);
}
else if(ch3 === 'A' || ch3 === 'E' || ch3 === 'I' || ch3 === 'O' || ch3 === 'U'){
    console.log(`${ch3} is a vowel`);
}else{
    console.log(`${ch3} is a consonant`);
}

//12. Check if a number is divisible by both 2 and 3.
let num6 = 79;
if(num6 % 2 === 0){
    if(num6 %3 === 0){
        console.log(`${num6} is divisible by both 2 and 3`);
    }
    else{
        console.log(`${num6} is divisible by 2 and not by 3`);
    }
}else{
    if(num6 % 3 === 0){
        console.log(`${num6} is divisible by both 3 and not by 2`);
    }
    else{
        console.log(`${num6} is not divisible by both 2 and 3`);
    }
}

//Switch case:
//13. Print the corresponding month name for a given month number.

