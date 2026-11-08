#!/bin/bash
set -e

# Ruta del repo ya clonado (ajusta si tu carpeta se llama distinto)
REPO_DIR="$HOME/flask-mysql-app"

# Install MySQL
echo "Installing MySQL"

sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password root'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password root'

sudo apt update
sudo apt install mysql-server -y
sudo systemctl start mysql.service

# Create and fill Database
echo "Creating and filling database"
sudo mysql -h localhost -u root -proot < "$REPO_DIR/init.sql"

# Adding permissions to remote access
echo "Adding permissions to remote access"
sudo sed -i 's/127.0.0.1/0.0.0.0/g' /etc/mysql/mysql.conf.d/mysqld.cnf
sudo systemctl restart mysql.service

# Install Python Flask and Flask-MySQLdb
sudo apt install python3-dev default-libmysqlclient-dev build-essential pkg-config mysql-client python3-pip -y
pip3 install Flask==2.3.3
pip3 install flask-cors
pip3 install Flask-MySQLdb
pip3 install Flask-SQLAlchemy

echo "Listo. Para correr la app:"
echo "  cd $REPO_DIR/webapp"
echo "  export FLASK_APP=run.py"
echo "  python3 -m flask run --host=0.0.0.0"
