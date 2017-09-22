{

    var dataFromParent; 
    // dataFromParent ==> array 
    // [0] = title
    // [1] = question
    // [2] = (div) groupOfChoices
    // [3] = (array) groupOfAnswers
    // [4] = correctAnswer
    // [5] = imageupload

    var numberOfQuestions = dataFromParent[0].length; 
    
    function init() {

        for(var i=0; i<numberOfQuestions; i++) {

            $questionDiv = $('<div/>').attr({
                id: 'questionDiv'
            });
            
            $('#main').append($questionDiv);
            
            
            
            $titleP = $('<h2/>')
                .attr({ id: 'titleP' })
                .text(dataFromParent[0][i]);
            
            $questionP = $('<h3/>')
                .attr({ id: 'questionP' + i })
                .text(dataFromParent[1][i]);
            
            $imageP = $('<img/><br>').attr({
                id: 'image',
                src: dataFromParent[5][0],
                width: dataFromParent[5][1],
                height: dataFromParent[5][2]
            });
            
            $('#questionDiv')
                .append($titleP)
                .append($questionP)
                .append($imageP);
            
            //document.write(dataFromParent[0][i] + '<br>');
            //document.write(dataFromParent[1][i] + '<br>');

            
            
            for(var j=0; j<dataFromParent[3][i].length; j++) {

                $selectP = $('<input/>').attr({
                    type: 'radio',
                    id: 'select' + i,
                    name: 'select' + i,
                    value: 'answer' + i + '-' + j
                })
                
                $choiceP = $('<label>' + dataFromParent[3][i][j].val() + '</label><br>').attr({
                    for: 'select',
                    id: 'choiceP' + i
                });
                
                $('#questionDiv')
                    .append($selectP)
                    .append($choiceP);
                
                //document.write(dataFromParent[3][i][j].val() + '<br>');

                /*if(dataFromParent[4][i] == dataFromParent[3][i][j].attr('id')) {
                    document.write(dataFromParent[3][i][j].val() + '<br>');
                }*/
            }
            //document.write('<br><br>');
        }
    }
    
    
    
    
    $(function() {
    
        $('#submit').click(function() {
            checkAnswer();     
        });
        
    });
    
    
    
    
    var selectAnswerArray = [];
    var correctAnswerCount = 0;
    var wrongAnswerCount = 0; 
    var totalAnswerCount = numberOfQuestions;
    
    function checkAnswer() {
        
        for(var i=0; i<numberOfQuestions; i++) {
            selectAnswerArray[i] = $('#select' + i + ':checked').val();
            
            if(dataFromParent[4][i] == selectAnswerArray[i]) {
                    $('#questionP' + i)
                        .css('backgroundColor','lightGreen')
                        .append("  Rigtig");
                
                    correctAnswerCount++; 
                
                } else if(selectAnswerArray[i] == null) {
                    $('#questionP' + i)
                        .css('backgroundColor', 'yellow')
                        .append("  Intet svar valgt");
                } else {
                    $('#questionP' + i)
                        .css('backgroundColor', 'red')
                        .append("  Forkert");
                    
                    wrongAnswerCount++;
                }
        }
        
        
        $('#results').append('<tr><th>Rigtige</th><th>Forkerte</th><th>Opgaver i alt</th></tr>');
        
        $correctCount = $('<td/>')
            .attr({ id: 'correctCount' })
            .text(correctAnswerCount); 
        
        $wrongCount = $('<td/>')
            .attr({ id: 'wrongCount' })
            .text(wrongAnswerCount); 
        
        $totalCount = $('<td/>')
            .attr({ id: 'totalCount' })
            .text(totalAnswerCount);
        
        
        $newRow = $('<tr/>');
        
        $newRow
            .append($correctCount)
            .append($wrongCount)
            .append($totalCount);
        
        $('#results')
            .append($newRow);
        
        
        
        $form = $('<form/>').attr({
            action: 'mailto:someone@example.com',
            method: 'post',
            enctype: 'text/plain'
        });
        
        $('#bottom')
            .append($form);
        
        
        for(var i=0; i<totalAnswerCount; i++) {
            
            $mailData = $('<input/>').attr({
                type: 'hidden',
                name: 'Question' + (i+1)
            }).val(dataFromParent[1][i] + ', der blev svaret: ' + $('#choiceP' + i).text());
        
            $form.append($mailData);
        }
        
        
        $sendMail = $('<input/>').attr({
            type: 'submit',
            value: 'Send svar til mail'
        });
        
        $form.append($sendMail)
            
    }
    
}