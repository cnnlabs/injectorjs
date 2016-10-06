var clickHandler = function (event) {
    var tab = this.dataset.tab;
        contentselector = "." + tab + ".content";
        tabselector = "." + tab + ".tab";
    $(".content").removeClass("active");
    $(".tab").removeClass("active");
    $(contentselector).addClass("active");
    $(tabselector).addClass("active");
    FAI.INJECTOR.loadFeature(tab);
}

$(".tab").click(clickHandler);
