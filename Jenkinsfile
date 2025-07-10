pipeline {
  agent any

  stages {
    stage("Install & Build") {
      agent {
            docker {
            image 'node:20'                      
            reuseNode true
            args '--network=host -u root'        
        }
      }

      environment {
        NPM_CONFIG_LOGLEVEL      = 'warn'
        NPM_CONFIG_RETRY         = '5'
        NPM_CONFIG_FETCH_RETRIES = '5'
      }

      steps {
        sh '''
          set -e

          echo "=== Versions ==="
          node -v
          npm -v

          echo
          echo "=== DNS Resolver (should NOT just be 127.0.0.11) ==="
          cat /etc/resolv.conf

          echo
          echo "=== Clean cache ==="
          npm cache clean --force

          echo
          echo "=== Install dependencies ==="
          if [ -f package-lock.json ]; then
            echo "Running npm ci"
            npm ci --no-audit --no-fund || {
              echo "npm ci failed → falling back to npm install"
              npm install --no-audit --no-fund
            }
          else
            echo "No package-lock.json → npm install"
            npm install --no-audit --no-fund
          fi

          echo
          echo "=== Build app (via npx) ==="
          npx ng build --configuration=production
        '''
      }
      post {
        success{
          archiveArtifacts artifacts: 'dist/**'
        }
      }
    }

    stage('Test'){
      agent {
        docker {
          image 'node:20'
          reuseNode true
          args '--network=host -u root'
        }
      }
        steps{
            echo "test "
            sh '''
              test -f dist/employee-management-system/browser/index.html

              echo "=== Run Angular tests with JUnit reporter ==="
              npx ng test --watch=false --browsers=ChromeHeadless
            '''
        }
      post {
        always {
          junit 'test-results/junit-report.xml'
        }
      }
    }
  }

}
