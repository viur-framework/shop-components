function convertToCurrency(value, currency = "EUR", countryCode = "de-DE") {

   return new Intl.NumberFormat(countryCode, { style: 'currency', currency: currency }).format(value)
}

export {convertToCurrency}
