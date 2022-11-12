import {sessionQuery} from '../stores/session.query'

export class PolicyService {
    URL = 'http://localhost:5000/'

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
                "Authorization": `Bearer ${sessionQuery.token}`
            }
        })
        let body = res.json()

        return body
    }

}