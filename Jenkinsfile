pipeline {
	options {
		// Cap runtime
		timeout(time:45, unit:'MINUTES')
	}

	agent {
		label 'git && linux'
	}	
	
	stages {
		stage('Run API Regression Tests') {

			steps {
				// Run the tests
				sh "cd api && npm install && npm run build && npm run apiregression"
			}
			
			post {
				always {
					// Collect results
					junit 'test/api/bin/results/results.xml'
				}
			}
		}
		stage('Run UI Regression Tests') {

			steps {
				// Run the tests
				sh "cd ../ui && npm install && npm run uiregression"
			}
			
			post {
				always {
					// Collect results
					junit 'test/ui/bin/results/results.xml'
				}
			}
		}
	}
}
