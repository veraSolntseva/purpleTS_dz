"use strict";
class Product {
    // id: number;
    // title: string;
    // price: number;
    // constructor(title: string, price: number) {
    //     this.id = Math.random();
    //     this.title = title;
    //     this.price = price;
    // }
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
}
class Delivery {
    constructor(date) {
        this.date = date;
    }
}
class HomeDelivery extends Delivery {
    constructor(date, adress) {
        super(date);
        this.adress = adress;
    }
}
class ShopDelivery extends Delivery {
    constructor(shopId) {
        super(new Date());
        this.shopId = shopId;
    }
}
class Cart {
    constructor() {
        this.products = [];
        this.delivery = null;
    }
    // constructor() {
    //     this.products = [];
    //     this.delivery = null;
    // }
    addProduct(product) {
        this.products.push(product);
    }
    deleteProduct(productId) {
        this.products = this.products.filter(p => p.id !== productId);
    }
    getSum() {
        return this.products.reduce((sum, prod) => sum + prod.price, 0);
    }
    setDelivery(shopIdOrAdress, date) {
        if (typeof shopIdOrAdress === 'string') {
            if (!!date) {
                this.delivery = new HomeDelivery(date, shopIdOrAdress);
            }
            else {
                this.delivery = null;
            }
        }
        else {
            this.delivery = new ShopDelivery(shopIdOrAdress);
        }
    }
    checkout() {
        return !!this.delivery && this.products.length > 0;
    }
    checkoutMaster() {
        if (this.products.length === 0) {
            throw new Error('Нет товаров в корзине');
        }
        if (!this.delivery) {
            throw new Error('Не указан способ доставки');
        }
        return { success: true };
    }
}
const cart = new Cart();
cart.setDelivery(5);
cart.setDelivery('Gorky st 38 67');
cart.addProduct(new Product(1, 'Carot', 12.5));
cart.addProduct(new Product(2, 'Tomato', 85.5));
cart.setDelivery('Gorky st 38 67', new Date('2024-06-25'));
cart.deleteProduct(1);
console.log(cart.getSum());
console.log(cart.checkout());
