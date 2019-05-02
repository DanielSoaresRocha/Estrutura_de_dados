/*
Questão 2
Implementar funções de inserir, remover e buscar
registros em uma tabela hash que trata colisão com
uso de listas ligadas em Javascript.
*/


//--------------------LISTA LIGADA:--------------------
function Node (dado){
	this.dado = dado;
	this.proximo = null;
}

function ListaLigada(){

	let head = new Node(null);
	this.tamanho = 0;

	this.add = function(dado){
        console.log(dado+" foi adicionado");
		let novo_no = new Node(dado);

		//if (head.proximo == null){
		//	head.proximo = novo_no;
		//}else{
			novo_no.proximo = head.proximo;
			head.proximo = novo_no;
		//}

		this.tamanho++;
	}
	
	this.append = function(dado){

		let novo_no = new Node(dado);

		if (head.proximo == null){
			head.proximo = novo_no;
		}else{
			current = head.proximo;
			while(current.proximo != null) {
				current = current.proximo;
			}
			current.proximo = novo_no;
		}
	}

	this.removeStart = function(){

		current = head.proximo;
		if (current == null) {
			return;
		} else{
			head.proximo = current.proximo;
		}

	}

    this.getStart = function(){

		current = head.proximo;
		if (current == null) {
			return null;
		} else{
            console.log(current.dado + " foi encontrado na lista");
            return current.dado;
			//head.proximo = current.proximo;
		}

	}
	this.removeEnd = function(){

		previous = head;
		current = head.proximo;

		if (current == null) {
			return;
		}

		while (current.proximo != null){
			previous = current;
			current = current.proximo;
		}
		current = null;
		previous.proximo = null;
	}

	this.isEmpty = function(){
		if (head.proximo == null)
			return true;
		return false;
	}

	this.toString = function(){
		let current = head.proximo;
		let texto = '';

		while (current != null){
			texto += current.dado + (current.proximo ? '->' : '');
			current = current.proximo;
		}

		return texto;
	}

	this.size = function(){
		let cont = 0;

		current = head.proximo;
		while (current != null){
			current = current.proximo;
			cont++;
		}
		return cont;
	}

	this.addAt = function(position, dado){

		if(position >= this.size()){
			//adicionando no final
			this.append(dado);
		}else{
			if (position <= 0){
				//adicionando no inicio
				this.add(dado);
			}else{
				let novo_no = new Node(dado);
				let i = 0;

				previous = head;
				current = head.proximo;

				while (i != position){
					//iteração
					previous = current;
					current = current.proximo;
					i++;
				}
				previous.proximo = novo_no;
				novo_no.proximo = current;
			}

		}
	}

	this.search = function(dado){

		if (head.proximo == null){
            console.log("Não encontrou esse misera");
            return false;
		}else{
			current = head.proximo;
			while (current != null){
				if(current.dado == dado){
                    console.log("Encontrou o registro " + dado);
                    return true;
				}
				//iteração
				current = current.proximo;
            }
            console.log("Não encontrou esse misera");
			return false;
		}
	}

	this.addInOrder = function (dado){

		//NOTA: Essa função deve ser usada apenas se os elementos já existentes
		//na lista estiverem em ordem crescente.

		let novo_no = new Node(dado);

		if (head.proximo == null){
			head.proximo = novo_no;
		}else{

			previous = head;
			current = head.proximo;

			while (current != null){
				if(current.dado > dado){
					previous.proximo = novo_no;
					novo_no.proximo = current;
					return;
				}
				//iteração
				previous = current;
				current = current.proximo;
			}

			//caso o if nunca seja true
			previous.proximo = novo_no;
			novo_no.proximo = null;
			return;
		}

	}

}
//--------------------FIM DA LISTA LIGADA-------------------- 

// FUNÇÃO HASH

function tabelaHash(){
    let hash = [];
    let listaAuxiliar = new ListaLigada(); //Prepara  nova lista

    this.inserir = function(key, registro){
        let chave = key.charCodeAt();
        chave = chave % 17;
        if(hash[chave] != null){//Se já houver registro para a chave
            console.log("Já foi encontrado um registro para esta chave, adicionando a lista existente...")
            listaAuxiliar = hash[chave];
            listaAuxiliar.add(registro);
            hash[chave] = listaAuxiliar;//reescreve o vetor para conter a lista com os mesmos registros + o novo
        }else{ // Se não houver registro para a chava
            console.log("Criando uma nova lista...");
            //Cria uma nova lista
            let novaLista = new ListaLigada(); // prepara uma novaLista
            //adicionando a lista
            novaLista.add(registro);
            //Colocando lista na posição do vetor
            hash[chave] = novaLista;
        }
        
        
        console.log("\nO valor "+ registro + " foi inserido na posição " + chave +" do vetor ");
    }

    this.get = function(key){
        let chave = key.charCodeAt(0);
        chave = chave % 17;
        if(hash[chave] != null){
            //console.log("\nValor encontrado: " + hash[chave].getStart());
            listaAuxiliar = hash[chave];
            listaAuxiliar.getStart();
        }else{
            console.log("\nO valor não foi encontrado");
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
t.inserir("pru", "bananinha");
t.inserir("pru", "bananinha2");
t.inserir("pru", "bananinha3");
t.get("pru");
t.inserir("xuu", "novoValor");
t.get("xuu");

//let l = new ListaLigada();
//l.add("maria");
//l.search("maria");