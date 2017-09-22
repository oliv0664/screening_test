{

    var dataFromParent; 
    // dataFromParent ==> array 
    // [0] = title
    // [1] = question
    // [2] = (div) groupOfChoices
    // [3] = (array) groupOfAnswers
    // [4] = correctAnswer
    // [5] = checkedAnswers

    function init() {

        for(var i=0; i<dataFromParent[0].length; i++) {

            $questionDiv = $('<div/>').attr({
                id: 'questionDiv'
            });
            
            $('#main').append($questionDiv);
            
            
            
            $titleP = $('<h2/>')
                .attr({ id: 'titleP' })
                .text(dataFromParent[0][i]);
            
            $questionP = $('<h3/>')
                .attr({ id: 'questionP' })
                .text(dataFromParent[1][i]);
            
            $('#questionDiv')
                .append($titleP)
                .append($questionP);
            

            
            
            for(var j=0; j<dataFromParent[3][i].length; j++) {

                $selectP = $('<input/>').attr({
                    type: 'checkbox',
                    id: 'select' + i + '-' + j,
                    class: 'select' + i,
                    name: 'select' + i,
                    value: 'answer' + i + '-' + j
                })
                
                $choiceP = $('<label>' + dataFromParent[3][i][j].val() + '</label><br>').attr({
                    for: 'select',
                    id: 'choiceP' + i + '-' + j
                });
                
                $('#questionDiv')
                    .append($selectP)
                    .append($choiceP);
                
                
            }
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
    
    var correctAnswerCountArray = [];
    var wrongAnswerCountArray = [];
    
    var totalCorrectAnswerCount = 0;
    var totalWrongAnswerCount = 0; 
    var totalAnswerCount = 0;
    
    function checkAnswer() {
        
        for(var i=0; i<dataFromParent[0].length; i++) {
            
            correctAnswerCount = 0;

            for(j=0; j<dataFromParent[4][i].length; j++) {
                
                if( dataFromParent[4][i][j].is(':checked') && $('#select' + i + '-' + j).is(':checked') ) {
                    $('#choiceP' + i + '-' + j)
                        .css('backgroundColor','lightGreen')
                        .append("  Rigtig");

                    correctAnswerCount++; 
                    
                } else if( dataFromParent[4][i][j].is(':checked') && !$('#select' + i + '-' + j).is(':checked')) {
                    $('#choiceP' + i + '-' + j)
                        .css('backgroundColor', 'yellow')
                        .append("  Dette svar mangler");
                
                } else if( !dataFromParent[4][i][j].is(':checked') && $('#select' + i + '-' + j).is(':checked')) {
                    $('#choiceP' + i + '-' + j)
                        .css('backgroundColor', 'red')
                        .append("  Forkert");
               
                    wrongAnswerCount++;
                }
                correctAnswerCountArray[i] = correctAnswerCount;
                wrongAnswerCountArray[i] = wrongAnswerCount;
            }
            
        }
        
        
        
        $('#results').append('<tr><th>Opgave</th><th>Rigtige</th><th>Forkerte</th></tr>');
        
        for(var i=0; i<dataFromParent[0].length; i++) {
            $correctCount = $('<td/>')
                .attr({ id: 'correctCount' })
                .text(correctAnswerCountArray[i] + ' ud af ' + dataFromParent[5][i].length); 
             
            $wrongCount = $('<td/>')
                .attr({ id: 'wrongCount' })
                .text(wrongAnswerCountArray[i]);
        
            $newRow = $('<tr/>');
            
            $newRow
                .append('<td>' + (i+1) + '</td>')
                .append($correctCount)
                .append($wrongCount)
            
            $('#results')
                .append($newRow)
            
            totalCorrectAnswerCount += correctAnswerCountArray[i];
            totalWrongAnswerCount += wrongAnswerCountArray[i];
            totalAnswerCount += dataFromParent[5][i].length;
        }
        
        $totalCorrectCount = $('<h4/>')
                .attr({ id: 'correctCount' })
                .text('Antal rigtige svar i alt: ' + totalCorrectAnswerCount + ' ud af ' + totalAnswerCount);
        
        $totalWrongCount = $('<h4/>')
                .attr({ id: 'wrongCount' })
                .text('Antal forkerte svar i alt: ' + totalWrongAnswerCount); 
        
        
        
        $form = $('<form/>').attr({
            action: 'mailto:someone@example.com',
            method: 'post',
            enctype: 'text/plain'
        });
        
        $('#bottom')
            .append($totalCorrectCount)
            .append($totalWrongCount)
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