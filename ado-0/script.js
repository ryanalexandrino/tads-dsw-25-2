document.addEventListener('DOMContentLoaded', function() {
    const botaoCarregar = document.getElementById('botaoCarregar');
    const containerCurriculo = document.getElementById('containerCurriculo');

    botaoCarregar.addEventListener('click', async function() {
        try {
            // Fazer fetch do arquivo JSON
            const response = await fetch('dados.json');

            if (!response.ok) {
                throw new Error('Erro ao carregar dados');
            }

            const dados = await response.json();
            
            // Preencher títulos das seções
            document.getElementById('tituloInformacoes').textContent = dados.titulos.informacoesPessoais;
            document.getElementById('tituloHabilidades').textContent = dados.titulos.conhecimentos;
            document.getElementById('tituloExperiencias').textContent = dados.titulos.experienciasProfissionais;
            document.getElementById('tituloEducacao').textContent = dados.titulos.formacaoAcademica;
            
            // Preencher labels dos campos
            document.getElementById('labelNascimento').textContent = dados.labels.nascimento;
            document.getElementById('labelEmail').textContent = dados.labels.email;
            document.getElementById('labelTelefone').textContent = dados.labels.telefone;
            document.getElementById('labelLinkedin').textContent = dados.labels.linkedin;
            document.getElementById('labelGithub').textContent = dados.labels.github;
            
            // Preencher informações pessoais
            document.getElementById('nomeCompleto').textContent = dados.informacoesPessoais.nomeCompleto;
            document.getElementById('dataNascimento').textContent = dados.informacoesPessoais.dataNascimento;
            document.getElementById('emailContato').textContent = dados.informacoesPessoais.emailContato;
            document.getElementById('telefoneContato').textContent = dados.informacoesPessoais.telefoneContato;
            
            // Criar links clicáveis para LinkedIn e GitHub
            const linkedinElement = document.getElementById('linkedinPerfil');
            linkedinElement.innerHTML = `<a href="https://${dados.informacoesPessoais.linkedinPerfil}" target="_blank" rel="noopener noreferrer">${dados.informacoesPessoais.linkedinPerfil}</a>`;
            
            const githubElement = document.getElementById('githubPerfil');
            githubElement.innerHTML = `<a href="https://${dados.informacoesPessoais.githubPerfil}" target="_blank" rel="noopener noreferrer">${dados.informacoesPessoais.githubPerfil}</a>`;
            
            // Configurar foto
            const fotoElement = document.getElementById('fotoProfile');
            if (dados.informacoesPessoais.fotoArquivo) {
                fotoElement.src = dados.informacoesPessoais.fotoArquivo;
                fotoElement.style.display = 'block';
            }
            
            // Preencher habilidades
            const listaHabilidades = document.getElementById('listaHabilidades');
            listaHabilidades.innerHTML = dados.habilidades.map(habilidade => 
                `<div style="margin-bottom: 8px; font-size: 14px;">• ${habilidade}</div>`
            ).join('');
            
            // Preencher experiências
            const listaExperiencias = document.getElementById('listaExperiencias');
            listaExperiencias.innerHTML = dados.experiencias.map(exp => `
                <div class="item-experiencia">
                    <div class="titulo-item">${exp.titulo}</div>
                    <div class="empresa-item">${exp.empresa}</div>
                    <div class="periodo-item">${exp.periodo}</div>
                    <div class="descricao-item">${exp.descricao}</div>
                </div>
            `).join('');
            
            // Preencher educação
            const listaEducacao = document.getElementById('listaEducacao');
            listaEducacao.innerHTML = dados.educacao.map(edu => `
                <div class="item-educacao">
                    <div class="titulo-item">${edu.titulo}</div>
                    <div class="instituicao-item">${edu.instituicao}</div>
                    <div class="periodo-item">${edu.periodo}</div>
                    <div class="descricao-item">${edu.descricao}</div>
                </div>
            `).join('');
            
            // Esconder botão e mostrar currículo
            document.querySelector('.botao-container').style.display = 'none';
            containerCurriculo.style.display = 'block';
            
        } catch (error) {
            console.error('Erro ao carregar currículo:', error);
            alert('Erro ao carregar o currículo. Tente novamente.');
        }
    });
});