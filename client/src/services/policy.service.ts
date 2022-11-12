
export class PolicyService {
    URL = 'http://localhost:8888/'

    async addPolicy(formData) {
        const data = {
            name: formData.name,
            coverAmt: Number(formData.coverAmt),
            policyType: Number(formData.policyType),
            premiumPA: Number(formData.premiumPA),
            premiumPM: Number(formData.premiumPM)
        }
        
        let res = await fetch(`${this.URL}insurance/addPolicy`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": 'application/json'
            }
        })




    }

    async getAllPolicies() {
        let res = await fetch(`${this.URL}insurance/getAllPolicies`, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMTY2LCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoyfSwiaWF0IjoxNjY4MjI2NjI4LCJleHAiOjE2NjgzMTMwMjh9.YQopiEoehIEA_b39-hlwQr2MMyHBpUQefRDMY9_8PQQ"
            }
        })
        let body = res.json()

        return body
    }

}