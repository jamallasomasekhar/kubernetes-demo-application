pipeline {
  agent any

  environment {
    DOCKERHUB_USER = credentials('dockerhub-username')
    DOCKERHUB_PASS = credentials('dockerhub-password')
    DOCKERHUB_REPO = 'jamallasomasekhar'
    FRONTEND_IMAGE = "${DOCKERHUB_REPO}/demo-frontend:latest"
    BACKEND_IMAGE = "${DOCKERHUB_REPO}/demo-backend:latest"
    SSH_USER = 'your-ssh-user'
    SSH_HOST = 'your.remote.host'
    HELM_RELEASE = 'demo-monolith'
    HELM_CHART_PATH = '~/k3s-demo/helm-chart'
  }

  stages {
    stage('Build Frontend Image') {
      steps {
        dir('frontend') {
          script {
            sh "docker build -t ${FRONTEND_IMAGE} ."
          }
        }
      }
    }
    stage('Build Backend Image') {
      steps {
        dir('backend') {
          script {
            sh "docker build -t ${BACKEND_IMAGE} ."
          }
        }
      }
    }
    stage('Push Images to Docker Hub') {
      steps {
        script {
          sh "echo ${DOCKERHUB_PASS} | docker login -u ${DOCKERHUB_USER} --password-stdin"
          sh "docker push ${FRONTEND_IMAGE}"
          sh "docker push ${BACKEND_IMAGE}"
        }
      }
    }
    stage('Helm Deploy via SSH') {
      steps {
        sshagent(['SSH_KEY']) {
          sh """
            ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} '
              helm upgrade --install ${HELM_RELEASE} ${HELM_CHART_PATH} --set image.frontend=${FRONTEND_IMAGE} --set image.backend=${BACKEND_IMAGE}
            '
          """
        }
      }
    }
  }
  post {
    always {
      sh "docker logout"
    }
  }
}