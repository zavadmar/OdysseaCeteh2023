import { Component } from '@angular/core';
import { buildingsList } from './resources/buildings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  winPrice = 800;

  teams = [{
    name: "1",
    buildings: [] as any[],
    resources: {
      money: 500,
      wood: 0,
      stone: 0,
      brick: 0,
    },
    points: 0,
  }]

  buildings = buildingsList;

  marketResources = [{
    name: "Dřevo",
    propertyName: "wood",
    price: 50,
    discountPrice: 40,
  },
  {
    name: "Kámen",
    propertyName: "stone",
    price: 100,
    discountPrice: 90,
  },
  {
    name: "Cihla",
    propertyName: "brick",
    price: 150,
    discountPrice: 140,
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
      const income = building.incomeFn != null ? building.incomeFn(team) : building.income;
      team.resources.money += income?.money ?? 0;
      team.resources.brick += income?.brick ?? 0;
      team.resources.wood += income?.wood ?? 0;
      team.resources.stone += income?.stone ?? 0;
    });
    this.log.push("Výnosy:");
    this.log.push("- peníze: " + (team.resources.money - startMoney));
    this.log.push("- dřevo: " + (team.resources.wood - startWood));
    this.log.push("- kámen: " + (team.resources.stone - startStone));
    this.log.push("- cihly: " + (team.resources.brick - startBrick));
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
        team.points += this.countResourcesToMoney(building);
        this.log.push("Nákup: " + building.name);
      }
  }

  public countResourcesToMoney(building: any) {
    return building.price.money
    + building.price.wood * this.marketResources[0].price 
    + building.price.stone * this.marketResources[1].price 
    + building.price.brick * this.marketResources[2].price;
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
