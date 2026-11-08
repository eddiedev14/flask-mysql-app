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

# Install Python build deps and venv tooling
sudo apt install python3-dev default-libmysqlclient-dev build-essential pkg-config mysql-client python3-pip python3-venv python3-full -y

# Create and populate a virtual environment (required on externally-managed Python installs)
VENV_DIR="$REPO_DIR/venv"
python3 -m venv "$VENV_DIR"

"$VENV_DIR/bin/pip" install --upgrade pip
"$VENV_DIR/bin/pip" install Flask==2.3.3
"$VENV_DIR/bin/pip" install flask-cors
"$VENV_DIR/bin/pip" install Flask-MySQLdb
"$VENV_DIR/bin/pip" install Flask-SQLAlchemy

echo "Listo. Para correr la app:"
echo "  cd $REPO_DIR/webapp"
echo "  source $VENV_DIR/bin/activate"
echo "  export FLASK_APP=run.py"
echo "  flask run --host=0.0.0.0"
