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

  analizar() {
    let raiz = null;
    let temp = this.primero;
    while (temp != null) {
      if (temp.simbolo.includes("*") || temp.simbolo.includes("/")) {
        temp.hde = temp.sig;
        temp.hiz = temp.ant;

        if (temp.sig.sig == null && temp.ant.ant == null) {
          temp.sig = null;
          temp.ant = null;
        } else if (temp.sig.sig == null) {
          temp.sig = null;
          temp.ant = temp.ant.ant;
          temp.ant.sig = temp;
        } else if (temp.ant.ant == null) {
          temp.ant = null;
          temp.sig = temp.sig.sig;
          temp.sig.ant = temp;
        } else {
          temp.sig = temp.sig.sig;
          temp.ant = temp.ant.ant;
          temp.sig.ant = temp;
          temp.ant.sig = temp;
        }
        raiz = temp;
      }
      temp = temp.sig;
    }
    this.raiz = raiz;

    temp = this.primero;
    while (temp != null) {
      if (temp.simbolo.includes("-") || temp.simbolo.includes("+")) {
        temp.hde = temp.sig;
        temp.hiz = temp.ant;
        if (temp.sig.sig == null && temp.ant.ant == null) {
          temp.si = null;
          temp.ant = null;
        } else if (temp.sig.sig == null) {
          temp.sig = null;
          temp.ant = temp.ant.ant;
          temp.ant.sig = temp;
        } else if (temp.ant.ant == null) {
          temp.ant = null;
          temp.sig = temp.sig.sig;
          temp.sig.ant = temp;
        } else {
          temp.sig = temp.sig.sig;
          temp.ant = temp.ant.ant;
          temp.sig.ant = temp;
          temp.ant.sig = temp;
        }
        raiz = temp;
      }
      temp = temp.sig;
    }
    this.raiz = raiz;
    return [this.postorden(), this.preorden()];
  }

  preorden() {}

  postorden() {}
}

let arbol = new Arbol();
