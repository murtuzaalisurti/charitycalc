document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#actualincome").disabled = true;
    console.log(document.querySelectorAll("div.show input"));
    var selectfield = document.querySelectorAll("div.show input");
    for(let i = 0; i < selectfield.length; i++){
        selectfield[i].onkeyup = () => {
            document.querySelector("#actualincome").disabled = false;
        }
    }
    // document.querySelector("#interestamount").onkeyup = () => {
        // document.querySelector("#actualincome").disabled = false;
        document.querySelector("form").onsubmit = () => {
            class Donate {
                constructor(principal, interest, inflation) {
                    this.principal = principal;
                    this.interest = interest;
                    this.inflation = inflation;
                }
                calcincome() {
                    console.log(typeof this.interest);
                    if (this.interest > 0 && this.principal > 0) {
                        console.log(typeof this.interest);
                        var result = document.querySelector("#output");
                        var pminusint = this.principal - (this.interest);
                        // console.log(typeof pminusint);
                        var rate = (this.interest * 100) / this.principal;
                        console.log(typeof rate);
                        if (rate >= this.inflation) {
                            var actualinc = (pminusint + ((this.inflation * pminusint) / 100));
                            var actualincround = actualinc.toFixed(2);
                            var charity = (this.principal - actualinc);
                            var charityround = charity.toFixed(2);
                            // console.log(actualincround);
                            result.innerHTML = `Your actual income is&nbsp<b>${actualincround}</b>&nbspand you have to donate&nbsp<b>${charityround}</b>`;
                        } else {
                            var actualinc = pminusint;
                            var actualincround = actualinc.toFixed(2);
                            var charity = this.principal - actualinc;
                            var charityround = charity.toFixed(2);
                            // console.log(actualincround);
                            result.innerHTML = `Your actual income is&nbsp<b>${actualincround}</b>&nbspand you have to donate&nbsp<b>${charityround}</b>`;
                        }
                    } else if (this.interest == 0 && this.principal > 0) {
                        var result = document.querySelector("#output");
                        result.innerHTML = `Your actual income is&nbsp<b>${this.principal}</b>&nbspand you have to donate&nbsp<b>${this.interest}</b>`;
                    } else if (this.interest == 0 && this.principal == 0) {
                        var result = document.querySelector("#output");
                        result.innerHTML = `Your actual income is&nbsp<b>${this.principal}</b>&nbspand you have to donate&nbsp<b>${this.interest}</b>`;
                    }
                    else {
                        var result = document.querySelector("#output");
                        result.innerHTML = "Something's wrong. Please enter a valid number and try again.";
                    }
                    // return actualincround, charityround;
                }
            }
            var principalamount = (document.querySelector("#principalamount").value);
            var interestamount = (document.querySelector("#interestamount").value);
            var inflationrate = (document.querySelector("#inflationrate").value);
            var incomecalculate = new Donate(principalamount, interestamount, inflationrate).calcincome();
            document.querySelector("#actualincome").disabled = true;
            return false;
        }
    // }
    document.querySelector("#btn").disabled = true;
    document.querySelector("#drop-down-2").onchange = () => {
        document.querySelector("#btn").disabled = false;
        document.querySelector("#form-2").onsubmit = () => {
            const fromcurrency = document.querySelector("#drop-down-1").value;
            var url = new URL("https://api.exchangeratesapi.io/latest?base=USD");
            var search_params = url.searchParams;
            let Base = search_params.set('base', fromcurrency);
            url.search = search_params.toString();
            var new_url = url.toString();
            console.log(new_url);
            fetch(new_url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const tocurrency = document.querySelector("#drop-down-2").value;
                    const rate = data.rates[tocurrency];
                    console.log(rate);
                    if (rate !== undefined) {
                        var convertactualvarfrom = document.getElementById("convertactualincome").value;
                        var convertactualvarto = convertactualvarfrom*rate;
                        var convertdonationfrom = document.getElementById("convertdonationamount").value;
                        var convertdonationto = convertdonationfrom*rate;
                        document.querySelector("#result").innerHTML = `${convertactualvarfrom} ${fromcurrency} = ${convertactualvarto.toFixed(3)} ${tocurrency}`;
                        document.querySelector("#result-2").innerHTML = `${convertdonationfrom} ${fromcurrency} = ${convertdonationto.toFixed(3)} ${tocurrency}`;
                        document.querySelector("#btn").disabled = true;
                    }
                    else {
                        document.querySelector("#result").innerHTML = "Invalid Currency";
                        document.querySelector("#btn").disabled = true;
                    }
                }
                )
            document.querySelector("#btn").disabled = true;
            return false;
        }
    };
});