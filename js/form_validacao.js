const form = document.querySelector('.form');
if (form) {
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const mensagemInput = document.getElementById('mensagem');

    function criarMensagemErro(input, mensagem) {
        const erroExistente = input.parentElement.querySelector('.erro-mensagem');
        if (erroExistente) {
            erroExistente.remove();
        }
      
        const erroDiv = document.createElement('div');
        erroDiv.className = 'erro-mensagem';
        erroDiv.textContent = mensagem;
        erroDiv.style.color = '#DC2626';
        erroDiv.style.fontSize = '0.875rem';
        erroDiv.style.marginTop = '-1rem';
        erroDiv.style.marginBottom = '1rem';
        
        input.parentElement.insertBefore(erroDiv, input.nextSibling);
        input.style.borderColor = '#DC2626';
    }

    function removerMensagemErro(input) {
        const erro = input.parentElement.querySelector('.erro-mensagem');
        if (erro) {
            erro.remove();
        }
        input.style.borderColor = '#dadada';
    }

    if (nomeInput) {
        nomeInput.addEventListener('input', (e) => {
            const valor = e.target.value;
            const apenasTexto = /^[A-Za-zÀ-ÿ\s]*$/;
            
            if (valor && !apenasTexto.test(valor)) {
                criarMensagemErro(nomeInput, 'Nome deve conter apenas letras');
            } else if (valor.length > 0 && valor.length < 3) {
                criarMensagemErro(nomeInput, 'Nome deve ter pelo menos 3 caracteres');
            } else {
                removerMensagemErro(nomeInput);
            }
        });
        
        nomeInput.addEventListener('blur', (e) => {
            const valor = e.target.value.trim();
            if (valor.length === 0) {
                criarMensagemErro(nomeInput, 'Nome é obrigatório');
            }
        });
        
        nomeInput.addEventListener('focus', () => {
            removerMensagemErro(nomeInput);
        });
    }

    if (emailInput) {
        emailInput.addEventListener('input', (e) => {
            const valor = e.target.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (valor && !emailRegex.test(valor)) {
                criarMensagemErro(emailInput, 'Email inválido. Use o formato: exemplo@email.com');
            } else {
                removerMensagemErro(emailInput);
            }
        });
        
        emailInput.addEventListener('blur', (e) => {
            const valor = e.target.value.trim();
            if (valor.length === 0) {
                criarMensagemErro(emailInput, 'Email é obrigatório');
            }
        });
        
        emailInput.addEventListener('focus', () => {
            removerMensagemErro(emailInput);
        });
    }
            
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let temErro = false;
        
        const nome = nomeInput.value.trim();
        const apenasTexto = /^[A-Za-zÀ-ÿ\s]+$/;
        if (!nome || nome.length < 3 || !apenasTexto.test(nome)) {
            criarMensagemErro(nomeInput, 'Nome inválido');
            temErro = true;
        }
        
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            criarMensagemErro(emailInput, 'Email inválido');
            temErro = true;
        }
        
        const mensagem = mensagemInput.value.trim();
        if (!mensagem || mensagem.length < 10) {
            criarMensagemErro(mensagemInput, 'Mensagem muito curta');
            temErro = true;
        }
        
        if (!temErro) {
            const dados = { nome, email, mensagem, data: new Date().toISOString() };
            localStorage.setItem('formContato', JSON.stringify(dados));
            
            const sucessoDiv = document.createElement('div');
            sucessoDiv.className = 'mensagem-sucesso';
            sucessoDiv.textContent = '✓ Mensagem enviada com sucesso!';
            sucessoDiv.style.cssText = `
                background-color: #DCFCE7;
                color: #166534;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                font-weight: bold;
                text-align: center;
                animation: slideDown 0.3s ease;
            `;
            
            form.insertBefore(sucessoDiv, form.firstChild);
            
            form.reset();
            
            setTimeout(() => {
                sucessoDiv.style.animation = 'slideUp 0.3s ease';
                setTimeout(() => sucessoDiv.remove(), 300);
            }, 3000);
            
            console.log('Dados salvos:', dados);
        }
    });
}