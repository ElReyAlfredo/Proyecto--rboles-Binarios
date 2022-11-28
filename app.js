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

  preorden() {
    this.pre = "";
    if (this.raiz == null) {
      return false;
    } else {
      this.pr(this.raiz);
    }
    return this.pre;
  }

  postorden() {
    this.post = "";
    if (this.raiz == null) {
      return false;
    } else {
      this.po(this.raiz);
    }
    return this.post;
  }

  pr(nuevo) {
    this.pre += nuevo.simbolo;
    if (nuevo.hiz != null) {
      this.pr(nuevo.hiz);
    }
    if (nuevo.hde != null) {
      this.pr(nuevo.hde);
    }
  }

  po(nuevo) {
    if (nuevo.hiz != null) {
      this.po(nuevo.hiz);
    }
    if (nuevo.hde != null) {
      this.po(nuevo.hde);
    }
    this.post += nuevo.simbolo;
  }

  operacionPreorden(exp) {
    let pila = new Array();
    let i = exp.length;
    while (i >= 0) {
      if (exp[i] == "+" || exp[i] == "-" || exp[i] == "*" || exp[i] == "/") {
        let derecha = +pila.pop();
        let izquiera = +pila.pop();
        pila.push(this.operaciones(exp[i], derecha, izquiera));
      } else {
        pila.push(exp[i]);
      }
      i--;
    }

    return pila.pop();
  }

  operacionPostorden(exp) {
    let pila = new Array();
    let i = 0;
    while (i < exp.length) {
      if (exp[i] == "+" || exp[i] == "-" || exp[i] == "*" || exp[i] == "/") {
        let derecha = +pila.pop();
        let izquiera = +pila.pop();
        pila.push(this.operaciones(exp[i], izquiera, derecha));
      } else {
        pila.push(exp[i]);
      }
      i++;
    }
    return pila.pop();
  }

  operaciones(operacion, izquiera, derecha) {
    let resultado;
    if (operacion === "*") {
      resultado = izquiera * derecha;
    } else if (operacion === "/") {
      resultado = izquiera / derecha;
    } else if (operacion === "+") {
      resultado = izquiera + derecha;
    } else if (operacion === "-") {
      resultado = izquiera - derecha;
    }
    return resultado;
  }
}

let arbol = new Arbol();
let postorden = "";
let preorden = "";
//AQUI ABAJO INSERTE LA EXPRESION DONDE DICE isertarExpresion;
let insertarExpresion = "1-4*5/2*9";
console.log(arbol.agregarExp(insertarExpresion));
[postorden, preorden] = arbol.analizar(insertarExpresion);
console.log("Visualizar el árbol:");
console.log(arbol.raiz);
console.log(`Preorden: ${preorden}`);
console.log(`Postorden: ${postorden}`);
console.log(`Resultado en preorden ${arbol.operacionPreorden(preorden)}`);
console.log(`Resultado en postorden ${arbol.operacionPostorden(postorden)}`);
