document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").onsubmit = () => {
        class Donate {
            constructor(principal, interest, inflation) {
                this.principal = principal;
                this.interest = interest;
                this.inflation = inflation;
            }
            calcincome() {
                if (this.interest > 0) {
                    var result = document.querySelector("#output");
                    var pminusint = this.principal - this.interest;
                    var rate = (this.interest * 100) / this.principal;
                    if (rate >= this.inflation) {
                        var actualinc = (pminusint + ((this.inflation * pminusint) / 100));
                        var actualincround = actualinc.toFixed(2);
                        var charity = (this.principal - actualinc);
                        var charityround = charity.toFixed(2);
                        console.log(actualincround);
                        result.innerHTML = `Your actual income is&nbsp<b>${actualincround}</b>&nbspand you have to donate&nbsp<b>${charityround}</b>`;
                    } else {
                        var actualinc = (pminusint);
                        var actualincround = actualinc.toFixed(2);
                        var charity = (this.principal - actualinc);
                        var charityround = charity.toFixed(2);
                        console.log(actualincround);
                        result.innerHTML = `Your actual income is&nbsp<b>${actualincround}</b>&nbspand you have to donate&nbsp<b>${charityround}</b>`;
                    }
                } else {
                    result.innerHTML = `Your actual income is&nbsp<b>${this.principal}</b>`;
                }
            }
        }
        var principalamount = document.querySelector("#principalamount").value;
        var interestamount = document.querySelector("#interestamount").value;
        var inflationrate = document.querySelector("#inflationrate").value;
        var incomecalculate = new Donate(principalamount, interestamount, inflationrate).calcincome();
        return false;
    }
});