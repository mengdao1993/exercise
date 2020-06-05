var age = 10; // 40
var person = {
    age: 20,
    getAge() {
        var age = 30; 
        return this.age;
    },
};
function getAge2() {
    this.age = 40; 
    console.log(person.getAge()); // 20
};
getAge2();
console.log(age); // 40
function getAge3() {
    this.age = 50;
    this.getAge4 = () => {
        console.log('----', this)
        console.log(person.getAge.call(this));
    }
}// {age: 50, getAge4}
new getAge3().getAge4(); // 50
console.log(age); // 40
function getAge4() {
    this.age = 60;
    this.getAge5 = () => {
        console.log(person.getAge.call(this));
    }
} // {age: 60, getAge5}
new getAge4().getAge5(); // 60
console.log(age); // 40
var age2 = 10;
var person2 = {
    age2: 20,
    getAge2: () => { 
        var age2 = 30; 
        return this.age2; 
    },
};
console.log(person2.getAge2.call()); // 10
console.log(person2.getAge2.call(person2)); // 20
