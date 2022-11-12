import {sessionQuery} from '../stores/session.query'

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
        console.log(sessionQuery.token)
        let res = await fetch(`${this.URL}insurance/getAllPolicies`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
        let body = res.json()

        return body
    }

}