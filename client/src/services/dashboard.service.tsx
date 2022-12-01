import {LoginService} from './login.service'

export class DashboardService {
    URL = 'http://localhost:8888/api/dashboard/'

    // async getMaxRatingPolicies(){
    //     let res = await fetch(`${this.URL}maxRatings`, {
    //         method: 'GET',
    //         referrerPolicy: 'no-referrer',
    //         headers: {
    //             "Authorization": `Bearer ${LoginService.getToken()}`,
    //         }
    //     })

    //     let body = res.json()
    //     return body
    // }

    async getUserCountByState() {
        let res = await fetch(`${this.URL}getUserCountByState`, {
            method: 'GET',
            referrerPolicy: 'no-referrer',
            headers: {
                "Authorization": `Bearer ${LoginService.getToken()}`,
            }
        })

        let body = res.json()
        return body
    }

    async getPolicyTypeCount() {
        let res = await fetch(`${this.URL}getPolicyCounts`, {
            method: 'GET',
            referrerPolicy: 'no-referrer',
            headers: {
                "Authorization": `Bearer ${LoginService.getToken()}`,
            }
        })

        let body: {data: {}} = await res.json()
        let data = body.data

        console.log(data)

        let labels = ['Auto', 'Medical', 'Home']

        const chartData = {
            labels,
            datasets: [
              {
                label: '# of Policies',
                data: labels.map(label => data[label]),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
              },
            ],
          };

        return chartData

    }

    // async getUsersInCoverAmountRange(){
    //     let res = await fetch(`${this.URL}usersInCoverAmountRange`, {
    //         method: 'GET',
    //         referrerPolicy: 'no-referrer',
    //         headers: {
    //             "Authorization": `Bearer ${LoginService.getToken()}`,
    //         }
    //     })

    //     let body = res.json()
    //     return body
    // }
}