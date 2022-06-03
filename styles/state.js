function ready() {
  var element1 = document.getElementById("train");
  element1.classList.add("posH");
}
document.addEventListener("DOMContentLoaded", ready);

class TrafficLight {
  constructor() {
    this.states = [new GreenLight(), new RedLight(), new YellowLight()];
    this.current = this.states[0];
  }

  change() {
    const totalStates = this.states.length;
    let currentIndex = this.states.findIndex((light) => light === this.current);
    if (currentIndex + 1 < totalStates)
      this.current = this.states[currentIndex + 1];
    else this.current = this.states[0];
  }

  sign() {
    return this.current.sign();
  }
}

class Light {
  constructor(light) {
    this.light = light;
  }
}

class RedLight extends Light {
  constructor() {
    super("red");
  }

  sign() {
    return "STOP";
  }
}

class YellowLight extends Light {
  constructor() {
    super("yellow");
  }

  sign() {
    return "STEADY";
  }
}

class GreenLight extends Light {
  constructor() {
    super("green");
  }

  sign() {
    return "GO";
  }
}

// usage
const trafficLight = new TrafficLight();

console.log(trafficLight.sign()); // 'GO'
trafficLight.change();

console.log(trafficLight.sign()); // 'STOP'
trafficLight.change();

console.log(trafficLight.sign()); // 'STEADY'
trafficLight.change();

console.log(trafficLight.sign()); // 'GO'
trafficLight.change();

console.log(trafficLight.sign()); // 'STOP'

//ЕЩЕ ОДИН ВАРИАНТ, ПОСЛОЖНЕЕ
class GumballMachine {
  static gumballAmount;
  static soldCounter = 0;
  constructor(gumballNum) {
    if (!gumballNum) {
      throw new Error(
        `При создании ${this.constructor.name} не было указано изначальное количество шариков`
      );
    }
    GumballMachine.gumballAmount = gumballNum;
    this.states = {
      noCoin: new NoCoin(),
      isCoin: new IsCoin(),
      gumballSold: new GumballSold(),
      emptyMachine: new EmptyMachine(),
    };
    this.current = this.states.noCoin;
  }

  InsertCoin() {
    this.current.InsertCoin(this);
  }

  ReturnCoin() {
    this.current.ReturnCoin(this);
  }

  SellGumball() {
    this.current.SellGumball(this);
  }
  AddGumball(num) {
    GumballMachine.gumballAmount = num;
    this.current = this.states.noCoin;
    console.log("Жевачка добавлена в количестве: " + num + " шт.");
  }
}

//Классы состояний
class GumballStates {
  //
  InsertCoin() {
    throw new Error(`В ${this.constructor.name} не описан метод InsertCoin()`);
  }
  ReturnCoin() {
    throw new Error(`В ${this.constructor.name} не описан метод InsertCoin()`);
  }
  SellGumball() {
    throw new Error(`В ${this.constructor.name} не описан метод InsertCoin()`);
  }
}

//нет монетки
class NoCoin extends GumballStates {
  InsertCoin(machine) {
    let start = Date.now();

    let timer = setInterval(function () {
      let timePassed = Date.now() - start;

      train.style.left = timePassed / 5 + "px";

      if (timePassed > 2000) clearInterval(timer);
    }, 20);

    console.log("Монетка вставлена");
    machine.current = machine.states.isCoin;
  }
  ReturnCoin() {
    console.error(`Нельзя вернуть монетку т.к. она не вставлена`);
  }
  SellGumball() {
    console.error(`Нельзя продать жевачку т.к. не вставлена монетка`);
  }
}
// есть монетка
class IsCoin extends GumballStates {
  InsertCoin() {
    console.error(`Нельзя вставить монетку т.к. она уже вставлена`);
  }
  ReturnCoin(machine) {
    console.log("Монетка возвращена");
    machine.current = machine.states.noCoin;
  }
  SellGumball() {
    if (GumballMachine.gumballAmount > 0) {
      console.log(`Жевачка успешно продана и выдана!`);
      machine.current = machine.states.gumballSold;
      GumballMachine.gumballAmount = GumballMachine.gumballAmount - 1;
      GumballMachine.soldCounter += 1;
      console.log(GumballMachine.soldCounter);
      if (!(GumballMachine.soldCounter % 10)) {
        // если количество продаж кратно 10 - выдаем счастливую жвачку
        console.log(`Счастливая жевачка успешно выдана! LUCKY MAN!!!`);
      }
    } else {
      machine.current = machine.states.emptyMachine;
      console.log("Извините, монетки не принимаются т.к. аппарат пуст");
      console.log("Монетка возвращена");
    }
  }
}
// жевачка продана
class GumballSold extends GumballStates {
  InsertCoin(machine) {
    if (GumballMachine.gumballAmount > 0) {
      machine.current = machine.states.isCoin;
      console.log("Монетка вставлена");
    } else {
      machine.current = machine.states.emptyMachine;
      console.log("Извините, монетки не принимаются т.к. аппарат пуст");
    }
  }
  ReturnCoin() {
    console.error("Нельзя вернуть монетку т.к. жевачка уже выдана");
  }
  SellGumball() {
    console.error(`Нельзя продать жевачку т.к. она уже продана`);
  }
}
//автомат пустой, жевачек нет
class EmptyMachine extends GumballStates {
  InsertCoin() {
    console.log("Извините, монетки не принимаются т.к. аппарат пуст");
  }
  ReturnCoin() {
    console.error("Нельзя вернуть монетку т.к. монетка не вставлена");
  }
  SellGumball() {
    console.error(`Нельзя продать жевачку т.к. она автомат пуст`);
  }
}

// usage
const machine = new GumballMachine(1);
machine.InsertCoin();
machine.ReturnCoin();
machine.InsertCoin();
machine.SellGumball();
machine.InsertCoin();
machine.SellGumball();
machine.AddGumball(10);
machine.InsertCoin();
machine.SellGumball();
machine.InsertCoin();
machine.AddGumball(10);
machine.InsertCoin();
machine.SellGumball(100);

document.querySelector("#submit").onclick = function () {
  let a = document.getElementById("key").value;
  console.log(a);

  class TrafficLight {
    constructor() {
      this.states = [new GreenLight(), new RedLight(), new YellowLight()];
      this.current = this.states[0];
    }

    change() {
      const totalStates = this.states.length;
      let currentIndex = this.states.findIndex(
        (light) => light === this.current
      );
      if (currentIndex + 1 < totalStates)
        this.current = this.states[currentIndex + 1];
      else this.current = this.states[0];
    }

    sign() {
      return this.current.sign();
    }
  }

  class Light {
    constructor(light) {
      this.light = light;
    }
  }

  class RedLight extends Light {
    constructor() {
      super("red");
    }

    sign() {
      return "STOP";
    }
  }

  class YellowLight extends Light {
    constructor() {
      super("yellow");
    }

    sign() {
      return "STEADY";
    }
  }

  class GreenLight extends Light {
    constructor() {
      super("green");
    }

    sign() {
      return "GO";
    }
  }

  // usage
  const trafficLight = new TrafficLight();

  console.log(trafficLight.sign());
  trafficLight.change();

  console.log(trafficLight.sign());
  trafficLight.change();

  const machine = new GumballMachine(1);
  var arr = ["Яблоко", "Апельсин", "trafficLight.change()"];

  arr.forEach(function (i) {
    switch (i) {
      case "Яблоко":
        alert("Маловато");
        alert(i);
        trafficLight.change();
        alert(trafficLight.sign());
        break;
      // case "trafficLight.change()":
      // alert("trafficLight.change()");
      //break;
      case "machine.InsertCoin()":
        machine.ReturnCoin();
        alert(i);
        alert("machine.InsertCoin()");
        machine.InsertCoin();
        break;
      default:
        alert("Нет таких значений");
        break;
    }
  });

  function splitString(stringToSplit, separator) {
    var arrayOfStrings = stringToSplit.split(separator);

    console.log('Оригинальная строка: "' + stringToSplit + '"');
    console.log('Разделитель: "' + separator + '"');
    console.log(
      "Массив содержит " +
        arrayOfStrings.length +
        " элементов: " +
        arrayOfStrings.join(" / ")
    );
    alert(arrayOfStrings.length);

    switch (arrayOfStrings.length) {
      case 12:
        alert("12");
        break;
      case 4:
        alert("В точку!");
        break;
      case 5:
        alert("Перебор");
        break;
      default:
        alert("Нет таких значений");
        break;
    }
  }

  var monthString = "Янв,Фев,Мар,Апр,Май,Июн,Июл,Авг,Сен,Окт,Ноя,Дек";
  //var monthString = ["Янв,Фев,Мар,Апр,Май,Июн,Июл,Авг,Сен,Окт,Ноя,Дек"];
  var comma = ",";

  splitString(a, comma);

  machine.InsertCoin();
  machine.ReturnCoin();
  machine.InsertCoin();
  machine.SellGumball();
  machine.InsertCoin();
  machine.SellGumball();
  machine.AddGumball(10);
  machine.InsertCoin();
  machine.SellGumball();
  machine.InsertCoin();
  machine.AddGumball(10);
  machine.InsertCoin();
  machine.SellGumball(100);
};
