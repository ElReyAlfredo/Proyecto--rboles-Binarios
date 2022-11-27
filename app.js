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
    this.anterior = null;
  }
}
