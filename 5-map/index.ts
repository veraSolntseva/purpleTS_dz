var { murmurHash3 } = require("murmurhash3js");

type Entry = { key: any, value: any };
type Bucket = Entry[];

class MyMap {
    private _buckets: Record<number, Bucket> = {};

    private hashKey(key: any): number {
        const h = murmurHash3.x86.hash32(key);
        if (typeof h === 'number') {
            return h;
        }

        throw new Error('Не смогли вычислить хэш ключа');
    }

    private getBucket(hashKey: number): Bucket | undefined {
        return this._buckets[hashKey];
    }

    private getEntry(bucket: Bucket, key: any): Entry | null {
        for (let e of bucket) {
            if (e.key === key) {
                return e;
            }
        }
        return null;
    }

    set(key: any, value: any): void {
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

    get(key: any): any {
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

    delete(key: any): void {
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
mm.delete('2');
mm.clear();