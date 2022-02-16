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
    $(data).each((idx, val) => {
      if (val.asset_id === "BTC") {
        var price = val.price_usd
        var balance_usd = price * 0.0041
        $("#BTCUSD").html(balance_usd)
      }
      if (val.asset_id === "DOGE") {
        var price = val.price_usd
        var balance_usd = price * 1124
        $("#DOGEUSD").html(balance_usd)
      }
      if (val.asset_id === "TORN") {
        var price = val.price_usd
        var balance_usd = price * 5.3697
        $("#TORNUSD").html(balance_usd)
      }

      $("#totalUSD").html(
        Number($("#BTCUSD").html()) +
          Number($("#DOGEUSD").html()) +
          Number($("#TORNUSD").html())
      )
    })
    // toTRY()
  })


// function toTRY() {
//   fetch(
//     "http://api.exchangeratesapi.io/v1/latest?access_key=9f0b059124149ba980d87e0ad89ed33c&symbols=USD,TRY&format=1"
//   )
//     .then((res) => {
//       return res.json()
//     })
//     .then((data) => {
//       $(data).each((idx, val) => {
//         var TRYUSD = val.rates.TRY / val.rates.USD

//         $("#totalTRY").html(Number($("#totalUSD").html()) * TRYUSD)
//       })
//     })
// }
