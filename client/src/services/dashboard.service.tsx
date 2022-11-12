export class DashboardService {
    URL = 'http://localhost:8888/api/dashboard/'

    async getMaxRatingPolicies(){
        let res = await fetch(`${this.URL}maxRatings`, {
            method: 'GET',
            referrerPolicy: 'no-referrer',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`,
            }
        })

        let body = res.json()
        return body
    }

    async getUsersInCoverAmountRange(){
        let res = await fetch(`${this.URL}usersInCoverAmountRange`, {
            method: 'GET',
            referrerPolicy: 'no-referrer',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`,
            }
        })

        let body = res.json()
        return body
    }
}