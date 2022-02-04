function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
    },
    "google_translate_element"
  )
}
window.onload = function () {
  var themeClr = $.cookie("theme-color")
  var darkmode = $.cookie("dark-mode")
  if (darkmode == "on") {
    $("body").addClass("dark-mode")
    $("#theme-change").prop("checked", true)
  } else {
    $("body").removeClass("dark-mode")
    $("#theme-change").prop("checked", false)
  }
  $("body").addClass(themeClr)
  if (document.readyState == "complete") {
    $(".loader-images img").attr("src", "")
    $(".loader-images img").attr("src", "images/loader.svg")
    $("body").addClass("loaded")
  }
}

setTimeout(() => {
  $("#loader-wrapper").fadeOut()
}, 1400)

$(document).ready(function () {
  $(".lang-select").click(function () {
    var theLang = $(this).attr("data-lang")
    // $('.goog-te-combo').val(theLang);

    var domain = window.location.hostname
    $.cookie("lang", theLang, {
      path: "/",
      domain: domain,
    })

    if (theLang == "en") {
      console.log("reset for en========================================")
      $.removeCookie("googtrans", {
        path: "/",
      })
      $.removeCookie("googtrans", {
        path: "/",
        domain: domain,
      })
      $.removeCookie("googtrans", {
        path: "/",
        domain: "." + domain,
      })
    }
    window.location = $(this).attr("href")
    location.reload()
  })
  $(".color-li a").click(function () {
    var c = $.cookie("theme-color")
    if (c !== undefined && c != "") {
      $("body").removeClass(c)
    }
    $("body").removeClass("theme-defalt")
    var clr = $(this).attr("class")
    $("body").addClass(clr)
    $.cookie("theme-color", clr)
  })
  $("#theme-change").click(function () {
    var c = $.cookie("theme-color")
    if (c != "theme-defalt") {
      $("body").removeClass("theme-defalt")
    }
    if ($(this).prop("checked") == true) {
      $.cookie("dark-mode", "on")
      $("body").addClass("dark-mode")
    } else if ($(this).prop("checked") == false) {
      $.cookie("dark-mode", "off")
      $("body").removeClass("dark-mode")
    }
  })
  $(".user-top-detail").click(function () {
    $(".profile-dropdown").toggle("fast", function () {})
  })
  $(".menu-responsive").click(function () {
    $(".header-nav-menu > ul").toggle("fast", function () {})
  })
  $(".notification-box").click(function () {
    $(".notification-dropdown").toggle("fast", function () {})
  })
  $(".dropdown").click(function () {
    $(this).attr("tabindex", 1).focus()
    $(this).toggleClass("active")
    $(this).find(".dropdown-menu").slideToggle(300)
  })
  $(".dropdown").focusout(function () {
    $(this).removeClass("active")
    $(this).find(".dropdown-menu").slideUp(300)
  })
  $(".dropdown .dropdown-menu li").click(function () {
    $(this).parents(".dropdown").find("span").text($(this).text())
    $(this).parents(".dropdown").find("input").attr("value", $(this).attr("id"))
  })
  $(".toggle-button").click(function () {
    $(".color-switcher").toggleClass("active")
  })
})

// API
// CoinAPI => 790321D5-4828-44F0-96AC-FA8A8E16AE58
// https://rest.coinapi.io/v1/assets?apikey=API_KEY

// ExchangeRates => 9f0b059124149ba980d87e0ad89ed33c
// http://api.exchangeratesapi.io/v1/latest?access_key=API_KEY&format=1

fetch(
  "https://rest.coinapi.io/v1/assets?apikey=790321D5-4828-44F0-96AC-FA8A8E16AE58"
)
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    console.log('updated2')
    console.log(data)
    $(data).each((idx, val) => {
      if (val.asset_id === "BTC") {
        var price = val.price_usd
        var balance_usd = price * 0.032
        balance_usd = balance_usd.toString().slice(0, -9)
        $("#balance").html(balance_usd)
      }
    })
    toTRY()
  })

function toTRY() {
  fetch(
    "http://api.exchangeratesapi.io/v1/latest?access_key=9f0b059124149ba980d87e0ad89ed33c&symbols=USD,TRY&format=1"
  )
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      $(data).each((idx, val) => {
        var TRYUSD = val.rates.TRY / val.rates.USD

        $("#totalTRY").html(Number($("#totalUSD").html()) * TRYUSD)
      })
    })
}
