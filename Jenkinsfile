pipeline {
    agent any
    stages{
        stage("build"){
            agent {
                docker {
                    image 'node:22-alpine'
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
