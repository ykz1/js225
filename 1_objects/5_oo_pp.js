let makeTool = function(id, name, stock, price) {
  return {
    id,
    name,
    stock,
    price,
    setPrice(price) {
      if (typeof price !== 'number' || price < 0) {
        console.log(`Invalid price.`);
      } else {
        this.price = price; 
      }
    },
    describe() {
      console.log(`=> Name: ${this.name}`);
      console.log(`=> ID: ${this.id}`);
      console.log(`=> Price: $${this.price}`);
      console.log(`=> Stock: ${this.stock}`);
    }
  }
}

let scissors = makeTool(0, 'Scissors', 8, 10);
let drill = makeTool(1, 'Drill', 15, 45);

console.log(scissors);
console.log(drill);

drill.setPrice(-50);
drill.setPrice(50);
drill.describe();

let screwdriver = makeTool(2, 'Screwdriver', 10, 11);
screwdriver.describe();