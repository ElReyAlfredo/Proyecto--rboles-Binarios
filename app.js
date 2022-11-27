class Nodo {
  constructor(simbolo) {
    this.simbolo = simbolo;
    this.sig = null;
    this.ant = null;
    this.hiz = null;
    this.hde = null;
  }
}

class Arbol {
  constructor() {
    this.raiz = null;
    this.primero = null;
    this.post = "";
    this.pre = "";
  }

  trasnformar(nuevo) {
    let vector = new Array();
    for (let i = 0; i < nuevo.length; i++) {
      vector.push(new Nodo(nuevo[i]));
    }
    return vector;
  }

  agregarExp(nuevo) {
    let exp = this.trasnformar(nuevo);
    let i = 0;
    while (i < exp.length) {
      if (!this.primero) {
        this.primero = exp[i];
        this.primero.sig = exp[i + 1];
      } else {
        exp[i].sig = exp[i + 1];
        exp[i].ant = exp[i - 1];
      }
      i++;
    }
    return exp;
  }
}
