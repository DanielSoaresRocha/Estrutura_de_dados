/*Questão 1
Implementar funções de inserir, remover e buscar
registros em uma tabela hash que utiliza strings
como chave e que trata colisão com uso de
Sondagem Linear em Javascript.*/

function tabelaHash(){
    let hash = [];
   
    this.inserir = function(key, registro){
        let chave = key.charCodeAt(0);
        chave = chave % 17;
        while(hash[chave] != null){
            chave++;
        }
        hash[chave] = registro;
        console.log("\nO valor "+ registro + " foi inserido na posição " + chave +" do vetor ");
    }

    this.get = function(key){
        let chave = key.charCodeAt(0);
        chave = chave % 17;
        if(hash[chave] != null){
            console.log("\nValor encontrado: " + hash[chave]);
            return hash[chave];
        }else{
            console.log("\nNão encontrado");
        } 
    }

    this.remove = function(key){
        let chave = key.charCodeAt(0);
        chave = chave % 17;
        if(hash[chave] != null){
            hash[chave] = null;
            console.log("\nO valor foi removido")
        }else{
            console.log("\nO chave não contém nenhum valor")
        }
    }
}

    

let t = new tabelaHash();
t.inserir("luzes", "Daniel");
//t.get("luzez");
t.inserir("luzes", "Daniel2");
