// grab the articles as a json
$.getJSON('/articles', function(data) {
  // for each one
  for (var i = 0; i<data.length; i++){
    // display the apropos information on the page
    $('#articles').append('<p data-id="' + data[i]._id + '" class="paintTitle" >'+ data[i].title + /*'<br />'+ data[i].link +*/ '</p>');
    $('#articles').append('<a href="' + data[i].link +'" >' + '<p>' + 'Learn More'+'</p>'+'</a>');
   /* $('#articles').append('<p data-id="' + data[i]._id + '">'+ data[i].title + '<br />'+ data[i].link + '<br />' + '<img src="' + data[i].showImage +'" >' + '</p>');*/
    $('#articles').append('<img src="' + data[i].showImage +'" class="scrapeImage" >');
  }
});


// whenever someone clicks a p tag
$(document).on('click', 'p', function(){
  // empty the notes from the note section
  $('#notes').empty();
  $('#titleinput').val('');
  $('#bodyinput').val('');
  // save the id from the p tag
  var thisId = $(this).attr('data-id');

  // now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    // with that done, add the note information to the page
    .done(function( data ) {
      console.log(data);
      // the title of the article
/*      $('#notes').append('<h2>' + data.title + '</h2>'); 
      // an input to enter a new title
      $('#notes').append('<input id="titleinput" name="title" >'); 
      // a textarea to add a new note body
      $('#notes').append('<textarea id="bodyinput" name="body"></textarea>'); 
      // a button to submit a new note, with the id of the article saved to it
      $('#notes').append('<button data-id="' + data._id + '" id="savenote">Save Note</button>');*/
      //new form
      $('#notes').append('<h2>' + data.title + '</h2>'); 
      $('#notes').append('<button data-id="' + data._id + '" id="savenote" class="btn btn-success" >Save Note</button>');
      $('#notes').append('<button data-id="' + data._id + '" id="deletnote" class="btn btn-danger" >Delte Note</button>');
      /*$('input').attr('id', 'titleinput');
      $('textarea').attr('id', 'bodyinput');*/
      /*$('#savenote').attr('data-id', 'data._id');*/
      // if there's a note in the article
      if(data.note){
        // place the title of the note in the title input
        $('#titleinput').val(data.note.title);
        // place the body of the note in the body textarea
        $('#bodyinput').val(data.note.body);
      }
    });
});

// when you click the savenote button
$(document).on('click', '#savenote', function(){
  // grab the id associated with the article from the submit button
  var thisId = $(this).attr('data-id');

  // run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $('#titleinput').val(), // value taken from title input
      body: $('#bodyinput').val() // value taken from note textarea
    }
  })
    // with that done
    .done(function( data ) {
      // log the response
      console.log(data);
      // empty the notes section
      /*$('#notes').empty();*/
    });

  // Also, remove the values entered in the input and textarea for note entry
  /*$('#titleinput').val("");
  $('#bodyinput').val("");*/
});

// delet post

$(document).on('click', '#deletnote', function(){
  // grab the id associated with the article from the submit button
  var thisId = $(this).attr('data-id');

  // run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "DELETE",
    url: "/articles/" + thisId,
    data: {
      title: $('#titleinput').val(), // value taken from title input
      body: $('#bodyinput').val() // value taken from note textarea
    }
  })
    // with that done
    .done(function( data ) {
      // log the response
      console.log('deletd', data);
      // empty the notes section
      $('#notes').empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $('#titleinput').val("");
  $('#bodyinput').val("");
});