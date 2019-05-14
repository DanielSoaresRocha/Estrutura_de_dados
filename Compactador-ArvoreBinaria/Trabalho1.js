/*
Crie um programa em javascript que leia um arquivo
de texto e crie uma codificação com número variável
de bits conforme a ocorrência de cada caractere. A
partir disso, crie um arquivo contendo a arvore de
decodificação e os dados codificados. Salve o
arquivo.
*/

function Compactador(){
    let vetorCaracter = [];
    let vetorNumber = [];
    

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
                //console.log("entrou");
                //console.log(i);
                vetorCaracter[vetorCaracter.length] = texto[i];
                vetorNumber[flag2] = 1;// adiciona a nova letra para o vetor
                flag2++;
            }else if(flag == 1){
                flag = 0; //devolve a flag para estado original
            }
        }
    }

    this.printVetor = function(){
        console.log("\nprintando....\n");
        for(i = 0; i < vetorNumber.length; i++){
            console.log("letra "+vetorCaracter[i]+" repetida "+vetorNumber[i]+" vezes");
        }
    }


}

let t = new Compactador();
t.descobrir("asdfasdkjflskadfjksdfsdfljsadfçlsadlk");
t.printVetor();




