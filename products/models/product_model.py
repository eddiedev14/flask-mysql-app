from users.models.db import db

class Products(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(10,2), nullable=False)

    def __init__(self, name, stock, price):
        self.name = name
        self.stock = stock
        self.price = price

