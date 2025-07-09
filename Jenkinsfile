pipeline {
    agent any
    stages {
        stage("Install & Build") {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    echo "Node Version:"
                    node -v

                    echo "NPM Version:"
                    npm -v

                    echo "Clean npm cache and node_modules"
                    npm cache clean --force
                    rm -rf node_modules package-lock.json
                    
                    ls -la

                    echo "Install dependencies"
                    npm ci

                    echo "Build app"
                    npx ng build
                '''
            }
        }
    }
}
