/*
Crie um programa em javascript que leia um arquivo
de texto e crie uma codificação com número variável
de bits conforme a ocorrência de cada caractere. A
partir disso, crie um arquivo contendo a arvore de
decodificação e os dados codificados. Salve o
arquivo.
*/


//----------------------------INICIO DA ARVORE BINARIA-----------------------------------------
function Node (key){
    this.key = key;
    this.dir = null;
    this.esq = null;
}

function BinarySearchTree(){
    let vetorNode = [];
    let root = null;  


    this.ordenarVetor = function(){
        for(i =0; i < vetorNode.length; i++){
            for(j = i+1; j < vetorNode.length; j++){
                if(vetorNode[i].key < vetorNode[j].key){
                    //troca vetor de números
                    aux = vetorNode[i];
                    vetorNode[i] = vetorNode[j];
                    vetorNode[j] = aux;
                }
            }
        }
    }
    this.retornaMenor = function(){
        this.ordenarVetor();
        let menor = vetorNode[vetorNode.length-1].key;
        //vetorNode.pop();
        return menor;
    }

    this.retornaSmenor = function(){
        let menor = vetorNode[0].key, smenor;
        for(i = 0; i < vetorNode.length; i++){
            if(vetorNode[i].key < menor){
                smenor = menor;
                menor = vetorNode[i].key;
            }
        }
        return smenor;
    }

    this.insertVetor = function(valor){
        this.ordenarVetor();
        vetor[vetor.length] = valor;
    }

    this.escontrarNo = function(key){
        for(i = 0; i < vetorNode.length; i++){  
            if(vetorNode[i].key == key){
                return vetorNode[i];
            }
        }
    }

    //esta função realiza a implementação da arvore de huffman
    this.insert2 = function(vetorOriginal){
        let newNode;
        //criando todos os nós no vetorNode
        for(i = 0;i < vetorOriginal.length; i++){
            newNode = new Node(vetorOriginal[i]);
            vetorNode[i] = newNode;
        }

        while(vetorNode.length > 1){
            menor = this.retornaMenor(); //pegar menor elemento do vetor
            smenor = this.retornaSmenor(); //pegar segundo menor elemento do vetor
            
            newNode = new Node(smenor + menor); // o novo nó será a soma dos dois menores

            newNode.esq = this.escontrarNo(menor); // a função encontrarNo recebe como parâmetro uma key
            newNode.dir = this.escontrarNo(smenor); // e retorna o nó que contém está key

            this.ordenarVetor(); // ordena o vetor
            vetorNode.pop(); //dois pop para remover do vetor os dois menores 
            vetorNode.pop(); //já utilizados

            vetorNode[vetorNode.length] = newNode; //o novo no será inserido no vetor
        }
        
        root = newNode;  //colocando este nó no root
    }
    

    this.remove = function (key) {
        root = this.removeNode (root, key);
    }

    this.findMinNode = function (node){
        while (node && node.esq !== null){
            node = node.esq;
        }

        return node;
    }

    this.removeNode = function(node, key){

        if (node === null){
            return null;
        }

        if (key < node.key){
            node.esq = this.removeNode (node.esq, key);
            return node;
        } else if (key > node.key){
            node.dir = this.removeNode (node.dir, key);
            return node;
        } else {

            //caso 1
            if (node.esq === null && node.dir === null){
                node = null;
                return node;
            }

            //caso 2
            if (node.esq === null){
                node = node.dir;
                return node;
            } else if (node.dir === null){
                node = node.esq;
                return node;
            }

            //caso 3

            var aux = this.findMinNode(node.dir);
            node.key = aux.key;
            node.dir = this.removeNode (node.dir, aux.key);
            return node;
        }
    }


    this.height = function(){
        if (root === null) {
            console.log("é nula");
            return -1; // altura da árvore vazia
           }  else {
            return this.heightNode(root);
        }
    }

    this.heightNode = function(raiz){
        if (raiz === null) 
            return -1; // altura da árvore vazia
        else {
            altura_esquerda = this.heightNode(raiz.esq);
            altura_direita = this.heightNode (raiz.dir);
            if (altura_esquerda < altura_direita){
                return altura_direita + 1;
            }else{
                return altura_esquerda + 1;
            }
        }
    }

    this.preOrder = function (){
        this.preOrderNode(root);
    }

    this.preOrderNode = function(node){
        if (node !== null) {
            console.log(node.key);
            this.preOrderNode(node.esq);
            this.preOrderNode(node.dir);
        }
    }

    this.inOrder = function (){
        this.inOrderNode(root);
    }

    this.inOrderNode = function(node){
        if (node !== null) {
            this.inOrderNode(node.esq);
            console.log(node.key);
            this.inOrderNode(node.dir);
        }
    }

    this.posOrder = function (){
        this.posOrderNode(root);
    }

    this.posOrderNode = function(node){
        if (node !== null) {
            this.posOrderNode(node.esq);
            this.posOrderNode(node.dir);
            console.log(node.key);
        }
    }

}

//------------------------------------ FIM DA ARVORE BINARIA----------------------------------

function Compactador(){
    let vetorCaracter = [];
    let vetorNumber = [];
    let arvore = new BinarySearchTree();
    let indice = 0;

    //Descobrir quantas vezes cada letra se repete
    this.descobrir = function(texto){
        let flag = 0, flag2 = 0; //flags que ligam os dois vetores

        for(i = 0; i < texto.length; i++){
            for(j = 0; j < vetorCaracter.length; j++){ //percorrer todo o vetor de caracter
                if(vetorCaracter[j] == texto[i]){ // para descobrir se a já tem a letra no vetor
                vetorNumber[j]++; //incrementa esta letra já existente no vetor de números
                flag = 1; //flag diz que já tem a letra
                flag2 = vetorCaracter.length; //flag indicadora de posição 
                break;
                }
            }
            if(flag == 0){          // se flag = 0                                
                vetorCaracter[vetorCaracter.length] = texto[i];
                vetorNumber[flag2] = 1;// adiciona a nova letra para o vetor
                flag2++;
            }else if(flag == 1){
                flag = 0; //devolve a flag para estado original
            }
        }
    }

    this.printVetor = function(){
        console.log("\n\n\nprintando....\n");
        for(i = 0; i < vetorNumber.length; i++){
            console.log("Caracter "+vetorCaracter[i]+" repetido "+vetorNumber[i]+" vezes");
        }
    }

    //ordena o vetorNumber e também o vetor de caracters para melhor manipulação
    //Do maior para o menor
    this.ordenar = function(){
        for(i =0; i < vetorNumber.length; i++){
            for(j = i+1; j < vetorNumber.length; j++){
                if(vetorNumber[i] < vetorNumber[j]){
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
    this.insertAll = function(){
        arvore.insert2(vetorNumber);
    }

    this.printArvore = function(){
       console.log("------------------------PRE ORDEMMM----------------------")
        arvore.preOrder();
    }
}

let t = new Compactador();
//mandar texto
t.descobrir("aaaaabccccccdddddddddee");
//imprime vetor desordenado
t.printVetor();
//ordena vetores com bubleSort
t.ordenar();
//imprime agora do menor para o maior
t.printVetor();
//inserindo caracters na arvore de acordo com a maior frequência
t.insertAll();
t.printArvore();






