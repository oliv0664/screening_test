{
    $(function() {

        $('#addQuestion').click(function() {
            addQuestion();
        });



        $('#addAnswer').click(function() {
            addAnswer(); 
        });
        
        
        $('#submit').click(function() {
            submit();
        })
        
        
        var MongoClient = require('mongodb').MongoClient; 
        
        MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
            if(err) { return console.dir(err) }
            
            var collection = db.collection('testCol');
            var doc1 = { 'hello':'doc1' };
            
            collection.insert(doc1);
        });

    });

    
    

    

    var questionCount = 0;


    function addQuestion() {

        $questionTitle = $('<input/><br>').attr({
            type: 'text',
            id: 'title' + questionCount,
            placeholder: 'Titel på spørgsmål'
        });
        
        //titel id = titleX
        //ex: title2



        $question = $('<input/><br><br>').attr({
            type: 'text',
            id: 'question' + questionCount,
            placeholder: 'Indtast spørgsmål'
        });

        //spørgsmål id = questionX 
        //ex: question3
        

        $answerDiv = $('<div/>').attr({
            id: 'choices' + questionCount
        });



        $addAnswerButton = $('<input/>').attr({
            type: 'button',
            id: 'addAnswer' + questionCount,
            value: '+'
        }).click(function(){
            
            addAnswer(this.id); 
        });

        
        $removeAnswerButton = $('<input/>').attr({
            type: 'button',
            id: 'removeAnswer' + questionCount,
            value: '-'
        }).click(function(){
            
            removeAnswer(this.id); 
        });
        
        

        

        $('#questions')
            .append('<p>' + (questionCount+1) + '</p>')
            .append($questionTitle)
            .append($question)
            .append($answerDiv)
            .append($addAnswerButton)
            .append($removeAnswerButton)
            .append('<span>   Tilføj/Fjern svarmulighed</span><br><br>');

        questionCount++; 
    }


    

    var answerCount = [];
    
    function addAnswer(id) {
         
        
        var choiceCount = id.substr(9);

        
        if(answerCount[choiceCount] == null) {
            answerCount[choiceCount] = 0; 
        } else {
            answerCount[choiceCount]++; 
        }
        
         
            
        $choice = $('<input/>').attr({
            type: 'text',
            id: 'answer' + choiceCount + '-' + answerCount[choiceCount],
            placeholder: 'svarmulighed'
        });
        
        //svar id = answerX-Y
        //ex: answer2-1 / answer4-2
        
        
        $correct = $('<input/>').attr({
            type: 'checkbox',
            id: 'correctAnswer' + choiceCount + '-' + answerCount[choiceCount],
            class: 'correctAnswer' + choiceCount,
            name: 'correctAnswer' + choiceCount,
            value: 'answer' + choiceCount + '-' + answerCount[choiceCount]
        });

        
        $correctLabel = $('<label>Marker korrekt(e) svar</label><br>').attr({
            for: 'correctAnswer'
        });

        
        $choiceDiv = $('<div/>').attr({
            id: 'choiceDiv' + choiceCount + '-' + answerCount[choiceCount]
        });

        

         

        $('#choices' + choiceCount)
            .append($choiceDiv);
        
        $('#choiceDiv' + choiceCount + '-' + answerCount[choiceCount])
            .append($choice)
            .append($correct)
            .append($correctLabel);
    }
    
    
    
    function removeAnswer(id) {
        
        var choiceCount = id.substr(12);
        $('#choiceDiv' + choiceCount + '-' + answerCount[choiceCount]).remove(); 
        answerCount[choiceCount]--;
        
    }
    
    
    
    
    var dataArray = []; 
    var titleArray = []; 
    var questionArray = []; 
    var groupOfChoicesArray = []; 
    var groupOfAnswersArray = [];
    //var answerArray = [];
    var correctAnswerArray = []; 
    var checkedAnswerArray = [];
    
    
    function submit() {
        
        var emptyField = false; 
        
        for(var i=0; i<questionCount; i++) {
            for(var j=0; j<answerCount[i]; j++) {
                if( $('#answer' + i + '-' + j).val().length == 0 ) {
                    emptyField = true;
                }
            }
        }
                
           
        
            
        if(emptyField) {
            alert('Der er en eller flere tomme valgmuligheder!');
        } else {
            
            for(var i=0; i<questionCount; i++) {

                //mangler at lave dynamiske array navne 
                // således at den ikke ændre på værdierne i arrayet hver gang

                titleArray[i] = $('#title' + i).val(); 
                questionArray[i] = $('#question' + i).val(); 
                groupOfChoicesArray[i] = $('#choices' + i); 

                var answerArray = [];
                for(var j=0; j<=answerCount[i]; j++) {
                    answerArray[j] = $('#answer' + i + '-' + j);
                }

                groupOfAnswersArray[i] = answerArray; 

                var correctArray = [];
                for(j=0; j<=answerCount[i]; j++) {
                    correctArray[j] = $('#correctAnswer' + i + '-' + j);
                }
                
                checkedAnswerArray[i] = $('.correctAnswer' + i + ':checkbox:checked');
                
                correctAnswerArray[i] = correctArray; 
            }


            dataArray[0] = titleArray;
            dataArray[1] = questionArray;
            dataArray[2] = groupOfChoicesArray;
            dataArray[3] = groupOfAnswersArray;
            dataArray[4] = correctAnswerArray;
            dataArray[5] = checkedAnswerArray;


            var output = dataArray;
            var url = "output.html";
            var openWindow = window.open(url);

            openWindow.dataFromParent = output;
            openWindow.addEventListener('load', function(){
                openWindow.init(); 
            });

           
                
        }
        
    }
            
}