// @params settings
var params = { // //YYYY-MM-DD[T]HH:mm:ss (SGT)
    "date_time": "2022-12-08T12:00:00",
    "date": "2022-12-27" // YYYY MM DD
};

function checkWeather(params) {
    $.ajax({
        type: "GET",
        dataType: 'json',
        contentType: "text/plain",
        url: "https://api.data.gov.sg/v1/environment/psi",
        headers: {},

        data: params,
        // crossDomain: true,
        // @data returning JSON data
        success: function (data) {
            console.log("API status: " + data.api_info.status);
            var reading_twenty_four = data.items[0].readings.psi_twenty_four_hourly;
            var content = "";
            $.each(reading_twenty_four, function (key, obj) {
                console.log(key + ": " + obj);
                content += key + ": " + obj + "<br/>";
            });

            $("#psi-twenty-four-hourly").html(content);

            var reading_twenty_four_pm10 = data.items[0].readings.pm10_twenty_four_hourly;
            var content = "";
            $.each(reading_twenty_four_pm10, function (key, obj) {
                console.log(key + ": " + obj);
                content += key + ": " + obj + "<br/>";
            });

            $("#pm10-twenty-four-hourly").html(content);


            $("#txtDate").val(params.date_time);

            // store info as local storage
            localStorage.setItem("psi", JSON.stringify(reading_twenty_four));
            localStorage.setItem("pm10", JSON.stringify(reading_twenty_four_pm10));

        }
    });

 
}

checkWeather(params);
$("#btnSubmit").click(function() {
    params.date_time = $("#txtDate").val();
    params.date = params.date_time.substring(0, 9);
    checkWeather(params);
})