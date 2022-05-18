//https://teachablemachine.withgoogle.com/models/J80XG2IGl/model.json

prediction_1 = ""
prediction_2 = ""


Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="result_image" src="'+data_uri+'"/>';
    })
}


console.log("ml5 version: " + ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/J80XG2IGl/model.json', modelLoaded);

function modelLoaded(){
    console.log("model has loaded");
}


function speak(){
    var synth =  window.speechSynthesis;
    speech1 = "My first guess of what your symbol is " + prediction_1;
    speech2 = "My second guess of what your symbol is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speech1 + speech2);
    synth.speak(utterThis);
}

function scanSnapshot(){
    img = document.getElementById('result_image');
    classifier.classify(img, gotResults);
}


function gotResults(error, results){
    if(error){
        console.log("error");
    }
    else{
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = prediction_1;
        document.getElementById("result_emotion_name2").innerHTML = prediction_2;
        speak();
        if(results[0].label == "Punch"){
            document.getElementById("update_emoji").innerHTML = "&#9994;"	
        }
        if(results[1].label == "Punch"){
            document.getElementById("update_emoji2").innerHTML = "&#9994;"	
        }
        if(results[0].label == "Peace"){
            document.getElementById("update_emoji").innerHTML = "&#128076;"	
        }
        if(results[1].label == "Peace"){
            document.getElementById("update_emoji2").innerHTML = "&#128076;"	
        }
        if(results[0].label == "Thumbs Up"){
            document.getElementById("update_emoji").innerHTML = "&#128077;"	
        }
        if(results[1].label == "Cold"){
            document.getElementById("update_emoji2").innerHTML = "&#128077;"	
        }
    }
}

