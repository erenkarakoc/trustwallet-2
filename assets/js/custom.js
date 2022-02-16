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
  $("body").addClass("dark-mode")

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

function randomIntFromInterval(min, max) {
  return Math.random() * (max - min + 1) + min
}

fetch(
  "https://rest.coinapi.io/v1/assets?apikey=790321D5-4828-44F0-96AC-FA8A8E16AE58"
)
  .then((res) => {
    if (res.status === 429) {
      const rndInt = randomIntFromInterval(424, 434)
      $("#balance").html(rndInt.toString().slice(0, -9))
    } else {
      return res.json()
    }
  })
  .then((data) => {
    $(data).each((idx, val) => {
      var price
      var btc_balance_usd
      var doge_balance_usd
      var torn_balance_usd

      if (val.asset_id === "BTC") {
        var price = val.price_usd
        var btc_balance_usd = price * 0.0041
        $("#BTCUSD").html(btc_balance_usd)
      }
      if (val.asset_id === "DOGE") {
        var price = val.price_usd
        var doge_balance_usd = price * 1124
        $("#DOGEUSD").html(doge_balance_usd)
      }
      if (val.asset_id === "TORN") {
        var price = val.price_usd
        var torn_balance_usd = price * 5.3697
        $("#TORNUSD").html(torn_balance_usd)
      }

      $("#balance").html(btc_balance_usd + doge_balance_usd + torn_balance_usd)
    })
  })
