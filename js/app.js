document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#actualincome").disabled = true;
    console.log(document.querySelectorAll("div.show input"));
    var selectfield = document.querySelectorAll("div.show input");
    for (let i = 0; i < selectfield.length; i++) {
        selectfield[i].onkeyup = () => {
            document.querySelector("#actualincome").disabled = false;
        }
    }

    document.querySelector("form").onsubmit = () => {
        function calculateincome(principal, interest, inflation) {
            console.log(typeof interest);
            if (interest > 0 && principal > 0) {
                console.log(typeof interest);
                var result = document.querySelector("#output");
                var pminusint = principal - (interest);
                var rate = (interest * 100) / principal;
                console.log(typeof rate);
                if (rate >= inflation) {
                    if (pminusint >= 5000) {
                        var actualinc = (pminusint + ((inflation * pminusint) / 100) - ((2.5 / 100) * (pminusint)));
                        window.actualincround = actualinc.toFixed(2);
                        var charity = (principal - actualinc);
                        window.charityround = charity.toFixed(2);
                    }
                    else {
                        var actualinc = (pminusint + ((inflation * pminusint) / 100));
                        window.actualincround = actualinc.toFixed(2);
                        var charity = (principal - actualinc);
                        window.charityround = charity.toFixed(2);
                    }
                    result.innerHTML = `Your actual income is&nbsp<b>${window.actualincround}</b>&nbspand you have to donate&nbsp<b>${window.charityround}</b>`;
                } else {
                    var actualinc = pminusint - ((2.5 / 100 * pminusint));
                    window.actualincround = actualinc.toFixed(2);
                    var charity = principal - actualinc;
                    window.charityround = charity.toFixed(2);
                    result.innerHTML = `Your actual income is&nbsp<b>${window.actualincround}</b>&nbspand you have to donate&nbsp<b>${window.charityround}</b>`;
                }
            } else if (interest == 0 && principal > 0) {
                if (principal >= 5000) {
                    var result = document.querySelector("#output");
                    window.withoutint = principal - ((2.5 / 100) * principal);
                    window.woutintdonate = (2.5 / 100) * principal;
                    result.innerHTML = `Your actual income is&nbsp<b>${window.withoutint}</b>&nbspand you have to donate&nbsp<b>${window.woutintdonate}</b>`;
                }
                else {
                    var result = document.querySelector("#output");
                    result.innerHTML = `Your actual income is&nbsp<b>${principal}</b>&nbspand you have to donate&nbsp<b>${interest}</b>`;
                }
            } else if (interest == 0 && principal == 0) {
                var result = document.querySelector("#output");
                result.innerHTML = `Your actual income is&nbsp<b>${principal}</b>&nbspand you have to donate&nbsp<b>${interest}</b>`;
            }
            else if(interest > 0 && principal == 0){
                var result = document.querySelector("#output");
                result.innerHTML = `Your actual income is&nbsp<b>${principal}</b>&nbspand you have to donate&nbsp<b>${interest}</b>`;
            }
            else {
                var result = document.querySelector("#output");
                result.innerHTML = "Something's wrong. Please enter a valid number and try again.";
            }
        }
        var principalamount = (document.querySelector("#principalamount").value);
        var interestamount = (document.querySelector("#interestamount").value);
        var inflationrate = (document.querySelector("#inflationrate").value);
        calculateincome(principalamount, interestamount, inflationrate);
        document.querySelector("#actualincome").disabled = true;
        if (principalamount > 0 && interestamount > 0) {
            document.querySelector("#convertactualincome").value = window.actualincround;
            document.querySelector("#convertdonationamount").value = window.charityround;
        }
        else if (interestamount == 0 && principalamount > 0) {
            if (principalamount >= 5000) {
                document.querySelector("#convertactualincome").value = window.withoutint;
                document.querySelector("#convertdonationamount").value = window.woutintdonate;
            }
            else {
                document.querySelector("#convertactualincome").value = principalamount;
                document.querySelector("#convertdonationamount").value = interestamount;
            }
        }
        else if (interestamount == 0 && principalamount == 0) {
            document.querySelector("#convertactualincome").value = principalamount;
            document.querySelector("#convertdonationamount").value = interestamount;
        }
        else if (interestamount > 0 && principalamount == 0) {
            document.querySelector("#convertactualincome").value = principalamount;
            document.querySelector("#convertdonationamount").value = interestamount;
        }
        // document.querySelector("#convertactualincome").value = window.actualincround;
        // document.querySelector("#convertdonationamount").value = window.charityround;
        return false;
    }
    // });
    //conversion
    document.querySelector("#btn").disabled = true;
    var selectconvertfield = document.querySelectorAll("#convertactualincome, #convertdonationamount");
    console.log(selectconvertfield);
    for (let i = 0; i < selectconvertfield.length; i++) {
        selectconvertfield[i].onkeyup = () => {
            document.querySelector("#btn").disabled = false;
        }
    }
    var selectoption = document.querySelectorAll("select");
    console.log(selectoption);
    for (let i = 0; i < selectoption.length; i++) {
        selectoption[i].onchange = () => {
            document.querySelector("#btn").disabled = false;
        }
    }

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
                    // var convertactualvarfrom = window.actualincround;
                    var convertactualvarfrom = document.querySelector("#convertactualincome").value;
                    var convertactualvarto = convertactualvarfrom * rate;
                    // var convertdonationfrom = window.charityround;
                    var convertdonationfrom = document.querySelector("#convertdonationamount").value;
                    var convertdonationto = convertdonationfrom * rate;
                    document.querySelector("#result").innerHTML = `${convertactualvarfrom} ${fromcurrency} = ${convertactualvarto.toFixed(3)} ${tocurrency}`;
                    document.querySelector("#result-2").innerHTML = `${convertdonationfrom} ${fromcurrency} = ${convertdonationto.toFixed(3)} ${tocurrency}`;
                    document.querySelector("#btn").disabled = true;
                }
                else {
                    document.querySelector("#result").innerHTML = "Invalid Currency";
                    document.querySelector("#result-2").innerHTML = "Invalid Currency";
                    document.querySelector("#btn").disabled = true;
                }
            }
            )
        document.querySelector("#btn").disabled = true;
        return false;
    };
});