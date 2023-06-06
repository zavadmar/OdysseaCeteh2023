export const buildingsList = [{
    name: "Pila",
    income: { wood: 1, stone: 0, brick: 0, money: 0 },
    price: { wood: 2, stone: 2, brick: 1, money: 0 },
    priority: 100
  },
  {
    name: "Kamenolom",
    income: { wood: 0, stone: 1, brick: 0, money: 0 },
    price: { wood: 3, stone: 2, brick: 3, money: 0 },
    priority: 700
  },
  {
    name: "Cihelna",
    income: { wood: 0, stone: 0, brick: 1, money: 0 },
    price: { wood: 6, stone: 3, brick: 4, money: 0 },
    priority: 800,
  },
  {
    name: "Tržiště",
    hasDiscount: true,
    income: { wood: 0, stone: 0, brick: 0, money: 0 },
    price: { wood: 3, stone: 3, brick: 5, money: 0 },
    priority: 600,
  },
  {
    name: "Hokynářství",
    income: { wood: 0, stone: 0, brick: 0, money: 100 },
    price: { wood: 4, stone: 3, brick: 3, money: 0 },
    priority: 50,
  },
  {
    name: "Banka",
    income: { wood: 0, stone: 0, brick: 0, money: 300 },
    price: { wood: 6, stone: 5, brick: 8, money: 0 },
    priority: 900,
  },
  {
    name: "Pošta",
    income: { wood: 0, stone: 0, brick: 0, money: 50 },
    price: { wood: 3, stone: 1, brick: 2, money: 0 },
    priority: 30,
  },
  {
    name: "Hotel",
    income: { wood: 0, stone: 0, brick: 0, money: 200 },
    price: { wood: 3, stone: 6, brick: 6, money: 0 },
    priority: 500,
  },
  {
    name: "Saloon",
    income: { wood: 0, stone: 0, brick: 1, money: 0 },
    price: { wood: 6, stone: 3, brick: 4, money: 0 },
    priority: 300,
  },
  {
    name: "Herna*",
    income: { wood: 0, stone: 0, brick: 0, money: 0 },
    incomeFn: (team:any) => {
        switch (getRandomInt(6)) {
            case 0: return { money: 50 }
            case 1: return { wood: 1 }
            case 2: return { stone: 1 }
            case 3: return { brick: 1 }
            case 4: return { money: 100 }
            case 5: return { money: 150 }
        }
        return;
    },
    price: { wood: 2, stone: 3, brick: 4, money: 0 },
    priority: 200,
  },
  {
    name: "Šerif*",
    income: { wood: 0, stone: 0, brick: 0, money: 0 },
    incomeFn: (team:any) => {
        const moneyBuildingsCount = team.buildings.filter((x: any) => (x.income?.money ?? 0) > 0).length;
        return { money: moneyBuildingsCount * 50 }
    },
    price: { wood: 5, stone: 7, brick: 3, money: 0 },
    priority: 400,
  },
  {
    name: "Stavitel",
    income: { wood: 0, stone: 0, brick: 0, money: 0 },
    price: { wood: 2, stone: 1, brick: 3, money: 0 },
    priority: 650,
  },
  {
    name: "Nádraží",
    income: { wood: 0, stone: 0, brick: 0, money: 150 },
    price: { wood: 5, stone: 3, brick: 6, money: 0 },
    priority: 100,
  },
  {
    name: "Kovárna",
    income: { wood: 0, stone: 0, brick: 0, money: 250 },
    price: { wood: 5, stone: 7, brick: 6, money: 0 },
    priority: 600,
  },
  {
    name: "Holič",
    income: { wood: 0, stone: 0, brick: 0, money: 80 },
    price: { wood: 5, stone: 2, brick: 2, money: 0 },
    priority: 200,
  },
  {
    name: "Hrobník",
    income: { wood: 0, stone: 0, brick: 0, money: 120 },
    price: { wood: 3, stone: 4, brick: 4, money: 0 },
    priority: 200,
  },
]

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }