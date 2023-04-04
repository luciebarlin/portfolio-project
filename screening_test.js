var Person = function(firstName, lastName, dateOfBirth, measurements){
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.measurements = measurements;
    }

person = new Person("Wonder", "Woman", new Date(2017, 4, 15), { 
    weight: "58kg"
});
     
personClone = JSON.parse(JSON.stringify(person));

// which will evaluate to true?
// A: person.firstName === personClone.firstName
// B: person.measurements['weight'] === personClone.measurements['weight']
// C: person === personClone
// D: person.dateOfBirth.toDateString() === personClone.dateOfBirth.toDateString()
///////////////

function task(state) {

    return new Promise(function(resolve, reject) { 
        if (state) {
            resolve('success');
        }
            reject('error');  
    });
}
    
task(true).then(function(data) {
     console.log(data);
     return task(false);
}).catch(function(err) {
     console.log(err);
     return 'Caught-Error';
}).then(function(data) {
     console.log(data);
     return task(true);
}).catch(function(err) {
     console.log(err);
});

// what will the code output?
/////////////////


 //Code A

function fiveSecondWait(x) {  
    return new Promise(function (resolve) { 
        setTimeout(function () {
            resolve(x)

        }, 5000)

    })
}

async function adder(x) {
    const a = fiveSecondWait(2)
    const b = fiveSecondWait(3)
    return x + (await a) + (await b)
}

adder(1).then((value) => {
    console.log(value)
})
 
 //Code B
function fiveSecondWait(x) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(x)
        }, 5000)  
    })
}

async function adder(x) {
    const a = await fiveSecondWait(2)
    const b = await fiveSecondWait(3)
    return x + a + b
}

adder(1).then((value) => {
     console.log(value)
})

// A) Code A will print 6 after 5 seconds whereas Code B will print 6 after 10 seconds.
// B) Code A will print 6 after 10 seconds whereas Code B will print 6 after 5 seconds.
// C) Both codes will print 6 after 5 seconds.
// D) Both codes will print 6 after 10 seconds.
// E) None of these.


console.log(typeof blackwidow);
console.log(typeof wonderwoman);
function blackwidow(){}
var wonderwoman = function() {}

////////////////

const myPrecious = {
    firstName: "Joan",
    func: function() {
        const self = this;
        console.log("Name: " + this.firstName);
        console.log("Name: " + self.firstName);
        (function() {
            console.log("Name: " + this.firstName); 
            console.log("Name: " + self.firstName);
        }());
    }
};

myPrecious.func();

// //
//  // A:
//  Name: Joan
//  Name: Joan
//  Name: Joan
//  Name: Joan

//  // B:
//  Name: Joan
//  Name: Joan
//  Name: undefined
//  Name: undefined

//  // C:
//  Name: Joan
//  Name: Joan
//  Name: undefined
//  Name: Joan

//  // D
//  Name: undefined
//  Name: undefined
//  Name: undefined
//  Name: undefined



// STATEMENT 1
var matches = myNodes.querySelectorAll("div.trigger, div.warning");
// STATEMENT 2
var matches = myNodes.querySelectorAll("div.pointed p");

// A: Statement 1 returns a list of all <div> elements within "myNodes" with a class of either "trigger" or "warning"
// B: Statement 1 returns a list of all <div> elements within "myNodes" that has both "trigger" and "warning" classes
// C: Statement 2 returns a list of the <p> elements within "myNodes" whose immediate child element is a div with the class "pointed"
// D: Statement 2 returns a list of the <p> elements within "myNodes" whose immediate parent element is a div with the class "pointed"

// Q8

/* OPTION A */
// div {.....} body div {. .}
// div.text {... .}
// div#content {.....}
// #content {………..}
// /* OPTION B */
// div#content {.....}
// div.text {………..}
// #content {.....} div {.....}
// body div {.. .}
// /* OPTION C */ div.text {……. •}
// div#content {.....} #content {... .}
// body div {.....}
// div {.....}
// /* OPTION D */
// div.text {………..} #content {………….}
// div#content {.....}
// div {.....}
// body div {.....}

/// highest to lowest specificity

// Q10

