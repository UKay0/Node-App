pipeline {
    agent any
    environment {
        // Fixed port for Jenkins frontend deployment
        FRONTEND_PORT = '5001'  // Port for frontend on Jenkins deployment
        BACKEND_PORT  = '5000'
        COMPOSE_FILE = 'docker-compose.yml'  // Location of your compose file
        PROJECT_NAME = 'frontendProject'  // Project name for the Docker Compose deployment
    }
    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/AmnaKhan2003/Note-App'  // Replace with your GitHub repo URL
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    // Build Docker images for frontend
                    sh 'docker-compose -f ${COMPOSE_FILE} build'
                }
            }
        }
        
        stage('Deploy Frontend') {
            steps {
                script {
                    // Deploy the frontend with the specified port for Jenkins
                    sh """
                    FRONTEND_PORT=${FRONTEND_PORT} \
                    docker-compose -p ${PROJECT_NAME} -f ${COMPOSE_FILE} up -d
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    // Verify that the frontend container is running after deployment
                    sh "docker ps"
                }
            }
        }
    }
    post {
        success {
            echo 'Frontend deployment successful!'
        }
        failure {
            echo 'Deployment failed. Please check the logs.'
        }
    }
}