let bite_count = 1

$("#leuentorte").click(() => {
    bite_count += 1;
    console.log("leuentorte clicked")
    if (bite_count < 5) {
        $("#leuentorte").attr("src", "leuentorte/Leuentorte" + bite_count + ".png");
        $("#eat_audio")[0].play();
    }
});