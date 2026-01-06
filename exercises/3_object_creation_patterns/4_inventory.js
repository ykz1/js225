class Item {
  constructor(itemName, category, quantity) {
    if (this.invalidData(itemName, category, quantity)) return { notValid: true };

    this.itemName = itemName;
    this.category = category;
    this.quantity = quantity;
    this.skuCode = this.generateSku();
  }

  invalidData(itemName, category, quantity) {
    if (itemName.match(/[a-z]/gi).length < 5) return true;
    if (!category.match(/^[a-z]{5,}$/gi)) return true;
    if (typeof quantity !== 'number' || quantity < 0) return true;
  }

  generateSku() {
    return `${this.itemName.slice(0, 3).toUpperCase()}${this.category.substring(0, 2).slice().toUpperCase()}`
  }

}

let ItemManager = {
  items: [],
  create(itemName, category, quantity) {
    let item = new Item(itemName, category, quantity);
    if (item.notValid) {
      return false;
    } else {
      this.items.push(item);
      return item;
    }
  },
  update(skuCode, itemInfo) {
    let item = this.items.find(item => item.skuCode === skuCode);
    if (item) {
      for (let key in itemInfo) {
        item[key] = itemInfo[key];
      }
    }
  },
  delete(skuCode) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].skuCode === skuCode) {
        this.items.splice(i, 1);
        return;
      }
    }
  },
  inStock() {
    return this.items.filter(item => item.quantity > 0);
  },
  itemsInCategory(category) {
    return this.items.filter(item => item.category === category);
  },
}

let ReportManager = {
  init(itemManager) {
    this.itemManager = itemManager;
  },
  createReporter(skuCode) {
    const item = this.itemManager.items.find(item => item.skuCode === skuCode);
    return {
      itemInfo() {
        Object.entries(item).forEach(([label, value]) => {
          console.log(`${label}: ${value}`);
        });
      }
    }
  },
  reportInStock() {
    console.log(this.itemManager.inStock().map(item => item.itemName).join(', '));
  },
}
ItemManager.create('basket ball', 'sports', 0);       // valid
console.log(ItemManager.items.map(item => item.itemName).join(', '));
ItemManager.create('asd', 'sports', 0);               // invalid (too short)
console.log(ItemManager.items.map(item => item.itemName).join(', '));
ItemManager.create('soccer ball', 'sports', 5);       // valid
console.log(ItemManager.items.map(item => item.itemName).join(', '));
ItemManager.create('football', 'sports');             // invalid (no quantity)
console.log(ItemManager.items.map(item => item.itemName).join(', '));
ItemManager.create('football', 'sports', 3);          // valid
console.log(ItemManager.items.map(item => item.itemName).join(', '));
ItemManager.create('kitchen pot', 'cooking items', 0);// invalid (category has space)
console.log(ItemManager.items.map(item => item.itemName).join(', '));
ItemManager.create('kitchen pot', 'cooking', 3);      // valid
console.log(ItemManager.items.map(item => item.itemName).join(', '));

ItemManager.items;
// => list with 4 valid items

ReportManager.init(ItemManager);
ReportManager.reportInStock();
// logs: soccer ball,football,kitchen pot

ItemManager.update('SOCSP', { quantity: 0 });
ItemManager.inStock();
// => football, kitchen pot

ReportManager.reportInStock();
// logs: football,kitchen pot

ItemManager.itemsInCategory('sports');
// => basket ball, soccer ball, football

ItemManager.delete('SOCSP');
ItemManager.items;
// => remaining 3 valid items (soccer ball removed)

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs:
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs:
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10