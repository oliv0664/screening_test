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

    });

    
    

    

    var questionCount = 0;

    
    var imageUploadWidth = 0; 
    var imageUploadHeight = 0; 
    

    function addQuestion() {

        $questionTitle = $('<input/><br>').attr({
            type: 'text',
            id: 'title' + questionCount,
            placeholder: 'Titel på spørgsmål'
        });
        
        
        
        //titel id = titleX
        //ex: title2



        $question = $('<input/>').attr({
            type: 'text',
            id: 'question' + questionCount,
            placeholder: 'Indtast spørgsmål'
        });
        
        $questionFile = $('<input/><br><br>').attr({
            type: 'file',
            id: 'file' + questionCount,
            accept: 'audio/*|video/*|image/*',
            onchange: 'readURL(this)'
        });
        
        
        $imageUpload = $('<img/>').attr('id', 'image');
        

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
            .append($questionFile)
            .append($imageUpload)
            .append('<div id="imageEdit"></div>')
            .append($answerDiv)
            .append($addAnswerButton)
            .append($removeAnswerButton)
            .append('<span>   Tilføj/Fjern svarmulighed</span><br><br>');

        questionCount++; 
    }
    
    
    
    
    function readURL(input) {
        if(input.files && input.files[0]) {
            var reader = new FileReader(); 
            
            var fileType = input.files[0].name.split('.').pop();
            switch(fileType) {
                case 'jpg':
                case 'png':
                case 'gif': 
                    
                    reader.onload = function(e) {
                        $('#image')
                            .attr('src', e.target.result)
                            .width(400)
                            .height(400)
                    };

                    reader.readAsDataURL(input.files[0]); 

                    $imageWidth = $('<input/>').attr({
                        type: 'text',
                        id: 'imageWidth',
                        placeholder: 'bredde',
                        size: '4'
                    });

                    $imageHeight = $('<input/>').attr({
                        type: 'text',
                        id: 'imageHeight',
                        placeholder: 'højde',
                        size: '4'
                    });

                    $imageEdit = $('<input/>').attr({
                        type: 'button',
                        value: 'Ret størrelse',
                        id: 'imageEdit',
                        onclick: 'editImage()'
                    });

                    $('#imageEdit')
                        .append($imageWidth)
                        .append($imageHeight)
                        .append($imageEdit);
                break;
                
                case 'pcm':
                case 'wav':
                case 'aiff':
                case 'mp3':
                case 'aac':
                case 'ogg':
                case 'wma':
                case 'flac':
                case 'alac':
                    
                    //code for audio formats
                break;
                    
                case 'avi':
                    //more video formats
            }
        }
    }
    
    
    function editImage() {
        
        imageUploadWidth = $('#imageWidth').val();
        imageUploadHeight = $('#imageHeight').val();
        
        $('#image')
            .width(imageUploadWidth)
            .height(imageUploadHeight);
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
            type: 'radio',
            id: 'correctAnswer' + choiceCount,
            name: 'correctAnswer' + choiceCount,
            value: 'answer' + choiceCount + '-' + answerCount[choiceCount]
        });

        
        $correctLabel = $('<label>Marker korrekt svar</label><br>').attr({
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
    var imageUpload = [];
    
    
    function submit() {
        
        var emptyField = false; 
        
        for(var i=0; i<questionCount; i++) {
            for(var j=0; j<answerCount[i]; j++) {
                if( $('#answer' + i + '-' + j).val() == "" ) {
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

                correctAnswerArray[i] = $('#correctAnswer' + i + ':checked').val(); 
            }

            
            
            
            imageUpload[0] = $('#image').attr('src');
            imageUpload[1] = imageUploadWidth;
            imageUpload[2] = imageUploadHeight;
            

            dataArray[0] = titleArray;
            dataArray[1] = questionArray;
            dataArray[2] = groupOfChoicesArray;
            dataArray[3] = groupOfAnswersArray;
            dataArray[4] = correctAnswerArray;
            dataArray[5] = imageUpload;


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