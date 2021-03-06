{
    
    
    // jquery start function
    $(function() {

        // når der klikkes på denne knap
        $('#addLine').click(function() {
            addLine();
        });
        
        
        
        $('#submit').click(function() {
            submit();
        });


    });
    
    
    // holder styr på antal linjer/sætninger
    var lineCount = 0;
    
    // når der trykkes på knappen
    function addLine() {
        
        // opretter en ny linje/paragraf
        $newLine = $('<div/>')
            .attr({ 
                id: 'line' + lineCount,
                class: 'newLine'
            })
            .text((lineCount + 1) + '. ');
        
        // tilføjer linjen til body
        $('#body').append($newLine);
        
        
        
        //størrelsen på tekst input felterne 
        var size = 30; 
        
        // tilføj et tekststykke
        $newLineText1 = $('<input/>').attr({
            id: 'lineText1' + lineCount,
            type: 'text',
            placeholder: 'Indtast tekst her',
            size: size
        });
        
        
        $newLineTextExample = $('<input/>').attr({
            id: 'lineTextExample' + lineCount,
            type: 'text',
            placeholder: 'Indsæt ordeksempel',
            size: (size/2)
        });
        
        
        // tilføj endnu et tekststykke
        $newLineText2 = $('<input/>').attr({
            id: 'lineText2' + lineCount,
            type: 'text',
            placeholder: 'Indtast tekst her',
            size: size
        });
        
        
        // tilføj en lydfil
        $audioFile = $('<input/>').attr({
            type: 'file',
            id: 'file' + lineCount,
            accept: 'audio/*',
            onchange: 'readURL(this)'
        });
        
         
        // tilføj en lydkontroller til den givne lydfil
        $audioControl = $('<audio controls></audio>')
            .append('</source>')
            .attr('id', 'soundSrc' + lineCount); 
        
        
        
        // tilføj alle elementer til siden 
        $('#line' + lineCount)
            .append($newLineText1)
            .append($newLineTextExample)
            .append($newLineText2)
            .append($audioFile)
            .append($audioControl);
        
        
        
        
    
        
        
        
        

        // tilføjer en slet knap
        if(lineCount == 0) {
            $removeLineButton = $('<input/>').attr({
                id: 'removeLineButton',
                type: 'button',
                value: 'Fjern linje'
            }).click(function() {
                removeLine(); 
            });


            $('#bottom').append($removeLineButton);
            
        }
        
        
        
        lineCount++;
    }
    
    
    
    
    // fjerner slet knap når der ikke er flere linjer 
    function removeLine() {
        
        $('#line' + (lineCount-1)).remove(); 
        
        lineCount--; 
        
        
        if(lineCount == 0) {
            $('#removeLineButton').remove(); 
        }
    }
    
    
    
    
    
    // indlæser en fil, som input af brugeren
    function readURL(input) {
        
        if(input.files && input.files[0]) {
            var reader = new FileReader(); 
            
            var fileSrc = input.id.substring(4); 

            reader.onload = function(e) {
                $('#soundSrc' + fileSrc)
                    .attr('src', e.target.result)
            };

            reader.readAsDataURL(input.files[0]); 
        }
    }
    
    
    
    var initialsMain; 
    
    // når der trykkes submit
    function submit() {
        
        
        var dataArray = []; 
        var lineText1Array = []; 
        var lineTextExampleArray = []; 
        var lineText2Array = []; 
        var audioSrcArray = []; 
        
        // alle de indtastede elementer bliver gemt i arrays
        for(var i=0; i<lineCount; i++) {
            
            lineText1Array[i] = $('#lineText1' + i).val(); 
            lineTextExampleArray[i] = $('#lineTextExample' + i).val(); 
            lineText2Array[i] = $('#lineText2' + i).val();
            audioSrcArray[i] = $('#soundSrc' + i).attr('src'); 
            
        }
        
        // alle arrays bliver til sidst smidt in i et stort array 
        dataArray[0] = lineText1Array;
        dataArray[1] = lineTextExampleArray; 
        dataArray[2] = lineText2Array; 
        //audio kan ikke gemmes i localstorage, venter på opdatering med database
        //dataArray[3] = audioSrcArray; 
        
        
        // gemmer titlen på testen (obligatorisk)
        var testTitle = $('#testTitle').val(); 
        if(testTitle == null) {
            alert('Du skal angive en titel til din test'); 
        } else {
            
            dataArray[3] = testTitle; 
            var output = dataArray;

            // spørger brugeren om deres initialer
            initialsMain = prompt('Skriv dine initialer');
            initialsMain = initialsMain.replace(/\s+/g, '');
            
            while(initialsMain.length > 3 || initialsMain.length < 3) {
                initialsMain = prompt('Dine initialer skal være 3 bogstaver!'); 
            } 

            // gemmer testen under den angivne bruger (initialer) 
            localStorage.setItem(initialsMain, JSON.stringify(output)); 

            // åbner et nyt vindue
            var url = "output.html";
            var openWindow = window.open(url);

            /*openWindow.dataFromParent = output;
            openWindow.addEventListener('load', function(){
                openWindow.init(); 
            });*/
            
        }
        
    }
    
    
}