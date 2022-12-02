import {sessionQuery} from '../stores/session.query'
import { LoginService } from "./login.service" 

export class PolicyService {

    // loginService = new LoginService()

    URL = 'http://localhost:8888/'

    async addPolicy(formData) {
        const data = {
            name: formData.name,
            coverAmt: Number(formData.coverAmt),
            policyType: Number(formData.policyType),
            premiumPA: Number(formData.premiumPA),
            premiumPM: Number(formData.premiumPM),
            tags: formData.tags
        }

        console.log(data)
        
        let res = await fetch(`${this.URL}insurance/addPolicy`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${LoginService.getToken()}`
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
                "Authorization": `Bearer ${LoginService.getToken()}`
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
                "Authorization": `Bearer ${LoginService.getToken()}`
            }
        })

        return res
    }

    async updateRating(policyId, rating) {

        const data = {
            rating,
            policyId
        }
        let res = await fetch(`${this.URL}insurance/updateRating`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${LoginService.getToken()}`
            }
        })
        let body = res.json()

        return body


    }

    async getPolicyById(id) {
        let res = await fetch(`${this.URL}insurance/getPolicy/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${LoginService.getToken()}`
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
                "Authorization": `Bearer ${LoginService.getToken()}`
            }
        })
        return res
    }

    async getTags() {
        let res = await fetch(`${this.URL}api/getTags`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            }
        })

        return res.json()
    }

}