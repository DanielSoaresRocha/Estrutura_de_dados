/*
Crie um programa em javascript que leia um arquivo
de texto e crie uma codificação com número variável
de bits conforme a ocorrência de cada caractere. A
partir disso, crie um arquivo contendo a arvore de
decodificação e os dados codificados. Salve o
arquivo.
*/


//----------------------------INICIO DA ARVORE BINARIA-----------------------------------------
function Node(key) {
    this.key = key;
    this.letra = undefined;
    this.dir = null;
    this.esq = null;
}

function BinarySearchTree() {
    let vetorNode = [];
    let root = null;
    let table = [];


    this.ordenarVetor = function () {
        for (i = 0; i < vetorNode.length; i++) {
            for (j = i + 1; j < vetorNode.length; j++) {
                if (vetorNode[i].key < vetorNode[j].key) {
                    //troca vetor de números
                    aux = vetorNode[i];
                    vetorNode[i] = vetorNode[j];
                    vetorNode[j] = aux;
                }
            }
        }
    }

    this.retornaMenor = function () {
        this.ordenarVetor();
        let menor = vetorNode[vetorNode.length - 1].key;
        //vetorNode.pop();
        return menor;

    }

    this.retornaSmenor = function () {
        let smenor = vetorNode[vetorNode.length - 2].key;

        return smenor;
    }

    //esta função realiza a implementação da arvore de huffman
    this.insert2 = function (vetorNumber, vetorCaracter) {
        let newNode;
        //criando todos os nós no vetorNode
        for (i = 0; i < vetorNumber.length; i++) {
            newNode = new Node(vetorNumber[i]); // inserindo key 
            newNode.letra = vetorCaracter[i]; // inserindo letra
            vetorNode[i] = newNode;
        }

        while (vetorNode.length > 1) {
            menor = this.retornaMenor(); //pegar menor elemento do vetor
            smenor = this.retornaSmenor(); //pegar segundo menor elemento do vetor

            newNode = new Node(smenor + menor); // o novo nó será a soma dos dois menores

            this.ordenarVetor(); // ordena o vetor (do maior para o menor)

            newNode.esq = vetorNode[vetorNode.length - 1]; //retornar o menor elemento
            newNode.dir = vetorNode[vetorNode.length - 2]; //retornar segundo menor

            vetorNode.pop(); //dois pop para remover do vetor os dois menores 
            vetorNode.pop(); //já utilizados

            vetorNode[vetorNode.length] = newNode; //o novo no será inserido no vetor
        }

        root = newNode;  //colocando este nó no root
        //console.log(root.dir.dir.key);
        this.createTable();
        //console.log(root.esq.esq.letra);
        for (i = 0; i < vetorCaracter.length; i++) {
            console.log("letra = " + vetorCaracter[i] + " valor = " + table[vetorCaracter[i]]);
        }
    }

    this.createTable = function () {
        this.fillTable(root, '');
        //console.log(table);
    }

    this.fillTable = function (node, code) {

        if (node.letra != undefined) {
            //console.log(node.letra);
            table[node.letra] = code;
        } else {
            this.fillTable(node.esq, code + '0');
            this.fillTable(node.dir, code + '1');
        }
    }

    this.preOrder = function () {
        this.preOrderNode(root);
    }

    this.preOrderNode = function (node) {
        if (node !== null) {
            console.log(node.letra + '|' + node.key);
            this.preOrderNode(node.esq);
            this.preOrderNode(node.dir);
        }
    }

    this.inOrder = function () {
        this.inOrderNode(root);
    }

    this.inOrderNode = function (node) {
        if (node !== null) {
            this.inOrderNode(node.esq);
            console.log(node.key);
            this.inOrderNode(node.dir);
        }
    }

    this.posOrder = function () {
        this.posOrderNode(root);
    }

    this.posOrderNode = function (node) {
        if (node !== null) {
            this.posOrderNode(node.esq);
            this.posOrderNode(node.dir);
            console.log(node.key);
        }
    }

    this.writeToFile = function (filename, palavra) {
        var ofs = require('fs');
        var file = ofs.createWriteStream(filename, "utf-8");
        this.writeToFileNode(root, file)
        file.write(this.encode(palavra));
        file.end();
    }

    this.writeToFileNode = function (node, file) {

        if (node == null) {
            file.write('#;');
        } else {
            file.write((node.letra === undefined ? '*|' : node.letra + '|') + node.frequencia + ';');
            this.writeToFileNode(node.esq, file);
            this.writeToFileNode(node.dir, file);
        }
    }

    this.loadFromFile = function (filename) {
        var fs = require("fs");
        var file = fs.readFileSync("./" + filename, "utf-8");
        numbers = file.split(";");
        numbers.pop(); //removendo a parte dos dados.

        root = this.loadPreOrder(null);
    }

    this.loadPreOrder = function (node) {


        if (numbers[0] === "#" || numbers[0] === "") {
            numbers.splice(0, 1);
            return null;
        } else {
            separado = numbers[0].split("|");
            l = separado[0] === '*' ? undefined : separado[0];
            f = parseInt(separado[1]);
            node = new Node(l, f);
            numbers.splice(0, 1);
            node.esq = this.loadPreOrder(node.esq);
            node.dir = this.loadPreOrder(node.dir);
        }

        return node;  
    }

    this.encode = function (palavra) {

        var saida = '';
    
        for (var i = 0; i < palavra.length; i++) {
            saida += table[palavra.charAt(i)];
        }
    
        //console.log(saida);
        return saida;
    
    }
    
    this.decode = function (palavra) {
    
        let saida = '';
        let current = root;
    
        for (var i = 0; i < palavra.length; i++) {
    
            if (palavra.charAt(i) == '0') {
                current = current.esq;
            } else if (palavra.charAt(i) == '1') {
                current = current.dir;
            }
    
            if (current.esq == null && current.dir == null) {
                saida += current.letra;
                current = root;
            }
        }
        return saida;
    }
}

//------------------------------------ FIM DA ARVORE BINARIA----------------------------------

//----------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------
function TADzip() {
    let h = new BinarySearchTree();

    this.zip = function (filename) {
        console.log("ENTROUUUU");
        var fs = require("fs");
        var palavra = fs.readFileSync("./" + filename, "utf-8");
        h.getFrequency(palavra);

        h.createTree();
        h.createTable();

        purename = filename.split(".");

        h.writeToFile(purename[0] + ".tadzip", palavra);
    }

    this.unzip = function (filename) {
        h.loadFromFile(filename);

        var fs = require("fs");
        var file = fs.readFileSync("./" + filename, "utf-8");
        data = file.split(";");
        palavra = data.pop(); //optendo apenas a parte final dos dados.

        purename = filename.split(".");

        var ofs = require('fs');
        var file = ofs.createWriteStream(purename[0] + "[1].dat", "utf-8");
        file.write(h.decode(palavra));
        file.end();
    }
}

let z = new TADzip();

//--------------------------------------------------------------------------------------------

function Compactador() {
    let vetorCaracter = [];
    let vetorNumber = [];
    let arvore = new BinarySearchTree();


    this.pegar = function (arquivo) {
        // Requiring fs module in which  
        // readFile function is defined. 
        const fs = require('fs')

        fs.readFile(arquivo, (err, data) => {
            if (err) throw err;

            //console.log(data.toString());
            this.descobrir(data.toString());
        })   
    }

    this.zip = function (filename) {
        console.log("ENTROUUUU");
        var fs = require("fs");
        var palavra = fs.readFileSync("./" + filename, "utf-8");
        this.descobrir(palavra);
        this.ordenar();
        this.insertAll();
        purename = filename.split(".");

        arvore.writeToFile(purename[0] + ".tadzip", palavra);
    }

    //Descobrir quantas vezes cada letra se repete
    this.descobrir = function (texto) {
        let flag = 0, flag2 = 0; //flags que ligam os dois vetores

        for (i = 0; i < texto.length; i++) {
            for (j = 0; j < vetorCaracter.length; j++) { //percorrer todo o vetor de caracter
                if (vetorCaracter[j] == texto[i]) { // para descobrir se a já tem a letra no vetor
                    vetorNumber[j]++; //incrementa esta letra já existente no vetor de números
                    flag = 1; //flag diz que já tem a letra
                    flag2 = vetorCaracter.length; //flag indicadora de posição 
                    break;
                }
            }
            if (flag == 0) {          // se flag = 0                                
                vetorCaracter[vetorCaracter.length] = texto[i];
                vetorNumber[flag2] = 1;// adiciona a nova letra para o vetor
                flag2++;
            } else if (flag == 1) {
                flag = 0; //devolve a flag para estado original
            }
        }
    }

    this.printVetor = function () {
        console.log("\n\n\nprintando....\n");
        for (i = 0; i < vetorNumber.length; i++) {
            console.log("Caracter " + vetorCaracter[i] + " repetido " + vetorNumber[i] + " vezes");
        }
    }

    //ordena o vetorNumber e também o vetor de caracters para melhor manipulação
    //Do maior para o menor
    this.ordenar = function () {
        for (i = 0; i < vetorNumber.length; i++) {
            for (j = i + 1; j < vetorNumber.length; j++) {
                if (vetorNumber[i] < vetorNumber[j]) {
                    //troca vetor de números
                    aux = vetorNumber[i];
                    vetorNumber[i] = vetorNumber[j];
                    vetorNumber[j] = aux;

                    //troca vetor de caracter
                    aux = vetorCaracter[i];
                    vetorCaracter[i] = vetorCaracter[j];
                    vetorCaracter[j] = aux;
                }
            }
        }
    }

    //inserir na arvore de acordo com a maior frequência
    this.insertAll = function () {
        arvore.insert2(vetorNumber, vetorCaracter);
    }

    this.printArvore = function () {
        console.log("------------------------PRE ORDEMMM----------------------");
        arvore.preOrder();
    }
}

let t = new Compactador();

//t.pegar("arquivo.dat");
t.zip("arquivo.dat");
//mandar texto
//t.descobrir("aaabbbbcasfsadf@!#asdcccc");
//imprime vetor desordenado
//t.printVetor();
//ordena vetores com bubleSort
//t.ordenar();
//imprime agora do menor para o maior
//t.printVetor();
//inserindo caracters na arvore de acordo com a maior frequência
//t.insertAll();
///t.printArvore();







