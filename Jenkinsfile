pipeline {
    agent any
    stages{
        stage("build"){
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                }
            }
            steps{
                sh '''
                    node --version
                    npm --version
                    npm ci
                    npx ng build
                
                '''
            }
        } 
    }
}
