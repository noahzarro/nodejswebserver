let bite_count = 1

$("#leuentorte").click(() => {
    bite_count += 1;
    console.log("leuentorte clicked")
    if (bite_count < 5) {
        $("#leuentorte").attr("src", "leuentorte/Leuentorte" + bite_count + ".png");
        $("#eat_audio")[0].play();
    }
});


function submitWish() {
    let formData = { name: $("#name").val(), wish: $("#wish").val() }
    $("#name").val("")
    $("#wish").val("")
    $.ajax({
        type: "POST",
        url: "../birthday/api/wishes",
        data: JSON.stringify(formData),
        success: function() {
            alert("De Wunsch isch abgschickt");
            load_wishes();
        },
        dataType: "json",
        contentType: "application/json"
    });
    console.log(formData)
};

function load_wishes() {
    $("#wishes").empty();
    $.ajax({
        type: "GET",
        url: "../birthday/api/wishes",
        success: function(res) {
            const wishes = JSON.parse(res)
            wishes.forEach(wish => {
                let title = $("<h5></h5>").addClass("card-title curly_font").css("font-weight", "bold").text(wish.name)
                let text = $("<p></p>").addClass("card-text curly_font").css("white-space", "pre-line").text(wish.wish)

                let card_body = $('<div></div>').addClass("card-body")
                card_body.append(title)
                card_body.append(text)

                let card = $('<div></div>').addClass("card")
                card.append(card_body)

                let spacing = $("<div></div>").addClass("pb-3")

                $('#wishes').append(card)
                $('#wishes').append(spacing)
            })

        }
    })
}

window.onload = function() {
    load_wishes();
};