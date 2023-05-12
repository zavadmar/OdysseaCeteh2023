import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  winPrice = 0;

  teams = [{
    name: "1",
    buildings: [] as any[],
    resources: {
      money: 500,
      wood: 0,
      stone: 0,
      brick: 0,
    }
  }]

  buildings = [{
    name: "Pila",
    income: { wood: 1 },
    price: { wood: 2, stone: 1, brick: 1, money: 0 }
  },
  {
    name: "Kamenolom",
    income: { stone: 1 },
    price: { wood: 1, stone: 1, brick: 3, money: 0 }
  },
  {
    name: "Cihelna",
    income: { brick: 1 },
    price: { wood: 5, stone: 3, brick: 1, money: 0 }
  },
  {
    name: "Tržiště",
    hasDiscount: true,
    income: {},
    price: { wood: 2, stone: 2, brick: 2, money: 0 }
  },
]

  marketResources = [{
    name: "Dřevo",
    propertyName: "wood",
    price: 100,
    discountPrice: 50,
  },
  {
    name: "Kámen",
    propertyName: "stone",
    price: 200,
    discountPrice: 100,
  },
  {
    name: "Cihla",
    propertyName: "brick",
    price: 300,
    discountPrice: 150,
  }];

  log: string[] = [];

  addPrice(team: any) {
    team.resources.money += this.winPrice;
    this.log.push("Výhra " + this.winPrice)
  }

  addIncome(team: any) {
    const startMoney = team.resources.money;
    const startWood = team.resources.wood;
    const startStone = team.resources.stone;
    const startBrick = team.resources.brick;

    team.buildings.forEach((building: any) => {
      team.resources.money += building.income.money ?? 0;
      team.resources.brick += building.income.brick ?? 0;
      team.resources.wood += building.income.wood ?? 0;
      team.resources.stone += building.income.stone ?? 0;
    });
    this.log.push("Výnos peníze: " + (team.resources.money - startMoney));
    this.log.push("Výnos dřevo: " + (team.resources.wood - startWood));
    this.log.push("Výnos kámen: " + (team.resources.stone - startStone));
    this.log.push("Výnos cihly: " + (team.resources.brick - startBrick));
  }

  buy(team: any, building: any) {
    console.log(building);

    if (team.resources.money >= building.price.money
      && team.resources.stone >= building.price.stone
      && team.resources.wood >= building.price.wood
      && team.resources.brick >= building.price.brick) {
        team.resources.money -= building.price.money;
        team.resources.stone -= building.price.stone;
        team.resources.wood -= building.price.wood;
        team.resources.brick -= building.price.brick;
        team.buildings.push(building);
        this.buildings = this.buildings.filter(x => x.name !== building.name);
        this.log.push("Nákup: " + building.name);
      }
  }

  buyResource(team: any, resource: any) {
    let price = resource.price;

    if (team.buildings.some((x: any) => x.hasDiscount === true)) {
      price = resource.discountPrice;
    }

    if (team.resources.money >= price) {
      team.resources.money -= price;
      switch(resource.propertyName) {
        case "wood": team.resources.wood++;
          this.log.push("Nákup dřevo: 1 za " + price);
        break;
        case "stone": team.resources.stone++;
          this.log.push("Nákup kámen: 1 za " + price);
        break;
        case "brick": team.resources.brick++;
        this.log.push("Nákup cihly: 1 za " + price);
        break;
        default: break;
      }
    }
  }
}
