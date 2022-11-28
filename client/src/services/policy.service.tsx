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
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })

        if(res.ok) {
            return
        } else {
            throw Error('Error in creating policy')
        }
    }

    async getAllPolicies(searchString, page, pageCount) {
        const data = {
            searchString,
            page,
            pageCount
        }
        let res = await fetch(`${this.URL}insurance/getAllPolicies`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
        let body = res.json()

        return body
    }

    async deletePolicy(id) {
        let res = await fetch(`${this.URL}insurance/deletePolicy/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })

        return res
    }

    async getPolicyById(id) {
        let res = await fetch(`${this.URL}insurance/getPolicy/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
        const body = res.json()
        return body
    }

    async updatePolicyById(policyData) {
        let res = await fetch(`${this.URL}insurance/updatePolicy`, {
            method: 'PUT',
            body: JSON.stringify(policyData),
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
            }
        })
        return res
    }

}