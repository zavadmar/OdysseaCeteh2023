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
    stats: {
      winPriceSum: 0,
      incomeSum: {
        money: 0,
        wood: 0,
        stone: 0,
        brick: 0,
      }
    },
    availableBuildings: [...buildingsList],
    log: [] as string[],
  },
  {
    name: "2",
    buildings: [] as any[],
    resources: {
      money: 500,
      wood: 0,
      stone: 0,
      brick: 0,
    },
    points: 0,
    stats: {
      winPriceSum: 0,
      incomeSum: {
        money: 0,
        wood: 0,
        stone: 0,
        brick: 0,
      }
    },
    availableBuildings: [...buildingsList],
    log: [] as string[],
  },
  {
    name: "3",
    buildings: [] as any[],
    resources: {
      money: 500,
      wood: 0,
      stone: 0,
      brick: 0,
    },
    points: 0,
    stats: {
      winPriceSum: 0,
      incomeSum: {
        money: 0,
        wood: 0,
        stone: 0,
        brick: 0,
      }
    },
    availableBuildings: [...buildingsList],
    log: [] as string[],
  },
  {
    name: "4",
    buildings: [] as any[],
    resources: {
      money: 500,
      wood: 0,
      stone: 0,
      brick: 0,
    },
    points: 0,
    stats: {
      winPriceSum: 0,
      incomeSum: {
        money: 0,
        wood: 0,
        stone: 0,
        brick: 0,
      }
    },
    availableBuildings: [...buildingsList],
    log: [] as string[],
  }]

  //buildings = [...buildingsList];

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

  addPrice(team: any, winPrice: number) {
    team.resources.money += winPrice;
    team.log.push("Výhra " + winPrice)
    team.stats.winPriceSum += winPrice;
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
      team.stats.incomeSum.money += income?.money ?? 0;
      team.stats.incomeSum.brick += income?.brick ?? 0;
      team.stats.incomeSum.wood += income?.wood ?? 0;
      team.stats.incomeSum.stone += income?.stone ?? 0;
    });
    team.log.push("Výnosy:");
    team.log.push("- peníze: " + (team.resources.money - startMoney));
    team.log.push("- dřevo: " + (team.resources.wood - startWood));
    team.log.push("- kámen: " + (team.resources.stone - startStone));
    team.log.push("- cihly: " + (team.resources.brick - startBrick));
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
        team.availableBuildings = team.availableBuildings.filter((x: any) => x.name !== building.name);
        team.points += this.countResourcesToMoney(building);
        team.log.push("Nákup: " + building.name);
      }
  }

  public countResourcesToMoney(building: any) {
    return building.price.money
    + building.price.wood * this.marketResources[0].price 
    + building.price.stone * this.marketResources[1].price 
    + building.price.brick * this.marketResources[2].price;
  }

  public countResourcesToMoneyWithDiscount(building: any) {
    return building.price.money
    + building.price.wood * this.marketResources[0].discountPrice 
    + building.price.stone * this.marketResources[1].discountPrice 
    + building.price.brick * this.marketResources[2].discountPrice;
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
          team.log.push("Nákup dřevo: 1 za " + price);
        break;
        case "stone": team.resources.stone++;
          team.log.push("Nákup kámen: 1 za " + price);
        break;
        case "brick": team.resources.brick++;
          team.log.push("Nákup cihly: 1 za " + price);
        break;
        default: break;
      }
    }
  }

  private bigPrice = [800, 600, 400, 200];
  private smallPrice = [400, 300, 200, 100];

  prices = [
    [
      this.bigPrice,
    ],
    [
      this.bigPrice,
      this.smallPrice,
    ],
    [
      this.bigPrice,
      this.smallPrice,
      this.smallPrice,
    ],
    [
      this.bigPrice,
    ],
    [
      this.bigPrice,
      this.smallPrice,
      this.smallPrice,
    ],
    [
      this.bigPrice,
    ],
    [
      this.bigPrice,
      this.smallPrice,
      this.smallPrice,
    ],
    [
      this.bigPrice,
    ],
    [
      this.bigPrice,
      this.smallPrice,
    ],
    [
      this.bigPrice,
    ]
  ]

  maxPrices = this.prices.map(x => [...x.map(y => [y[0]])]);
  minPrices = this.prices.map(x => [...x.map(y => [y[3]])]);

  simulateRandom(team: any, prices: number[][][]) {
    prices.forEach((day, index) => {
      team.log.push("------Den " + index + "-----");
      day.forEach(dayPrice => {
        this.addPrice(team, dayPrice[this.getRandomInt(dayPrice.length)])
      });

      this.buyAvailableBuilding(team);
      if (team.buildings.some((x: any) => x.name === "Stavitel")) {
        this.buyAvailableBuilding(team);
      }
      this.addIncome(team);
    });
  }

  simulateTeams(random = false) {
    const shuffledPrices = this.prices.map(x => x.map(y => this.shuffle(y)));
    shuffledPrices.forEach((day, index) => {
    this.teams.forEach((team, teamIndex) => {
      team.log.push("------Den " + index + "-----");
      day.forEach(dayPrice => {
        this.addPrice(team, dayPrice[teamIndex])
      });

      this.buyAvailableBuilding(team, random);
      if (team.buildings.some((x: any) => x.name === "Stavitel")) {
        this.buyAvailableBuilding(team);
      }
      this.addIncome(team);
    });
    });
  }

  private shuffle(array: number[]) {
    return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  }

  private buyAvailableBuilding(team: any, randomChoose = false) {
    const available = team.availableBuildings.filter((x: any) => this.canBuy(team, x));
      if (available.length > 0) {
        let toBuild = null;
        if (randomChoose) {
          toBuild = available[this.getRandomInt(available.length)];
        }
        else {
          toBuild = available.sort((a: any, b: any) => b.priority - a.priority)[0];
        } 

        for(let i = team.resources.wood; i < toBuild.price.wood; i++) {
          this.buyResource(team, this.marketResources.find(x => x.propertyName === "wood"));
        }
        for(let i = team.resources.stone; i < toBuild.price.stone; i++) {
          this.buyResource(team, this.marketResources.find(x => x.propertyName === "stone"));
        }
        for(let i = team.resources.brick; i < toBuild.price.brick; i++) {
          this.buyResource(team, this.marketResources.find(x => x.propertyName === "brick"));
        }
        this.buy(team, toBuild);
      }
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  public countIncomeRate(team: any, building: any) {
    const price = this.countResourcesToMoney(building);
    const income = building.incomeFn != null ? building.incomeFn(team) : building.income;
    const incomeMoney = income.money 
    + (income?.wood ?? 0) * (this.marketResources.find(x => x.propertyName === "wood")?.price ?? 0)
    + (income?.stone ?? 0) * (this.marketResources.find(x => x.propertyName === "stone")?.price ?? 0)
    + (income?.brick ?? 0) * (this.marketResources.find(x => x.propertyName === "brick")?.price ?? 0);
    return incomeMoney / price;
  }

  public countIncomeDiscountRate(team: any, building: any) {
    const price = this.countResourcesToMoneyWithDiscount(building);
    const income = building.incomeFn != null ? building.incomeFn(team) : building.income;
    const incomeMoney = income.money 
    + (income?.wood ?? 0) * (this.marketResources.find(x => x.propertyName === "wood")?.price ?? 0)
    + (income?.stone ?? 0) * (this.marketResources.find(x => x.propertyName === "stone")?.price ?? 0)
    + (income?.brick ?? 0) * (this.marketResources.find(x => x.propertyName === "brick")?.price ?? 0);
    return incomeMoney / price;
  }

  private canBuy(team: any, building: any): boolean {
    const needWood = Math.max(0, building.price.wood - team.resources.wood);
    const needStone = Math.max(0, building.price.stone - team.resources.stone);
    const needBrick = Math.max(0, building.price.brick - team.resources.brick);

    let needMoney = 0;
    if (team.buildings.some((x: any) => x.hasDiscount)) {
      needMoney = 
        needWood * this.marketResources[0].discountPrice
        + needStone * this.marketResources[1].discountPrice
        + needBrick * this.marketResources[2].discountPrice;
    }
    else {
      needMoney = 
        needWood * this.marketResources[0].price
        + needStone * this.marketResources[1].price
        + needBrick * this.marketResources[2].price;
    }
    return team.resources.money > needMoney;
  }
}

