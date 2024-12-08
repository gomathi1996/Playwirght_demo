// *****************Variables***********************
let message1:String = "Hello"
message1 = "bye"

let age1:number = 20;

let flag1:boolean = true;

// let numbers1: Array<number> = [1,2,6,8];
let numbers1: number[] = [1,2,6,8];

let data:any = "Hello";
data = 12;

// *****************Functions***********************
function add1(a:number,b:number):number{
    return a+b;
}
add1(1,2);

// *****************Objects***********************
let person1: {
    name: string,
    age: number,
    location: string
} = {
    name: "John",
    age: 20,
    location: "USA"
}
person1.location = "Canada";

// *****************Classes***********************