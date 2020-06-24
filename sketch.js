var database,bg,bg1;
var head, start_text, username, email, submit, done ;
var questions, answers;
var level = 1;
var thanks, end_text;

function preload(){
    bg = loadImage("bg.png");
    bg1 = loadImage("bg1.png");
}

function setup(){
    createCanvas(displayWidth,displayHeight-100);
    database = firebase.database()

    head = createElement('h1');
    head.elt.id = "header";
    head.position(displayWidth/2 - 150, displayHeight/2 - 270);
    head.html("Welcome");
    //head.hide();

    start_text = createElement('h3');
    start_text.elt.id = "info";
    start_text.position(displayWidth/2 - 173, displayHeight/2 - 150);
    start_text.html("Please start by filling in your details.");
    //start_text.hide();
    
    username = createInput();
    username.position(displayWidth/2 - 160, displayHeight/2 - 50);
    username.elt.id = "input";
    username.elt.placeholder = "Enter Full Name";

    email = createInput();
    email.elt.type = "email";
    email.position(displayWidth/2 - 160, displayHeight/2);
    email.elt.id = "input";
    email.elt.placeholder = "Enter E-Mail";

    submit = createButton("Start Survey");
    submit.elt.id = "submit";
    submit.position(email.x + 90, email.y + 50);

    q1 = createElement("h3");
    q1.position(displayWidth/2 - 340, displayHeight/2 - 270);
    q1.html("1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Do you think the amount of homework should be reduced? Why?");

    a1 = createInput();
    a1.position(displayWidth/2 - 300, q1.y + 70);

    q2 = createElement("h3");
    q2.position(displayWidth/2 - 340, a1.y + 100);
    q2.html("2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name a few things that can improve the class.");

    a2 = createInput();
    a2.position(displayWidth/2 - 300, q2.y + 70);

    q3 = createElement("h3");
    q3.position(displayWidth/2 - 340, a2.y + 100);
    q3.html("3)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;What are a few things your teacher can do to improve learning?");

    a3 = createInput();
    a3.position(displayWidth/2 - 300, q3.y + 70);

    q4 = createElement("h3");
    q4.position(displayWidth/2 - 340, a3.y + 100);
    q4.html("4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you could do one thing to improve teaching, what would it be?");

    a4 = createInput();
    a4.position(displayWidth/2 - 300, q4.y + 70);

    q5 = createElement("h3");
    q5.position(displayWidth/2 - 340, a4.y + 100);
    q5.html("5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;What advice would you give to students in next year's class?");

    a5 = createInput();
    a5.position(displayWidth/2 - 300, q5.y + 70);

    q6 = createElement("h3");
    q6.position(displayWidth/2 - 340, a5.y + 100);
    q6.html("6)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Are you having any difficulties learning?");

    a6 = createInput();
    a6.position(displayWidth/2 - 300, q6.y + 70);

    q7 = createElement("h3");
    q7.position(displayWidth/2 - 340, a6.y + 100);
    q7.html("7)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;How would you rate the school canteen?");

    a7a = createSlider(0, 10, 5);
    a7a.position(displayWidth/2 - 300, q7.y + 70);
    a7a.style("width", "8cm");
    a7a.style("-webkit-animation", "fadein 6s")

    a7min = createElement("p");
    a7min.position(a7a.x - 15, a7a.y - 25);
    a7min.elt.id = "question";
    a7min.html(0);

    a7max = createElement("p");
    a7max.position(a7a.x + 310, a7a.y - 25);
    a7max.elt.id = "question";
    a7max.html(10);

    a7val = createElement("p");
    a7val.elt.id = "question";

    a7b = createInput();
    a7b.position(displayWidth/2 - 300, q7.y + 130);

    q8 = createElement("h3");
    q8.position(displayWidth/2 - 340, a7b.y + 100);
    q8.html("8)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;How would you rate your school life?");

    a8a = createSelect();
    a8a.elt.id = "dropdown";
    a8a.option("Extremely Fun!");
    a8a.option("Very Good");
    a8a.option("Ok");
    a8a.option("Boring");
    a8a.option("Stressful");
    a8a.option("Very Stressfull");
    a8a.position(displayWidth/2 - 300, q8.y + 70);

    a8b = createInput();
    a8b.position(displayWidth/2 - 300, q8.y + 130);

    q9 = createElement("h3");
    q9.position(displayWidth/2 - 340, a8b.y + 100);
    q9.html("9)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Which is your favourite subject? Why?");

    a9 = createInput();
    a9.position(displayWidth/2 - 300, q9.y + 70);

    q10 = createElement("h3");
    q10.position(displayWidth/2 - 340, a9.y + 100);
    q10.html("10)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Do you have anything else to say (improvements, complaints, etc.)?");

    a10 = createInput();
    a10.position(displayWidth/2 - 300, q10.y + 70);

    done = createButton("Submit");
    done.elt.id = "submit";
    done.position(a10.x + 240, a10.y + 60);
    done.hide();

    thanks = createElement("h1");
    thanks.elt.id = "thanks";
    thanks.position(displayWidth/2 - 200, displayHeight/2 - 270);
    thanks.html("Thank You!");
    thanks.hide();

    end_text = createElement('h3');
    end_text.elt.id = "info";
    end_text.position(displayWidth/2 - 300, displayHeight/2 - 150);
    end_text.html("Thank you for sparing a part of your time filling out this survey.<br>Your response has been recorded.");
    end_text.style("text-align", "center");
    end_text.hide();

    questions = [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10];
    answers = [a1,a2,a3,a4,a5,a6,a7b,a8b,a9,a10];

    for(var question of questions){
        question.elt.id = "question";
        question.hide();
    }
    for(var answer of answers){
        answer.elt.id = "input1";
        answer.elt.placeholder = "Write your opinion.";
        answer.elt.autocomplete = "off";
        answer.hide();
    }
    a7a.hide();
    a7min.hide();
    a7max.hide();
    a7val.hide();
    a8a.hide();
}

function draw(){
    if(level === 1){background(bg)}
    if(level === 2){background(bg1)}
    a7val.position(a7a.x + (a7a.value()*29), a7a.y);
    a7val.html(a7a.value());

    submit.mousePressed(()=>{
        head.elt.id = "head_done";
        start_text.elt.id = "info_done";
        username.elt.id = "input_done";
        email.elt.id = "input_done";
        submit.elt.id = "submitted";

        document.getElementById("defaultCanvas0").style.height =  done.y + 50 + "px";
        level = 2;

        for(var question of questions){
            question.show();
        }
        for(var answer of answers){
            answer.show();
        }
        a7a.show();
        a7min.show();
        a7max.show();
        a7val.show();
        a8a.show();
        done.show();
    })

    done.mousePressed(()=>{
        writeDetails(username.value(), email.value(), a1.value(),a2.value(),a3.value(),a4.value(),a5.value(),a6.value(),a7a.value(),a7b.value(),a8a.value(),a8b.value(),a9.value(),a10.value());
        for(var question of questions){
            question.hide();
        }
        for(var answer of answers){
            answer.hide();
        }
        a7a.hide();
        a7min.hide();
        a7max.hide();
        a7val.hide();
        a8a.hide();
        done.hide();
        document.getElementById("defaultCanvas0").style.height =  displayHeight + "px";
        level = 1;
        thanks.show();
        end_text.show();
    })
}

function writeDetails(name,email,a1,a2,a3,a4,a5,a6,a7a,a7b,a8a,a8b,a9,a10){
    database.ref(name).set({
        name : name,
        email : email,
        preferences: {
            a1 : a1,
            a2 : a2,
            a3 : a3,
            a4 : a4,
            a5 : a5,
            a6 : a6,
            a7Slider : a7a,
            a7Opinion : a7b,
            a8Choice : a8a,
            a8Opinion : a8b,
            a9 : a9,
            a10 : a10
        }
    })
}