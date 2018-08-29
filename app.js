

var gsaClient = {

    gsaAppKey: '940cc721daa34e609471294175cc9e24',
    gsaServiceUrl: 'https://www.globalsportsapi.com/RESTv1/HorseRacingSample',

    // Configuration
    GetAjax: function (url, success) {
        console.log('Calling GSA: ' + url);
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url);
        xhr.onreadystatechange = function () { if (xhr.readyState > 3 && xhr.status == 200) success(xhr.responseText); };
        xhr.send();
        return xhr;
    },

    GetMeetingsAndRacesOnDate: function (meetingDate) {
        var promise = new Promise(function (resolve, reject) {
            var urlToCall = gsaClient.gsaServiceUrl + '/GetMeetingsAndRacesOnDate/' + meetingDate + '?gsaappkey=' + gsaClient.gsaAppKey;
            gsaClient.GetAjax(urlToCall, function (data) {
                resolve(JSON.parse(data).value);
            });
        });
        return promise;
    }

}

// Get a list of meeting and there races on a given date
gsaClient.GetMeetingsAndRacesOnDate('2018-01-27').then(function (MeetingsAndRacesData) {
    console.log(MeetingsAndRacesData);
    //List out the contents to the UI
    var meetingsDiv = document.getElementById('meetings');
    MeetingsAndRacesData.forEach(element => {
        var meetingItem = document.createElement('li')
        meetingItem.innerText = element.courseName;
        meetingsDiv.appendChild(meetingItem)
    });
})
