//Upload 
$('.upload-btn').on('click', function (){
    $('#progress-bar').text('0%');
    $('#progress-bar').width('0%');

  var files_image = $('#upload-input-image').get(0).files;
  var files_model = $('#upload-input-model').get(0).files;

  if (files_image.length > 0 && files_model.length > 0){
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData_image = new FormData();

    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files_image.length; i++) {
      var file_image = files_image[i];

      // add the files to formData object for the data payload
      formData_image.append('uploads-image[]', file_image, file_image.name);
    }

    var formData_model = new FormData();
    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files_model.length; i++) {
      var file_model = files_model[i];

      // add the files to formData object for the data payload
      formData_model.append('uploads-model[]', file_model, file_model.name);
    }

    $.ajax({
      url: '/upload_image',
      type: 'POST',
      data: formData_image,
      processData: false,
      contentType: false,
      success: function(data){
          console.log('upload image successful!\n' + data);
      },
      /*xhr: function() {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function(evt) {

          if (evt.lengthComputable) {
            // calculate the percentage of upload completed
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);

            // update the Bootstrap progress bar with the new percentage
            $('#progress-bar').text(percentComplete + '%');
            $('#progress-bar').width(percentComplete + '%');

            // once the upload reaches 100%, set the progress bar text to done
            if (percentComplete === 100) {
              $('#progress-bar').html('Done');
            }

          }

        }, false);

        return xhr;
      }*/
    });

    $.ajax({
      url: '/upload_model',
      type: 'POST',
      data: formData_model,
      processData: false,
      contentType: false,
      success: function(data){
          console.log('upload model successful!\n' + data);
      },
      xhr: function() {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function(evt) {

          if (evt.lengthComputable) {
            // calculate the percentage of upload completed
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);

            // update the Bootstrap progress bar with the new percentage
            $('#progress-bar').text(percentComplete + '%');
            $('#progress-bar').width(percentComplete + '%');

            // once the upload reaches 100%, set the progress bar text to done
            if (percentComplete === 100) {
              $('#progress-bar').html('Done');
            }

          }

        }, false);

        return xhr;
      }
    });

  }
});

