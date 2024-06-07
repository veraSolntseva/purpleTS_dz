"use strict";
var { murmurHash3 } = require("murmurhash3js");
class MyMap {
    constructor() {
        this._buckets = {};
    }
    hashKey(key) {
        const h = murmurHash3.x86.hash32(key);
        if (typeof h === 'number') {
            return h;
        }
        throw new Error('Не смогли вычислить ключ');
    }
    getBucket(hashKey) {
        return this._buckets[hashKey];
    }
    getEntry(bucket, key) {
        for (let e of bucket) {
            if (e.key === key) {
                return e;
            }
        }
        return null;
    }
    set(key, value) {
        const hash = this.hashKey(key);
        const bucket = this.getBucket(hash);
        if (!!bucket) {
            const entry = this.getEntry(bucket, key);
            if (entry) {
                entry.value = value;
                return;
            }
            bucket.push({ key, value });
            return;
        }
        this._buckets[hash] = [{ key, value }];
    }
    get(key) {
        const hash = this.hashKey(key);
        const bucket = this.getBucket(hash);
        if (!bucket) {
            return null;
        }
        const entry = this.getEntry(bucket, key);
        if (entry) {
            return entry.value;
        }
        return null;
    }
    delete(key) {
        const hash = this.hashKey(key);
        let bucket = this.getBucket(hash);
        if (!bucket) {
            return;
        }
        if (bucket.length === 1) {
            delete this._buckets[hash];
            return;
        }
        bucket = bucket.filter(b => b.key !== key);
    }
    clear() {
        this._buckets = [];
    }
}
const mm = new MyMap();
mm.set(2, 'foo');
mm.set('2', 'foo');
mm.set(2, 112);
console.log(mm.get(2));
mm.delete('2');
console.log(mm);
mm.clear();
console.log(mm);
