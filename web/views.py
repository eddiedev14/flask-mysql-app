from flask import Flask, render_template
from users.controllers.user_controller import user_controller
from products.controllers.product_controller import product_controller
from users.models.db import db

app = Flask(__name__)
app.config.from_object('config.Config')
db.init_app(app)

# Registrando el blueprint del controlador de usuarios y productos
app.register_blueprint(user_controller)
app.register_blueprint(product_controller)

# Ruta para renderizar las vies
@app.route('/dashboard_users')
def dashboard_users():
    return render_template('dashboard_users.html')

@app.route('/dashboard_products')
def dashboard_products():
    return render_template('dashboard_products.html')

@app.route('/edit_users/<string:id>')
def edit_user(id):
    return render_template('edit_users.html', id=id)

@app.route('/edit_products/<string:id>')
def edit_product(id):
    return render_template('edit_products.html', id=id)

if __name__ == '__main__':
    app.run()

