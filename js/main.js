document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#actualincome").disabled = true;
    document.getElementById("inflationrate").onkeyup = () => {
        document.querySelector("#actualincome").disabled = false;
        document.querySelector("form").onsubmit = () => {
            class Donate {
                constructor(principal, interest, inflation) {
                    this.principal = principal;
                    this.interest = interest;
                    this.inflation = inflation;
                }
                calcincome() {
                    console.log(typeof this.interest);
                    if (this.interest > 0) {
                        console.log(typeof this.interest);
                        var result = document.querySelector("#output");
                        var pminusint = this.principal - (this.interest);
                        console.log(typeof pminusint);
                        var rate = (this.interest * 100) / this.principal;
                        if (rate >= this.inflation) {
                            var actualinc = (pminusint + ((this.inflation * pminusint) / 100));
                            var actualincround = actualinc.toFixed(2);
                            var charity = (this.principal - actualinc);
                            var charityround = charity.toFixed(2);
                            console.log(actualincround);
                            result.innerHTML = `Your actual income is&nbsp<b>${actualincround}</b>&nbspand you have to donate&nbsp<b>${charityround}</b>`;
                        } else {
                            var actualinc = pminusint;
                            var actualincround = actualinc.toFixed(2);
                            var charity = this.principal - actualinc;
                            var charityround = charity.toFixed(2);
                            console.log(actualincround);
                            result.innerHTML = `Your actual income is&nbsp<b>${actualincround}</b>&nbspand you have to donate&nbsp<b>${charityround}</b>`;
                        }
                    } else if (this.interest == 0) {
                        var result = document.querySelector("#output");
                        result.innerHTML = `Your actual income is&nbsp<b>${this.principal}</b>`;
                    }
                    else {
                        var result = document.querySelector("#output");
                        result.innerHTML = "Something's wrong. Please enter a valid number and try again.";
                    }
                }
            }
            var principalamount = (document.querySelector("#principalamount").value);
            var interestamount = (document.querySelector("#interestamount").value);
            var inflationrate = (document.querySelector("#inflationrate").value);
            var incomecalculate = new Donate(principalamount, interestamount, inflationrate).calcincome();
            document.querySelector("#actualincome").disabled = true;
            return false;
        }
    }
});