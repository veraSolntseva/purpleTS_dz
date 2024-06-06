class Product {
    // id: number;
    // title: string;
    // price: number;

    // constructor(title: string, price: number) {
    //     this.id = Math.random();
    //     this.title = title;
    //     this.price = price;
    // }

    constructor(
        public id: number,
        public title: string,
        public price: number
    ) { }
}

class Delivery {
    date: Date;

    constructor(date: Date) {
        this.date = date;
    }
}

class HomeDelivery extends Delivery {
    adress: string;

    constructor(date: Date, adress: string) {
        super(date);
        this.adress = adress;
    }
}

class ShopDelivery extends Delivery {
    shopId: number;

    constructor(shopId: number) {
        super(new Date());
        this.shopId = shopId;
    }
}

class Cart {
    private products: Product[] = [];
    private delivery: HomeDelivery | ShopDelivery | null = null;

    // constructor() {
    //     this.products = [];
    //     this.delivery = null;
    // }

    addProduct(product: Product): void {
        this.products.push(product);
    }

    deleteProduct(productId: number): void {
        this.products = this.products.filter(p => p.id !== productId);
    }

    getSum(): number {
        return this.products.reduce((sum: number, prod: Product) => sum + prod.price, 0);
    }

    setDelivery(adress: string, date?: Date): void;
    setDelivery(shopId: number): void;
    setDelivery(shopIdOrAdress: number | string, date?: Date) {
        if (typeof shopIdOrAdress === 'string') {
            if (!!date) {
                this.delivery = new HomeDelivery(date, shopIdOrAdress);
            } else {
                this.delivery = null;
            }
        } else {
            this.delivery = new ShopDelivery(shopIdOrAdress);
        }
    }

    checkout(): boolean {
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