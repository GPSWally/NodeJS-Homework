//Node javascript, writing a terminal that goes a terminal

var fs = require("fs");

var useStdin = function(){
	var input = process.stdin.read();
	if (input !== null){
		var inputSplit = input.toString().trim().split(" ");
		if (inputSplit[0] === "cat"){
			catFile(inputSplit[1]);
			console.log("meow");
		} else if (inputSplit[0] === "touch"){
			touchFile(inputSplit[1]);
		} else if (inputSplit[0] === "rm"){
			unlinkFile(inputSplit[1]);
		} else if (inputSplit[0] === "replace"){
			replaceStr(inputSplit[1],inputSplit[2], inputSplit[3]);
		} else if (inputSplit[0] === "grep"){
			grepFile(inputSplit[1],inputSplit[2]);
		}
		console.log("You typed: " + input);
	}
};

function grepFile(fileName, findStr){
	fs.readFile(fileName, 'utf8', function(err, data)
	{
		if (err)
		{
			return console.log(err);
		}else
		{
			var inputSplit = data.toString().split("\n");
			var findWord = new RegExp(findStr, "g");
			for (i=0; i<inputSplit.length; i++)
			{
				if (inputSplit[i].search(findWord) !== -1)
				{
					console.log(inputSplit[i]);
				}
			}
		}
	});
}




function replaceStr(fileName, findStr, rplStr)
{
	fs.readFile(fileName, 'utf8', function(err, data) 
	{
	    if (err) 
	    {
	      return console.log(err);
	    }
	    data.toString()
	     //(your-regex-or-text,replacement-text)
	    var findWord = new RegExp(findStr, "g");
	    var result = data.replace(findWord, rplStr);
	    fs.writeFile(fileName, result, 'utf8', function(err) 
	    {
	    	if (err) 	
	       	{
	           	return console.log(err);
	        }
	    });
	});
}

function unlinkFile(fileName){
	fs.unlink(fileName, function(err){
		if (err){
			console.log("Could not delete a file.");
		}else{
			console.log("File has been removed.");
		}
	});
}

//creates a file
function touchFile(fileName){
	fs.writeFile(fileName, "", function(err){
		if (err) {
			console.log("Could not write to file.");
		}else{
			console.log("File created and saved");
		}
	});
}

//displays contents of file
function catFile(fileName) {
	fs.readFile(fileName, function(err, data){
		if (err){
			console.log("Unable to read from file");
		} else {
			console.log(data.toString());
		}
	});
}

process.stdin.on('readable', useStdin); 