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
  }]

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

  addPrice(team: any) {
    team.resources.money += this.winPrice;
  }

  addIncome(team: any) {
    team.buildings.forEach((building: any) => {
      team.resources.money += building.income.money ?? 0;
      team.resources.brick += building.income.brick ?? 0;
      team.resources.wood += building.income.wood ?? 0;
      team.resources.stone += building.income.stone ?? 0;
    });
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
      }
  }

  buyResource(team: any, resource: any) {
    if (team.resources.money >= resource.price) {
      team.resources.money -= resource.price;
      switch(resource.propertyName) {
        case "wood": team.resources.wood++;
        break;
        case "stone": team.resources.stone++;
        break;
        case "brick": team.resources.brick++;
        break;
        default: break;
      }
    }
  }
}
